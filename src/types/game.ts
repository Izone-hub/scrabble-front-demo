export type Bonus =
  | 'TW'
  | 'DW'
  | 'TL'
  | 'DL'
  | 'START'
  | 'NONE'

export type BoardCell = {
  row: number
  col: number
  bonus: Bonus
  tile?: Tile
}

export type Tile = {
  id: string
  letter: string
  points: number
  isBlank?: boolean
}

export type Player = {
  id: string
  handle: string
  score: number
}

