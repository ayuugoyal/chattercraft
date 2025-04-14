import { getAgentBySlug } from "@/lib/actions/agent-actions";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LangChainAdapter } from "ai";
import type { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { messages } = await req.json();

    const slug = params.slug;

    const agent = await getAgentBySlug(slug);

    console.log("messages", messages);

    console.log("agent", agent);

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-1.5-pro",
      temperature: 0.3,
      maxOutputTokens: 2048,
    });

    messages.unshift({
      role: "system",
      content: agent?.systemPrompt,
    });

    console.log(messages);

    const stream = await model.stream(messages);

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      { status: 500 }
    );
  }
}
