import type { Tile } from '@/types/game'

type TileSpec = { letter: string; points: number; count: number }

// Official English-language Scrabble distribution (100 tiles, including 2 blanks).
const TILE_SPECS: TileSpec[] = [
  { letter: 'A', points: 1, count: 9 },
  { letter: 'B', points: 3, count: 2 },
  { letter: 'C', points: 3, count: 2 },
  { letter: 'D', points: 2, count: 4 },
  { letter: 'E', points: 1, count: 12 },
  { letter: 'F', points: 4, count: 2 },
  { letter: 'G', points: 2, count: 3 },
  { letter: 'H', points: 4, count: 2 },
  { letter: 'I', points: 1, count: 9 },
  { letter: 'J', points: 8, count: 1 },
  { letter: 'K', points: 5, count: 1 },
  { letter: 'L', points: 1, count: 4 },
  { letter: 'M', points: 3, count: 2 },
  { letter: 'N', points: 1, count: 6 },
  { letter: 'O', points: 1, count: 8 },
  { letter: 'P', points: 3, count: 2 },
  { letter: 'Q', points: 10, count: 1 },
  { letter: 'R', points: 1, count: 6 },
  { letter: 'S', points: 1, count: 4 },
  { letter: 'T', points: 1, count: 6 },
  { letter: 'U', points: 1, count: 4 },
  { letter: 'V', points: 4, count: 2 },
  { letter: 'W', points: 4, count: 2 },
  { letter: 'X', points: 8, count: 1 },
  { letter: 'Y', points: 4, count: 2 },
  { letter: 'Z', points: 10, count: 1 },
  { letter: '', points: 0, count: 2 }, // blanks
]

function randomId(prefix: string) {
  // Not cryptographic; fine for a frontend-only demo.
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

export function createOfficialTileBag(): Tile[] {
  const bag: Tile[] = []
  for (const spec of TILE_SPECS) {
    for (let i = 0; i < spec.count; i++) {
      bag.push({
        id: randomId('tile'),
        letter: spec.letter === '' ? ' ' : spec.letter,
        points: spec.points,
        isBlank: spec.letter === '',
      })
    }
  }
  return bag
}

export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function drawTiles(bag: Tile[], count: number): { drawn: Tile[]; remaining: Tile[] } {
  if (count <= 0) return { drawn: [], remaining: bag }
  const drawn = bag.slice(0, count)
  const remaining = bag.slice(count)
  return { drawn, remaining }
}

