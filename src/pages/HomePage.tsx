import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Multiplayer • Practice Mode • Mobile-first
          </div>

          <CardTitle className="text-2xl sm:text-3xl">
            The ultimate Scrabble showdown — smart, smooth, and built for word champions.
          </CardTitle>

          <CardDescription className="max-w-2xl">
            Challenge friends, sharpen your vocabulary, and enjoy a polished game interface designed for fast matches, competitive play, and endless fun.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => navigate('/lobby')}>
            Join Lobby <ArrowRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={() => navigate('/game/g_1001')}>
            Start Quick Match
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

