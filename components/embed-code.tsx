"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface EmbedCodeProps {
  slug: string
  baseUrl?: string
}

export function EmbedCode({ slug, baseUrl = "https://chatappsaas.ai" }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = `<script src="${baseUrl}/embed.js" data-slug="${slug}"></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-muted p-4 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Embed Code</p>
        <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="bg-background p-3 rounded border overflow-x-auto text-xs">{embedCode}</pre>
    </div>
  )
}
