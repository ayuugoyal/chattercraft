"use client"

import { useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { Bot, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ChatPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: `/api/chat/${slug}`,
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h1 className="font-medium">Chat with {slug}</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3",
              message.role === "user" ? "ml-auto bg-primary/10 max-w-[80%]" : "bg-muted max-w-[80%]",
            )}
          >
            <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className="text-sm">{message.content}</div>
          </div>
        ))}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            Error: {error.message || "Something went wrong. Please try again."}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
