import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Bot, ExternalLink, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserAgents } from "@/lib/actions/agent-actions"
import { AgentPopUp } from "@/components/agents-popup"
import { Badge } from "@/components/ui/badge"

export default async function DashboardPage() {
  const agents = await getUserAgents()
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <AgentPopUp />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
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
        {/* <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Track your agent conversations</p>
          </CardContent>
        </Card> */}
        {/* <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">Monitor user engagement</p>
          </CardContent>
        </Card> */}
      </div>

      {/* My Agents Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">My Agents</h2>
          <p className="text-sm text-muted-foreground">
            {agents.length === 0
              ? "No agents created yet"
              : `Showing ${agents.length} agent${agents.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {agents.length === 0 ? (
          <Card className="border-dashed text-center p-10">
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No agents created yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first AI agent to embed on your website or share with others.
              </p>
              <AgentPopUp />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {agent.name}
                        {agent.isActive ? (
                          <Badge variant="default" className="text-xs bg-[green] hover:bg-[green]">Active</Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">Inactive</Badge>
                        )}
                      </CardTitle>
                    </div>
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="text-sm pb-2">
                  <div className="text-xs text-muted-foreground mb-2 flex items-center">
                    <LinkIcon className="h-3 w-3 mr-1" />
                    <span className="truncate">{process.env.NEXT_PUBLIC_BASE_URL + "/chat/" + agent.slug}</span>
                  </div>
                  <p className="line-clamp-2 text-sm h-10">
                    {agent.systemPrompt}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 pt-0">
                  <Link href={`/dashboard/agents/${agent.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/chat/${agent.slug}`} target="_blank" className="w-full">
                    <Button variant="default" size="sm" className="w-full">
                      Test <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}