import { getAgentBySlug } from "@/lib/actions/agent-actions"
import { db } from "@/lib/db"
import { shopifyConfigs } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatAnthropic } from "@langchain/anthropic"
import { ChatCohere } from "@langchain/cohere"
import { LangChainAdapter } from "ai"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { messages } = await req.json()
    const slug = params.slug
    const agent = await getAgentBySlug(slug)

    if (!agent) {
      return new Response(
        JSON.stringify({
          error: "Agent not found",
        }),
        { status: 404 },
      )
    }

    // Get Shopify configuration if it exists
    const shopifyConfig = await db.query.shopifyConfigs.findFirst({
      where: eq(shopifyConfigs.agentId, agent.id),
    })

    // Create base system prompt
    let systemPrompt = agent.systemPrompt || "You are a helpful AI assistant."

    // Enhance system prompt with Shopify product knowledge if configured
    if (shopifyConfig && shopifyConfig.enableProductRecommendations) {
      // Fetch products from Shopify
      const products = await fetchShopifyProducts(shopifyConfig)

      if (products && products.length > 0) {
        // Add product knowledge to system prompt
        systemPrompt += `\n\nYou have access to the following products from the store:
${formatProductsForPrompt(products, shopifyConfig.maxProductsToShow)}

When a user asks about products or seems interested in shopping, recommend relevant products from this list.
Include the product name, price, and a brief description in your recommendations.
You can recommend up to ${shopifyConfig.maxProductsToShow} products at a time.
`
      }
    }

    // Select the appropriate model based on the agent's configuration
    let model
    switch (agent.modelProvider) {
      case "anthropic":
        model = new ChatAnthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
          model: "claude-3-opus-20240229",
          temperature: 0.7,
        })
        break
      case "cohere":
        model = new ChatCohere({
          apiKey: process.env.COHERE_API_KEY,
          model: "command-r-plus",
          temperature: 0.7,
        })
        break
      case "gemini":
      default:
        model = new ChatGoogleGenerativeAI({
          apiKey: process.env.GOOGLE_API_KEY,
          model: "gemini-1.5-pro",
          temperature: 0.7,
          maxOutputTokens: 2048,
        })
        break
    }

    // Add system message to the beginning of the messages array
    const messagesWithSystem = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ]

    // Create a streaming chain
    const stream = await model.stream(messagesWithSystem)

    // Return the stream
    return LangChainAdapter.toDataStreamResponse(stream)
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
      }),
      { status: 500 },
    )
  }
}

// Function to fetch products from Shopify
async function fetchShopifyProducts(config) {
  try {
    const response = await fetch(
      `https://${config.shopDomain}.myshopify.com/admin/api/2023-07/products.json?limit=50`,
      {
        headers: {
          "X-Shopify-Access-Token": config.accessToken,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.products
  } catch (error) {
    console.error("Error fetching Shopify products:", error)
    return []
  }
}

// Function to format products for the prompt
function formatProductsForPrompt(products, maxProducts) {
  return products
    .slice(0, maxProducts)
    .map(
      (product) => `- Name: ${product.title}
  Price: $${product.variants[0]?.price || "N/A"}
  Description: ${product.body_html?.replace(/<[^>]*>?/gm, "") || "No description available"}
  ID: ${product.id}
  `,
    )
    .join("\n")
}
