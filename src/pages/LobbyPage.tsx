import { Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockRooms } from '@/mock/mockData'

export function LobbyPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lobby</h1>
          <p className="text-sm text-muted-foreground">
            Browse mock rooms, jump into a game room, or create a table (mock).
          </p>
        </div>
        <Button variant="outline" disabled>
          Create room (mock)
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-base">{room.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {room.players}/{room.maxPlayers} • {room.timeControl}
                  </CardDescription>
                </div>
                <Badge variant={room.status === 'waiting' ? 'secondary' : 'default'}>
                  {room.status === 'waiting' ? 'Waiting' : 'In progress'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">Room ID: {room.id}</div>
              <Button onClick={() => navigate(`/game/${room.id}`)}>Enter</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

