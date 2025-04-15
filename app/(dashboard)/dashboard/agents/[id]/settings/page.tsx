"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ShopifyIntegration from "@/components/shopify-integration"
import UICustomization from "@/components/ui-customization"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"
import { AgentTable } from "@/lib/db/schema"

export default function AgentSettingsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [agent, setAgent] = useState<AgentTable>({} as AgentTable)
  const [isLoading, setIsLoading] = useState(true)
  const agentId = params.id

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`/api/agents/${agentId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch agent")
        }
        const data = await response.json()
        setAgent(data)
      } catch (error) {
        console.error("Error fetching agent:", error)
        toast({
          title: "Error",
          description: "Failed to load agent data. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard/agents")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgent()
  }, [agentId, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent not found</h1>
          <p className="text-muted-foreground">The agent you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href={`/dashboard/agents/${agentId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agent
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{agent?.name} Settings</h1>
        <p className="text-muted-foreground">Configure your agent&apos;s integrations and appearance.</p>
      </div>

      <Tabs defaultValue="shopify" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="shopify">Shopify Integration</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="shopify" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shopify Integration</CardTitle>
              <CardDescription>
                Connect your Shopify store to enable product recommendations in your chat agent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShopifyIntegration agentId={agentId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Widget Appearance</CardTitle>
              <CardDescription>Customize how your chat widget looks to match your brand.</CardDescription>
            </CardHeader>
            <CardContent>
              <UICustomization agentId={agentId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
