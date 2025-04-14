import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserAgents } from "@/lib/actions/agent-actions"
import { AgentPopUp } from "@/components/agents-popup"

export default async function DashboardPage() {
  const agents = await getUserAgents()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <AgentPopUp />
        <Link href="/dashboard/agents/new">
          <Button>Create Agent</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              {agents.length === 0
                ? "Create your first agent to get started"
                : `${agents.filter((a) => a.isActive).length} active agents`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Track your agent conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Monitor user engagement</p>
          </CardContent>
        </Card>
      </div>

      {agents.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Embed Your Chatbot</h2>
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm mb-2">Add this code to your website to embed your chatbot:</p>
            <pre className="bg-background p-3 rounded border overflow-x-auto text-xs">
              {`<script src="${process.env.NEXT_PUBLIC_APP_URL || "https://chatappsaas.ai"}/embed.js" data-slug="${agents[0].slug}"></script>`}
            </pre>
            <div className="mt-4">
              <Link href={`/chat/${agents[0].slug}`} target="_blank">
                <Button variant="outline" size="sm">
                  Test Your Chatbot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
