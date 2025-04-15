"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

interface EmbedCodeProps {
  name: string,
  baseUrl: string
  testButton?: boolean
}

export function CopyLink({ name, baseUrl, testButton }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-muted p-4 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{name}</p>
        <div>

          {
            testButton &&
            <Link href={baseUrl} target="_blank">
              <Button variant="ghost" size="sm" className="h-8 gap-1 hover:underline" >
                <ExternalLink className="h-4 w-4" />
                Test Agent
              </Button>
            </Link>
          }
          <Button variant="ghost" size="sm" className="h-8 gap-1 " onClick={copyToClipboard}>
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
      </div>
      <pre className="bg-background p-3 rounded border overflow-x-auto text-xs">{baseUrl}</pre>
    </div >
  )
}
