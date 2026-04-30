import type { GameRoomSummary, LeaderboardEntry, UserProfile } from '@/types/models'

export const mockUser: UserProfile = {
  id: 'u_01',
  handle: 'Biruk',
  rating: 1420,
  avatarUrl: '',
  stats: {
    gamesPlayed: 128,
    winRate: 0.56,
    bestWord: { word: 'QUIZZED', points: 84 },
  },
}

export const mockRooms: GameRoomSummary[] = [
  {
    id: 'g_1001',
    name: 'Weekend Blitz',
    players: 2,
    maxPlayers: 2,
    status: 'in_progress',
    timeControl: '3m + 10s',
  },
  {
    id: 'g_1002',
    name: 'Chill Practice',
    players: 1,
    maxPlayers: 2,
    status: 'waiting',
    timeControl: '10m',
  },
  {
    id: 'g_1003',
    name: 'Friends Table',
    players: 2,
    maxPlayers: 4,
    status: 'in_progress',
    timeControl: 'Casual',
  },
]

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, handle: 'NovaLex', rating: 2140, streak: 8 },
  { rank: 2, handle: 'TileTitan', rating: 2088, streak: 5 },
  { rank: 3, handle: 'VowelViper', rating: 2017, streak: 4 },
  { rank: 4, handle: 'Biruk', rating: 1420, streak: 2 },
  { rank: 5, handle: 'BoardBaron', rating: 1388, streak: 1 },
]

