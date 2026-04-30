import * as React from 'react'
import { Plus, Swords, Timer, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { mockRooms } from '@/mock/mockData'
import type { GameRoomSummary } from '@/types/models'

const TIME_CONTROLS = ['Casual', '3m + 10s', '10m'] as const

function makeRoomId() {
  return `g_${Math.floor(Math.random() * 9000 + 1000)}`
}

export function LobbyPage() {
  const navigate = useNavigate()
  const [rooms, setRooms] = React.useState<GameRoomSummary[]>(() => mockRooms)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [roomName, setRoomName] = React.useState('Friends Table')
  const [timeControl, setTimeControl] = React.useState<(typeof TIME_CONTROLS)[number]>('Casual')
  const [error, setError] = React.useState<string | null>(null)

  function handleCreateRoom() {
    setError(null)
    const name = roomName.trim()
    if (!name) {
      setError('Please enter a room name.')
      return
    }

    const newRoom: GameRoomSummary = {
      id: makeRoomId(),
      name,
      players: 1,
      maxPlayers: 2,
      status: 'waiting',
      timeControl,
    }

    setRooms((prev) => [newRoom, ...prev])
    setCreateOpen(false)
    navigate(`/game/${newRoom.id}`)
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-sky-500/10 to-transparent" />
          <CardContent className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <Swords className="h-4 w-4" />
                Scrabble demo lobby
              </div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Pick a table and play</h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                rooms for quick local play. Create a room, jump in, and start placing tiles.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" onClick={() => navigate('/game/demo')}>
                Quick play
              </Button>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4" />
                    Create room
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create room</DialogTitle>
                    <DialogDescription>Set up a table for 2 local players (mock).</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Room name</div>
                      <Input
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="e.g. Weekend Blitz"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        Time control
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {TIME_CONTROLS.map((tc) => (
                          <Button
                            key={tc}
                            type="button"
                            variant={tc === timeControl ? 'default' : 'outline'}
                            onClick={() => setTimeControl(tc)}
                          >
                            {tc}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {error ? <div className="text-sm text-destructive">{error}</div> : null}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRoom}>Create &amp; enter</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-sm font-semibold">Active rooms</div>
          <div className="text-xs text-muted-foreground">Mock list + rooms you create locally.</div>
        </div>
        <Badge variant="outline">{rooms.length} rooms</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <CardTitle className="truncate text-base">{room.name}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {room.players}/{room.maxPlayers}
                    </span>
                    <span className="opacity-60">•</span>
                    <span className="inline-flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      {room.timeControl}
                    </span>
                  </CardDescription>
                </div>

                <Badge variant={room.status === 'waiting' ? 'secondary' : 'default'}>
                  {room.status === 'waiting'
                    ? 'Waiting'
                    : room.status === 'in_progress'
                      ? 'In progress'
                      : 'Finished'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">Room ID: {room.id}</div>
              <Button onClick={() => navigate(`/game/${room.id}`)}>
                {room.status === 'waiting' ? 'Join' : 'Spectate'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

