import type { BoardCell, Bonus, Tile } from '@/types/game'

export type PendingPlacement = {
  row: number
  col: number
  tile: Tile
}

type Dir = 'H' | 'V'

export type CellPos = { row: number; col: number }

export type RuleViolationCode =
  | 'NO_TILES'
  | 'OUT_OF_BOUNDS'
  | 'OCCUPIED'
  | 'NOT_IN_LINE'
  | 'TOO_SHORT'
  | 'NOT_CONTIGUOUS'
  | 'MUST_COVER_CENTER'
  | 'MUST_CONNECT'
  | 'INVALID_WORD'

export type ValidatedMove = {
  ok: true
  words: { word: string; score: number }[]
  turnScore: number
}

export type InvalidMove = {
  ok: false
  code: RuleViolationCode
  reason: string
  highlightCells?: CellPos[]
}

function isInBounds(row: number, col: number) {
  return row >= 0 && row < 15 && col >= 0 && col < 15
}

function hasCommittedTiles(grid: BoardCell[][]) {
  for (const row of grid) {
    for (const c of row) {
      if (c.tile) return true
    }
  }
  return false
}

function getFinalTileAt(
  grid: BoardCell[][],
  pendingMap: Map<string, Tile>,
  row: number,
  col: number,
): Tile | undefined {
  const key = `${row},${col}`
  return pendingMap.get(key) ?? grid[row]?.[col]?.tile
}

function getCommittedTileAt(grid: BoardCell[][], row: number, col: number): Tile | undefined {
  return grid[row]?.[col]?.tile
}

function wordMultiplierForBonus(bonus: Bonus): number {
  if (bonus === 'TW') return 3
  if (bonus === 'DW' || bonus === 'START') return 2
  return 1
}

function letterMultiplierForBonus(bonus: Bonus): number {
  if (bonus === 'TL') return 3
  if (bonus === 'DL') return 2
  return 1
}

function collectWord(
  grid: BoardCell[][],
  pendingMap: Map<string, Tile>,
  startRow: number,
  startCol: number,
  dir: Dir,
): { tiles: { row: number; col: number; tile: Tile; isPending: boolean; bonus: Bonus }[] } {
  const dr = dir === 'V' ? 1 : 0
  const dc = dir === 'H' ? 1 : 0

  // Rewind to the start of the word.
  let r = startRow
  let c = startCol
  while (isInBounds(r - dr, c - dc) && getFinalTileAt(grid, pendingMap, r - dr, c - dc)) {
    r -= dr
    c -= dc
  }

  const tiles: { row: number; col: number; tile: Tile; isPending: boolean; bonus: Bonus }[] = []
  while (isInBounds(r, c)) {
    const key = `${r},${c}`
    const pendingTile = pendingMap.get(key)
    const committedTile = grid[r]?.[c]?.tile
    const t = pendingTile ?? committedTile
    if (!t) break
    tiles.push({
      row: r,
      col: c,
      tile: t,
      isPending: Boolean(pendingTile),
      bonus: grid[r][c].bonus,
    })
    r += dr
    c += dc
  }

  return { tiles }
}

function tilesToWord(tiles: { tile: Tile }[]) {
  return tiles
    .map((t) => (t.tile.isBlank ? (t.tile.letter.trim() || ' ') : t.tile.letter))
    .join('')
    .trim()
    .toUpperCase()
}

function scoreWord(tiles: { tile: Tile; isPending: boolean; bonus: Bonus }[]) {
  let sum = 0
  let wordMult = 1
  for (const t of tiles) {
    const letterMult = t.isPending ? letterMultiplierForBonus(t.bonus) : 1
    sum += t.tile.points * letterMult
    if (t.isPending) wordMult *= wordMultiplierForBonus(t.bonus)
  }
  return sum * wordMult
}

