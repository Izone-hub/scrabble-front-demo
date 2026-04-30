import { Flame, Star } from 'lucide-react'

import { mockUser } from '@/mock/mockData'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ProfilePage() {
  const initials = mockUser.handle.slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Mock profile, stats, and badges.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-base font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-base">{mockUser.handle}</CardTitle>
              <CardDescription>Rating {mockUser.rating} • Scrabble Arena</CardDescription>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3.5 w-3.5" /> Verified (mock)
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Flame className="h-3.5 w-3.5" /> Streak 2 (mock)
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          <Stat label="Games played" value={mockUser.stats.gamesPlayed.toLocaleString()} />
          <Stat label="Win rate" value={`${Math.round(mockUser.stats.winRate * 100)}%`} />
          <Stat label="Best word" value={`${mockUser.stats.bestWord.word} (${mockUser.stats.bestWord.points})`} />
        </CardContent>
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="pt-1 text-sm font-semibold">{value}</div>
    </div>
  )
}

