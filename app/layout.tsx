import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkThemedProvider } from "@/components/ClerkThemedProvider"

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkThemedProvider>
            {children}
          </ClerkThemedProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
