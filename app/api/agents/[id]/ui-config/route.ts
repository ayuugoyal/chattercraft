import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agents, uiConfigs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agentId = params.id;
    const data = await req.json();

    // Validate agent ownership
    const agent = await db.query.agents.findFirst({
      where: eq(agents.id, agentId),
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (agent.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if config already exists
    const existingConfig = await db.query.uiConfigs.findFirst({
      where: eq(uiConfigs.agentId, agentId),
    });

    if (existingConfig) {
      // Update existing config
      await db
        .update(uiConfigs)
        .set({
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          backgroundColor: data.backgroundColor,
          textColor: data.textColor,
          buttonPosition: data.buttonPosition,
          buttonSize: data.buttonSize,
          widgetWidth: data.widgetWidth,
          widgetHeight: data.widgetHeight,
          borderRadius: data.borderRadius,
          welcomeMessage: data.welcomeMessage,
          buttonIcon: data.buttonIcon,
          headerTitle: data.headerTitle,
          showAgentAvatar: data.showAgentAvatar,
          showTimestamp: data.showTimestamp,
          showTypingIndicator: data.showTypingIndicator,
          enableDarkMode: data.enableDarkMode,
          allowAttachments: data.allowAttachments,
          updatedAt: new Date(),
        })
        .where(eq(uiConfigs.agentId, agentId));
    } else {
      // Create new config
      await db.insert(uiConfigs).values({
        agentId,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        backgroundColor: data.backgroundColor,
        textColor: data.textColor,
        buttonPosition: data.buttonPosition,
        buttonSize: data.buttonSize,
        widgetWidth: data.widgetWidth,
        widgetHeight: data.widgetHeight,
        borderRadius: data.borderRadius,
        welcomeMessage: data.welcomeMessage,
        buttonIcon: data.buttonIcon,
        headerTitle: data.headerTitle,
        showAgentAvatar: data.showAgentAvatar,
        showTimestamp: data.showTimestamp,
        showTypingIndicator: data.showTypingIndicator,
        enableDarkMode: data.enableDarkMode,
        allowAttachments: data.allowAttachments,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving UI configuration:", error);
    return NextResponse.json(
      { error: "Failed to save UI configuration" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agentId = params.id;

    // Validate agent ownership
    const agent = await db.query.agents.findFirst({
      where: eq(agents.id, agentId),
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (agent.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get UI config
    const config = await db.query.uiConfigs.findFirst({
      where: eq(uiConfigs.agentId, agentId),
    });

    if (!config) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching UI configuration:", error);
    return NextResponse.json(
      { error: "Failed to fetch UI configuration" },
      { status: 500 }
    );
  }
}
