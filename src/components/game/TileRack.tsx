import { Tile } from '@/components/game/Tile'
import { cn } from '@/lib/utils'
import type { Tile as TileModel } from '@/types/game'

export function TileRack({
  tiles,
  draggingTileId,
  onTileDragStart,
  onTileDragEnd,
  className,
}: {
  tiles: TileModel[]
  draggingTileId?: string
  onTileDragStart?: (tile: TileModel, index: number) => void
  onTileDragEnd?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-2xl border bg-card p-3 shadow-sm',
        className,
      )}
    >
      {tiles.map((t, idx) => (
        <Tile
          key={t.id}
          tile={t}
          className="w-9 sm:w-14"
          draggable
          isDragging={draggingTileId === t.id}
          onDragStart={(e) => {
            // Needed for browser DnD; we still use React state as the source of truth.
            e.dataTransfer.setData('application/x-scrabble-tile', t.id)
            e.dataTransfer.effectAllowed = 'move'
            onTileDragStart?.(t, idx)
          }}
          onDragEnd={() => onTileDragEnd?.()}
        />
      ))}
    </div>
  )
}

