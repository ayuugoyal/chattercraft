import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot } from "lucide-react"
import Link from "next/link"
import { getUserAgents } from "@/lib/actions/agent-actions"
import { DeleteAgentButton } from "@/components/delete-agent-button"
import { AgentPopUp } from "@/components/agents-popup"

export default async function AgentsPage() {
  const agents = await getUserAgents()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
        <AgentPopUp />
      </div>

      {agents.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Bot className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No agents created</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground max-w-sm mx-auto">
            You haven&apos;t created any agents yet. Agents are AI chatbots that you can customize and embed on your website.
          </p>
          <AgentPopUp />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>Slug: {agent.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Provider: {agent.modelProvider}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Status:{" "}
                  {agent.isActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactive</span>
                  )}
                </p>
              </CardContent>
              <CardFooter className="flex flex-row gap-2 pt-0">
                <Link href={`/dashboard/agents/${agent.id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
                <DeleteAgentButton id={agent.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
