"use client"
import React from 'react'
import { CopyLink } from "@/components/embed-code"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Copy, ExternalLink, MessageSquare } from "lucide-react"
import { AgentTable } from '@/lib/db/schema'
import Link from 'next/link'
import { Button } from '../ui/button'

const AgentTabs = (agentData: AgentTable) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const testUrl = `${baseUrl}/chat/${agentData.slug}`
  const embedCode = `<script src="${baseUrl}/embed.js" data-slug="${agentData.slug}"></script>`

  return (
    <Tabs defaultValue="embed" className="mt-6">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="embed">Embed</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              Agent Configuration
            </CardTitle>
            <CardDescription>Basic information about your chatbot agent.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <div className="bg-muted p-2 rounded-md text-sm">{agentData.name}</div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <div className="bg-muted p-2 rounded-md text-sm">
                  {agentData.isActive ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                      Inactive
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Test URL</label>
                <div className="bg-muted p-2 rounded-md text-sm flex justify-between items-center">
                  <span className="truncate">{testUrl}</span>
                  <div className="flex gap-1">
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => {
                        navigator.clipboard.writeText(testUrl);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <Link href={testUrl} target="_blank">
                      <ExternalLink className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              System Prompt
            </CardTitle>
            <CardDescription>Instructions that define how your chatbot behaves.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
              <p className="font-sans" >{agentData.systemPrompt}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="embed">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Embed Your Chatbot
            </CardTitle>
            <CardDescription>
              Add this code to your website to embed your chatbot. The chatbot will appear as a floating button in the
              bottom right corner of your website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <CopyLink name='Embed Code' baseUrl={embedCode} />
            </div>

            <div className="relative">
              <CopyLink name='Shareable Url' baseUrl={testUrl} testButton />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Preview</h3>
              <div className="border rounded-lg p-4 relative h-[300px] bg-background">
                <div className="absolute bottom-4 right-4 flex flex-col items-end">
                  <div className="w-[250px] h-[200px] bg-card rounded-lg shadow-lg mb-2 border overflow-hidden">
                    <div className="h-10 border-b flex items-center px-3 bg-background">
                      <span className="text-sm font-medium">Chat with {agentData.name}</span>
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
          <CardFooter className="flex justify-between border-t pt-6">
            <Link href={testUrl} target="_blank">
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Test Chatbot
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AgentTabs