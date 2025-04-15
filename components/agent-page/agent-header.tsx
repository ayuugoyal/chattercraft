import React from 'react'
import { Badge } from '../ui/badge'
import { Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { AgentTable } from '@/lib/db/schema'

const AgentHeader = (agent: AgentTable) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{agent.name}</h1>
          {agent.isActive ? (
            <Badge variant="outline">Active</Badge>
          ) : (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <Calendar className="h-4 w-4" />
          <p>Created {formatDistanceToNow(new Date(agent.createdAt), { addSuffix: true })}</p>
        </div>
      </div>
    </div>
  )
}

export default AgentHeader