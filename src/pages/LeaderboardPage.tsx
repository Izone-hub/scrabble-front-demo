import { Trophy } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { mockLeaderboard } from '@/mock/mockData'

export function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Mock ratings and streaks for UI testing.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">Top players</CardTitle>
            <CardDescription>Season: Spring 2026 (mock)</CardDescription>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Trophy className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockLeaderboard.map((row, idx) => (
            <div key={row.rank}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    #{row.rank} {row.handle}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Rating {row.rating} • Streak {row.streak}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">+{Math.max(1, 12 - row.rank)} today</div>
              </div>
              {idx !== mockLeaderboard.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

