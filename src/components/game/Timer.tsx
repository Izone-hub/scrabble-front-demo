import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function Timer({
  yourSeconds = 165,
  opponentSeconds = 173,
}: {
  yourSeconds?: number
  opponentSeconds?: number
}) {
  const [t, setT] = React.useState({ you: yourSeconds, opp: opponentSeconds })

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setT((prev) => ({
        you: Math.max(0, prev.you - 1),
        opp: Math.max(0, prev.opp - (prev.you % 7 === 0 ? 1 : 0)),
      }))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-base">Timer</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-card p-3">
          <div className="text-xs text-muted-foreground">You</div>
          <div className="pt-1 text-lg font-semibold tabular-nums">{fmt(t.you)}</div>
        </div>
        <div className="rounded-xl border bg-card p-3">
          <div className="text-xs text-muted-foreground">Opponent</div>
          <div className="pt-1 text-lg font-semibold tabular-nums">{fmt(t.opp)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

