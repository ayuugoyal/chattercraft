"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getAgentBySlug } from "@/lib/actions/agent-actions"
import { AgentTable } from "@/lib/db/schema"

export default function ChatPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [agent, setAgent] = useState<AgentTable>({} as AgentTable)
  const [isAgentLoading, setIsAgentLoading] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Fetch agent details
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const agentData = await getAgentBySlug(slug)
        if (agentData) {
          setAgent(agentData)
        } else {
          setAgent({ name: "AI Assistant" } as AgentTable)
        }
      } catch (err) {
        console.error("Failed to fetch agent details:", err)
        setAgent(
          { name: "AI Assitant" } as AgentTable,
        )
      } finally {
        setIsAgentLoading(false)
      }
    }

    fetchAgentDetails()
  }, [slug])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Group messages by sender for better visual grouping
  const groupedMessages = messages.reduce(
    (groups, message, index) => {
      const prevMessage = messages[index - 1]
      const isSameRole = prevMessage && prevMessage.role === message.role

      if (isSameRole) {
        groups[groups.length - 1].messages.push(message)
      } else {
        groups.push({
          role: message.role,
          messages: [message],
        })
      }

      return groups
    },
    [] as { role: string; messages: typeof messages }[],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen bg-gradient-to-b from-background to-background/80"
    >
      {/* Header */}
      <motion.header
        className="border-b p-4 bg-background/90 backdrop-blur-sm sticky top-0 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={"/bot.avif"} alt={agent?.name || "Agent"} />
              <AvatarFallback className="bg-primary/10 text-primary-foreground">
                {agent?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <motion.div
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </motion.div>

          <div className="flex flex-col">
            <h1 className="font-semibold text-lg">
              {isAgentLoading ? (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Loading</span>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </motion.div>
                </div>
              ) : (
                agent?.name
              )}
            </h1>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {groupedMessages.map((group, groupIndex) => (
              <motion.div
                key={`group-${groupIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn("flex gap-3", group.role === "user" ? "justify-end" : "justify-start")}
              >
                {group.role !== "user" && (
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarImage

                      alt={agent?.name || "Agent"}
                    />
                    <AvatarFallback className="bg-primary/10 text-blck text-xs">
                      {agent?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn("flex flex-col gap-2 max-w-[80%]", group.role === "user" ? "items-end" : "items-start")}
                >
                  {group.messages.map((message, messageIndex) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                        delay: messageIndex * 0.1,
                      }}
                      className={cn(
                        "px-4 py-3 rounded-2xl text-sm",
                        group.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted rounded-tl-none",
                      )}
                    >
                      {message.content}
                    </motion.div>
                  ))}
                </div>

                {group.role === "user" && (
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarImage alt="You" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">You</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-start gap-3"
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    alt={agent?.name || "Agent"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary-foreground text-xs">
                    {agent?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>

                <motion.div
                  className="px-4 py-3 bg-muted rounded-2xl rounded-tl-none inline-flex items-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="h-2 w-2 bg-muted-foreground/40 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm max-w-md mx-auto"
              >
                <p className="font-medium">Error</p>
                <p className="text-xs">{error.message || "Something went wrong. Please try again."}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <motion.div
        className="border-t bg-background/80 backdrop-blur-sm p-4 sticky bottom-0 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto relative">
          <motion.div className="relative flex-1" whileFocus={{ scale: 1.01 }}>
            <input
              ref={inputRef}
              type="text"
              placeholder={`Message ${agent?.name || "..."}...`}
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              className={cn(
                "w-full py-3 px-4 pr-12 rounded-full border bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all",
                isLoading ? "text-muted-foreground" : "",
              )}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="absolute right-2">
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={isLoading || !input.trim()}
              className={cn("rounded-full h-10 w-10 bg-primary text-primary-foreground", !input.trim() && "opacity-50")}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  )
}
