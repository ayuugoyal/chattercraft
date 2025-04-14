import type React from "react"
import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { auth, clerkClient } from "@clerk/nextjs/server"
import Link from "next/link"
import { Bot, LayoutDashboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const clerk = await clerkClient()
  const user = await clerk.users.getUser(userId);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <header className="top-0 border-b bg-background">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center gap-2 font-bold text-xl">
                <Bot className="h-6 w-6" />
                <span>ChatterCraft</span>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <div className="flex-1 flex">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 font-bold text-xl p-4">
                <Bot className="h-6 w-6" />
                <span className="group-data-[collapsible=icon]:hidden">ChatterCraft</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Agents">
                    <Link href="/dashboard/agents">
                      <Bot className="h-4 w-4" />
                      <span>Agents</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
              <SidebarSeparator />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-8">
                      <UserButton
                        afterSignOutUrl="/"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
