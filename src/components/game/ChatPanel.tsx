import * as React from 'react'
import { Send } from 'lucide-react'

import type { ChatMessage } from '@/types/models'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatPanel({
  initialMessages,
  className,
}: {
  initialMessages: ChatMessage[]
  className?: string
}) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [value, setValue] = React.useState('')

  function send() {
    const trimmed = value.trim()
    if (!trimmed) return
    setMessages((m) => [
      ...m,
      { id: String(Date.now()), from: 'You', message: trimmed, at: 'now' },
    ])
    setValue('')
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="py-4">
        <CardTitle className="text-base">Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ScrollArea className="h-48 rounded-xl border bg-card p-3">
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold">{m.from}</div>
                  <div className="text-[10px] text-muted-foreground">{m.at}</div>
                </div>
                <div className="text-sm text-muted-foreground">{m.message}</div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type a message…"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