export function validateAndScoreMove(args: {
  committedGrid: BoardCell[][]
  pending: PendingPlacement[]
  dictionary: Set<string>
}): ValidatedMove | InvalidMove {
  const { committedGrid, pending, dictionary } = args

  if (pending.length === 0)
    return { ok: false, code: 'NO_TILES', reason: 'Place at least one tile.' }

  const pendingMap = new Map<string, Tile>()
  for (const p of pending) pendingMap.set(`${p.row},${p.col}`, p.tile)

  // Basic occupancy checks.
  for (const p of pending) {
    if (!isInBounds(p.row, p.col)) {
      return {
        ok: false,
        code: 'OUT_OF_BOUNDS',
        reason: 'Out of bounds placement.',
        highlightCells: [{ row: p.row, col: p.col }],
      }
    }
    if (getCommittedTileAt(committedGrid, p.row, p.col)) {
      return {
        ok: false,
        code: 'OCCUPIED',
        reason: 'Cannot place on an occupied cell.',
        highlightCells: [{ row: p.row, col: p.col }],
      }
    }
  }

  const sameRow = pending.every((p) => p.row === pending[0].row)
  const sameCol = pending.every((p) => p.col === pending[0].col)
  if (!sameRow && !sameCol)
    return {
      ok: false,
      code: 'NOT_IN_LINE',
      reason: 'Tiles must be in one row or one column.',
      highlightCells: pending.map((p) => ({ row: p.row, col: p.col })),
    }
  const dir: Dir = sameRow ? 'H' : 'V'

  const firstMove = !hasCommittedTiles(committedGrid)

  // Main word must include all pending tiles and be contiguous.
  const anchor = pending[0]
  const main = collectWord(committedGrid, pendingMap, anchor.row, anchor.col, dir).tiles
  const mainWord = tilesToWord(main)

  if (main.length < 2)
    return {
      ok: false,
      code: 'TOO_SHORT',
      reason: 'Words must be at least 2 letters.',
      highlightCells: pending.map((p) => ({ row: p.row, col: p.col })),
    }

  // Ensure every pending tile is part of the collected main word.
  const mainKeys = new Set(main.map((t) => `${t.row},${t.col}`))
  for (const p of pending) {
    if (!mainKeys.has(`${p.row},${p.col}`)) {
      return {
        ok: false,
        code: 'NOT_CONTIGUOUS',
        reason: 'Placed tiles must form a single contiguous word.',
        highlightCells: pending.map((pp) => ({ row: pp.row, col: pp.col })),
      }
    }
  }

  if (firstMove) {
    if (!mainKeys.has('7,7'))
      return {
        ok: false,
        code: 'MUST_COVER_CENTER',
        reason: 'First word must pass through the center star.',
        highlightCells: [{ row: 7, col: 7 }, ...pending.map((p) => ({ row: p.row, col: p.col }))],
      }
  } else {
    // Must connect to existing tiles.
    const connects = pending.some((p) => {
      const neighbors = [
        [p.row - 1, p.col],
        [p.row + 1, p.col],
        [p.row, p.col - 1],
        [p.row, p.col + 1],
      ] as const
      return neighbors.some(([r, c]) => isInBounds(r, c) && Boolean(getCommittedTileAt(committedGrid, r, c)))
    })
    // Also allow extending through existing tiles (word includes a committed tile).
    const includesCommitted = main.some((t) => !t.isPending)
    if (!connects && !includesCommitted) {
      return {
        ok: false,
        code: 'MUST_CONNECT',
        reason: 'New word must connect to existing tiles.',
        highlightCells: pending.map((p) => ({ row: p.row, col: p.col })),
      }
    }
  }

  const words: { word: string; score: number; tiles: { row: number; col: number }[] }[] = []
  const mainScore = scoreWord(main)
  words.push({
    word: mainWord,
    score: mainScore,
    tiles: main.map((t) => ({ row: t.row, col: t.col })),
  })

  // Cross words for each newly placed tile.
  const crossDir: Dir = dir === 'H' ? 'V' : 'H'
  for (const p of pending) {
    const cross = collectWord(committedGrid, pendingMap, p.row, p.col, crossDir).tiles
    if (cross.length >= 2) {
      const w = tilesToWord(cross)
      words.push({
        word: w,
        score: scoreWord(cross),
        tiles: cross.map((t) => ({ row: t.row, col: t.col })),
      })
    }
  }

  // Validate words.
  for (const w of words) {
    if (!dictionary.has(w.word))
      return {
        ok: false,
        code: 'INVALID_WORD',
        reason: `Invalid word: ${w.word}`,
        highlightCells: w.tiles,
      }
  }

  const turnScore = words.reduce((acc, w) => acc + w.score, 0)
  return { ok: true, words: words.map(({ word, score }) => ({ word, score })), turnScore }
}

