// import { type NextRequest, NextResponse } from "next/server"
// import { db } from "@/lib/db"
// import { agents, shopifyConfigs } from "@/lib/db/schema"
// import { eq } from "drizzle-orm"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const agentId = params.id
//     const data = await req.json()

//     // Validate agent ownership
//     const agent = await db.query.agents.findFirst({
//       where: eq(agents.id, agentId),
//     })

//     if (!agent) {
//       return NextResponse.json({ error: "Agent not found" }, { status: 404 })
//     }

//     if (agent.userId !== session.user.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
//     }

//     // Check if config already exists
//     const existingConfig = await db.query.shopifyConfigs.findFirst({
//       where: eq(shopifyConfigs.agentId, agentId),
//     })

//     if (existingConfig) {
//       // Update existing config
//       await db
//         .update(shopifyConfigs)
//         .set({
//           shopDomain: data.shopDomain,
//           apiKey: data.apiKey,
//           apiSecretKey: data.apiSecretKey,
//           accessToken: data.accessToken,
//           enableProductRecommendations: data.enableProductRecommendations,
//           maxProductsToShow: data.maxProductsToShow,
//           updatedAt: new Date(),
//         })
//         .where(eq(shopifyConfigs.agentId, agentId))
//     } else {
//       // Create new config
//       await db.insert(shopifyConfigs).values({
//         agentId,
//         shopDomain: data.shopDomain,
//         apiKey: data.apiKey,
//         apiSecretKey: data.apiSecretKey,
//         accessToken: data.accessToken,
//         enableProductRecommendations: data.enableProductRecommendations,
//         maxProductsToShow: data.maxProductsToShow,
//       })
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Error saving Shopify configuration:", error)
//     return NextResponse.json({ error: "Failed to save Shopify configuration" }, { status: 500 })
//   }
// }

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const agentId = params.id

//     // Validate agent ownership
//     const agent = await db.query.agents.findFirst({
//       where: eq(agents.id, agentId),
//     })

//     if (!agent) {
//       return NextResponse.json({ error: "Agent not found" }, { status: 404 })
//     }

//     if (agent.userId !== session.user.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
//     }

//     // Get Shopify config
//     const config = await db.query.shopifyConfigs.findFirst({
//       where: eq(shopifyConfigs.agentId, agentId),
//     })

//     if (!config) {
//       return NextResponse.json({ error: "Configuration not found" }, { status: 404 })
//     }

//     // Don't return sensitive information
//     return NextResponse.json({
//       shopDomain: config.shopDomain,
//       enableProductRecommendations: config.enableProductRecommendations,
//       maxProductsToShow: config.maxProductsToShow,
//     })
//   } catch (error) {
//     console.error("Error fetching Shopify configuration:", error)
//     return NextResponse.json({ error: "Failed to fetch Shopify configuration" }, { status: 500 })
//   }
// }
