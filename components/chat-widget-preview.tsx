"use client"

import { useState } from "react"
import { Bot, MessageSquare, Send, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ChatWidgetPreviewProps = {
  config: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
    buttonPosition: string
    buttonSize: number
    widgetWidth: number
    widgetHeight: number
    borderRadius: number
    welcomeMessage: string
    buttonIcon: string
    headerTitle: string
    showAgentAvatar: boolean
    showTimestamp: boolean
    showTypingIndicator: boolean
    enableDarkMode: boolean
    allowAttachments: boolean
  }
}

export default function ChatWidgetPreview({ config }: ChatWidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: config.welcomeMessage, timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: inputValue, timestamp: new Date() }]
    setMessages(newMessages)
    setInputValue("")

    // Simulate AI typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "This is a preview of how the AI would respond. The actual responses will come from your AI agent.",
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const getButtonIcon = () => {
    switch (config.buttonIcon) {
      case "message":
        return <MessageSquare size={24} />
      case "chat":
        return <MessageSquare size={24} />
      case "help":
        return <MessageSquare size={24} />
      case "support":
        return <MessageSquare size={24} />
      default:
        return <MessageSquare size={24} />
    }
  }

  const getButtonPositionStyles = () => {
    switch (config.buttonPosition) {
      case "bottom-right":
        return { bottom: "20px", right: "20px" }
      case "bottom-left":
        return { bottom: "20px", left: "20px" }
      case "top-right":
        return { top: "20px", right: "20px" }
      case "top-left":
        return { top: "20px", left: "20px" }
      default:
        return { bottom: "20px", right: "20px" }
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="relative border rounded-lg p-8 bg-gray-100 h-[600px] flex items-center justify-center">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "absolute",
          ...getButtonPositionStyles(),
          width: `${config.buttonSize}px`,
          height: `${config.buttonSize}px`,
          borderRadius: "50%",
          backgroundColor: config.primaryColor,
          color: "white",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        {getButtonIcon()}
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            ...getButtonPositionStyles(),
            transform: "translate(0, -60px)",
            width: `${config.widgetWidth}px`,
            height: `${config.widgetHeight}px`,
            borderRadius: `${config.borderRadius}px`,
            backgroundColor: config.backgroundColor,
            color: config.textColor,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: config.primaryColor,
              color: "white",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="flex items-center gap-2">
              {config.showAgentAvatar && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} />
                </div>
              )}
              <span className="font-medium">{config.headerTitle}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              backgroundColor: config.backgroundColor,
            }}
          >
            {messages.map((message, index) => (
              <div key={index} className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}>
                {message.role === "assistant" && config.showAgentAvatar && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Bot size={16} color="white" />
                  </div>
                )}
                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={cn("rounded-lg p-3", message.role === "user" ? "rounded-tr-none" : "rounded-tl-none")}
                    style={{
                      backgroundColor: message.role === "user" ? config.primaryColor : config.secondaryColor,
                      color: message.role === "user" ? "white" : config.textColor,
                    }}
                  >
                    {message.content}
                  </div>
                  {config.showTimestamp && (
                    <span className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</span>
                  )}
                </div>
                {message.role === "user" && config.showAgentAvatar && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && config.showTypingIndicator && (
              <div className="flex items-center gap-2">
                {config.showAgentAvatar && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Bot size={16} color="white" />
                  </div>
                )}
                <div
                  className="rounded-lg rounded-tl-none p-3 max-w-[70%]"
                  style={{
                    backgroundColor: config.secondaryColor,
                    color: config.textColor,
                  }}
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="p-3 border-t"
            style={{
              borderColor: config.secondaryColor,
            }}
          >
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
                style={{
                  backgroundColor: config.secondaryColor,
                  color: config.textColor,
                  borderColor: "transparent",
                }}
              />
              <Button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: config.primaryColor,
                  color: "white",
                }}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
