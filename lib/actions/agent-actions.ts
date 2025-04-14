"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Schema for agent creation/update
const agentSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  systemPrompt: z.string().min(10, {
    message: "System prompt must be at least 10 characters.",
  }),
  modelProvider: z.enum(["gemini", "anthropic", "cohere"]),
});

export type AgentFormValues = z.infer<typeof agentSchema>;

// Create a new agent
export async function createAgent(formData: AgentFormValues) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Validate form data
  const validatedFields = agentSchema.safeParse(formData);

  console.log("validatedFields", validatedFields, formData, userId);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, slug, systemPrompt, modelProvider } = validatedFields.data;

  try {
    // Check if slug is already taken
    const existingAgent = await db.query.agents.findFirst({
      where: eq(agents.slug, slug),
    });

    if (existingAgent) {
      return { error: "Slug already taken. Please choose a different slug." };
    }

    // Insert new agent
    await db.insert(agents).values({
      userId,
      name,
      slug,
      systemPrompt,
      modelProvider,
      isActive: true,
    });

    revalidatePath("/dashboard/agents");
    return { success: true };
  } catch (error) {
    console.error("Failed to create agent:", error);
    return { error: "Failed to create agent. Please try again." };
  }
}

// Get all agents for the current user
export async function getUserAgents() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const userAgents = await db.query.agents.findMany({
      where: eq(agents.userId, userId),
      orderBy: (agents, { desc }) => [desc(agents.createdAt)],
    });

    return userAgents;
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return [];
  }
}

// Get agent by ID
export async function getAgentById(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const agent = await db.query.agents.findFirst({
      where: (agents, { and, eq }) =>
        and(eq(agents.id, id.toString()), eq(agents.userId, userId)),
    });

    if (agent) {
      return agent;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch agent:", error);
    return null;
  }
}

// Get agent by slug (public)
export async function getAgentBySlug(slug: string) {
  try {
    const agent = await db.query.agents.findFirst({
      where: (agents, { and, eq }) =>
        and(eq(agents.slug, slug), eq(agents.isActive, true)),
    });
    console.log("agent", agent);

    return agent;
  } catch (error) {
    console.error("Failed to fetch agent by slug:", error);
    return null;
  }
}

// Update an agent
export async function updateAgent(id: string, formData: AgentFormValues) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Validate form data
  const validatedFields = agentSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, slug, systemPrompt, modelProvider } = validatedFields.data;

  try {
    // Check if agent exists and belongs to user
    const existingAgent = await db.query.agents.findFirst({
      where: (agents, { and, eq }) =>
        and(eq(agents.id, id.toString()), eq(agents.userId, userId)),
    });

    if (!existingAgent) {
      return {
        error: "Agent not found or you don't have permission to edit it.",
      };
    }

    // Check if new slug is already taken by another agent
    if (slug !== existingAgent.slug) {
      const slugExists = await db.query.agents.findFirst({
        where: eq(agents.slug, slug),
      });

      if (slugExists) {
        return { error: "Slug already taken. Please choose a different slug." };
      }
    }

    // Update agent
    await db
      .update(agents)
      .set({
        name,
        slug,
        systemPrompt,
        modelProvider,
        updatedAt: new Date(),
      })
      .where(eq(agents.id, id.toString()));

    revalidatePath("/dashboard/agents");
    return { success: true };
  } catch (error) {
    console.error("Failed to update agent:", error);
    return { error: "Failed to update agent. Please try again." };
  }
}

// Delete an agent
export async function deleteAgent(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    // Check if agent exists and belongs to user
    const existingAgent = await db.query.agents.findFirst({
      where: (agents, { and, eq }) =>
        and(eq(agents.id, id.toString()), eq(agents.userId, userId)),
    });

    if (!existingAgent) {
      return {
        error: "Agent not found or you don't have permission to delete it.",
      };
    }

    // Delete agent
    await db.delete(agents).where(eq(agents.id, id.toString()));

    revalidatePath("/dashboard/agents");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete agent:", error);
    return { error: "Failed to delete agent. Please try again." };
  }
}
