import { cn } from '@/lib/utils'
import type { BoardCell, Bonus } from '@/types/game'

import { Tile } from './Tile'
import type { PendingPlacement } from '@/game/rules'

const bonusStyles: Record<Bonus, { bg: string; label: string }> = {
  TW: { bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-300', label: 'TW' },
  DW: { bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-300', label: 'DW' },
  TL: { bg: 'bg-sky-500/15 text-sky-600 dark:text-sky-300', label: 'TL' },
  DL: { bg: 'bg-sky-500/10 text-sky-600 dark:text-sky-300', label: 'DL' },
  START: { bg: 'bg-primary/10 text-primary', label: '★' },
  NONE: { bg: 'bg-muted/30 text-muted-foreground', label: '' },
}

export function Board({
  grid,
  className,
  onCellClick,
  pending,
  draggingTileId,
  hoveredCell,
  onCellDragEnter,
  onCellDragLeave,
  onCellDrop,
}: {
  grid: BoardCell[][]
  className?: string
  onCellClick?: (cell: BoardCell) => void
  pending?: PendingPlacement[]
  draggingTileId?: string | null
  hoveredCell?: { row: number; col: number } | null
  onCellDragEnter?: (cell: BoardCell) => void
  onCellDragLeave?: (cell: BoardCell) => void
  onCellDrop?: (cell: BoardCell) => void
}) {
  const pendingMap = new Map<string, PendingPlacement>()
  for (const p of pending ?? []) pendingMap.set(`${p.row}-${p.col}`, p)

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-2 shadow-sm sm:p-3',
        className,
      )}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}
      >
        {grid.flat().map((cell) => {
          const pendingTile = pendingMap.get(`${cell.row}-${cell.col}`)?.tile
          return (
            <button
              key={`${cell.row}-${cell.col}`}
              type="button"
              onClick={() => onCellClick?.(cell)}
              onDragOver={(e) => {
                if (!draggingTileId) return
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
              }}
              onDragEnter={() => {
                if (!draggingTileId) return
                onCellDragEnter?.(cell)
              }}
              onDragLeave={() => {
                if (!draggingTileId) return
                onCellDragLeave?.(cell)
              }}
              onDrop={(e) => {
                if (!draggingTileId) return
                e.preventDefault()
                onCellDrop?.(cell)
              }}
              className={cn(
                'group relative aspect-square rounded-lg border border-border/70 p-0.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                bonusStyles[cell.bonus].bg,
                hoveredCell?.row === cell.row &&
                  hoveredCell?.col === cell.col &&
                  draggingTileId &&
                  (cell.tile || pendingTile ? 'ring-2 ring-destructive' : 'ring-2 ring-primary'),
              )}
              aria-label={`Cell ${cell.row + 1}, ${cell.col + 1}`}
            >
              {cell.tile || pendingTile ? (
                <Tile tile={(pendingTile ?? cell.tile)!} className="w-full rounded-lg" />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-[10px] font-semibold opacity-70">
                  {bonusStyles[cell.bonus].label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

