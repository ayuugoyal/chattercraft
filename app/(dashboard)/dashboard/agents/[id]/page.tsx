import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAgentById } from "@/lib/actions/agent-actions"
import { EmbedCode } from "@/components/embed-code"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = await getAgentById(params.id)

  if (!agent) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
          <p className="text-muted-foreground">
            Created {formatDistanceToNow(new Date(agent.createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/agents/${agent.id}/edit`}>
            <Button variant="outline">Edit Agent</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="embed">Embed</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Basic information about your chatbot agent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{agent.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Slug</p>
                  <p className="text-sm text-muted-foreground">{agent.slug}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Model Provider</p>
                  <p className="text-sm text-muted-foreground capitalize">{agent.modelProvider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm">
                    {agent.isActive ? (
                      <span className="text-green-600 font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inactive</span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>Instructions that define how your chatbot behaves.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">{agent.systemPrompt}</pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="embed">
          <Card>
            <CardHeader>
              <CardTitle>Embed Your Chatbot</CardTitle>
              <CardDescription>
                Add this code to your website to embed your chatbot. The chatbot will appear as a floating button in the
                bottom right corner of your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmbedCode slug={agent.slug} baseUrl={process.env.NEXT_PUBLIC_APP_URL || "https://chatappsaas.ai"} />

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="border rounded-md p-4 relative h-[300px] bg-background">
                  <div className="absolute bottom-4 right-4 flex flex-col items-end">
                    <div className="w-[250px] h-[200px] bg-card rounded-lg shadow-lg mb-2 border overflow-hidden">
                      <div className="h-10 border-b flex items-center px-3">
                        <span className="text-sm font-medium">Chat with {agent.name}</span>
                      </div>
                      <div className="p-3 h-[calc(100%-40px)] flex flex-col justify-end">
                        <div className="bg-muted p-2 rounded text-xs">Hello! How can I help you today?</div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
