// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const { shopDomain, apiKey, accessToken } = await req.json()

//     // Validate required fields
//     if (!shopDomain || !apiKey || !accessToken) {
//       return NextResponse.json({ error: "Missing required Shopify credentials" }, { status: 400 })
//     }

//     // Test connection to Shopify API
//     try {
//       const response = await fetch(`https://${shopDomain}.myshopify.com/admin/api/2023-07/shop.json`, {
//         headers: {
//           "X-Shopify-Access-Token": accessToken,
//           "Content-Type": "application/json",
//         },
//       })

//       if (!response.ok) {
//         throw new Error(`Shopify API error: ${response.statusText}`)
//       }

//       const data = await response.json()

//       return NextResponse.json({
//         success: true,
//         shop: {
//           name: data.shop.name,
//           email: data.shop.email,
//           domain: data.shop.domain,
//         },
//       })
//     } catch (error) {
//       console.error("Shopify connection test failed:", error)
//       return NextResponse.json(
//         {
//           error: "Failed to connect to Shopify. Please check your credentials.",
//         },
//         { status: 400 },
//       )
//     }
//   } catch (error) {
//     console.error("Error testing Shopify connection:", error)
//     return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
//   }
// }
