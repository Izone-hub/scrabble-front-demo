import type { BoardCell, Bonus, Player, Tile } from '@/types/game'
import type { ChatMessage } from '@/types/models'

const BONUS: Record<string, Bonus> = {
  '0,0': 'TW',
  '0,7': 'TW',
  '0,14': 'TW',
  '7,0': 'TW',
  '7,14': 'TW',
  '14,0': 'TW',
  '14,7': 'TW',
  '14,14': 'TW',
  '7,7': 'START',
  '1,1': 'DW',
  '2,2': 'DW',
  '3,3': 'DW',
  '4,4': 'DW',
  '10,10': 'DW',
  '11,11': 'DW',
  '12,12': 'DW',
  '13,13': 'DW',
  '1,13': 'DW',
  '2,12': 'DW',
  '3,11': 'DW',
  '4,10': 'DW',
  '10,4': 'DW',
  '11,3': 'DW',
  '12,2': 'DW',
  '13,1': 'DW',
  '1,5': 'TL',
  '1,9': 'TL',
  '5,1': 'TL',
  '5,5': 'TL',
  '5,9': 'TL',
  '5,13': 'TL',
  '9,1': 'TL',
  '9,5': 'TL',
  '9,9': 'TL',
  '9,13': 'TL',
  '13,5': 'TL',
  '13,9': 'TL',
  '0,3': 'DL',
  '0,11': 'DL',
  '2,6': 'DL',
  '2,8': 'DL',
  '3,0': 'DL',
  '3,7': 'DL',
  '3,14': 'DL',
  '6,2': 'DL',
  '6,6': 'DL',
  '6,8': 'DL',
  '6,12': 'DL',
  '7,3': 'DL',
  '7,11': 'DL',
  '8,2': 'DL',
  '8,6': 'DL',
  '8,8': 'DL',
  '8,12': 'DL',
  '11,0': 'DL',
  '11,7': 'DL',
  '11,14': 'DL',
  '12,6': 'DL',
  '12,8': 'DL',
  '14,3': 'DL',
  '14,11': 'DL',
}

export function makeEmptyBoard(): BoardCell[][] {
  return Array.from({ length: 15 }, (_, row) =>
    Array.from({ length: 15 }, (_, col) => ({
      row,
      col,
      bonus: BONUS[`${row},${col}`] ?? 'NONE',
    })),
  )
}

export const mockPlayers: Player[] = [
  { id: 'p1', handle: 'Biruk', score: 122 },
  { id: 'p2', handle: 'TileTitan', score: 137 },
]

export const mockRack: Tile[] = [
  { id: 't1', letter: 'A', points: 1 },
  { id: 't2', letter: 'R', points: 1 },
  { id: 't3', letter: 'E', points: 1 },
  { id: 't4', letter: 'N', points: 1 },
  { id: 't5', letter: 'S', points: 1 },
  { id: 't6', letter: 'Q', points: 10 },
  { id: 't7', letter: 'U', points: 1 },
]

export const mockChat: ChatMessage[] = [
  { id: 'm1', from: 'TileTitan', message: 'gg so far — nice rack pressure', at: '09:12' },
  { id: 'm2', from: 'Biruk', message: 'thanks! trying to find a bingo line', at: '09:13' },
  { id: 'm3', from: 'TileTitan', message: 'watch the triple lane at 14,11', at: '09:14' },
]

