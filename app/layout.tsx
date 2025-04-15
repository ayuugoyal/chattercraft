import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkThemedProvider } from "@/components/ClerkThemedProvider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ChatterCraft - Create AI Chatbots for Your Website",
  description: "Create, customize, and deploy AI chatbots on your website with ChatterCraft",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000" + "/embed.js"
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkThemedProvider>
            {children}
            <Script src={url} data-slug="chattercraft-ai-assistant-zore7s"></Script>
          </ClerkThemedProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
