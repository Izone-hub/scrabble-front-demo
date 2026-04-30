export type UserProfile = {
  id: string
  handle: string
  rating: number
  avatarUrl?: string
  stats: {
    gamesPlayed: number
    winRate: number
    bestWord: { word: string; points: number }
  }
}

export type GameRoomSummary = {
  id: string
  name: string
  players: number
  maxPlayers: number
  status: 'waiting' | 'in_progress' | 'finished'
  timeControl: string
}

export type LeaderboardEntry = {
  rank: number
  handle: string
  rating: number
  streak: number
}

export type ChatMessage = {
  id: string
  from: string
  message: string
  at: string
}

