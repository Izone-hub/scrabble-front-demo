import type { Player } from '@/types/game'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Scoreboard({ players }: { players: Player[] }) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-base">Scoreboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((p) => (
          <div key={p.id} className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{p.handle}</div>
              <div className="text-xs text-muted-foreground">Mock player</div>
            </div>
            <div className="rounded-xl border bg-card px-3 py-1 text-sm font-semibold">
              {p.score}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

