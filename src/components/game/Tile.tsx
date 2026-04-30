import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Tile as TileModel } from '@/types/game'

const tileStyles =
  'relative grid aspect-square w-10 place-items-center rounded-xl border bg-gradient-to-b from-white to-zinc-50 text-foreground shadow-sm dark:from-zinc-900 dark:to-zinc-950'

export function Tile({
  tile,
  selected,
  draggable,
  isDragging,
  onDragStart,
  onDragEnd,
  className,
}: {
  tile: TileModel
  selected?: boolean
  draggable?: boolean
  isDragging?: boolean
  onDragStart?: React.DragEventHandler<HTMLDivElement>
  onDragEnd?: React.DragEventHandler<HTMLDivElement>
  className?: string
}) {
  return (
    <div
      className={cn(
        tileStyles,
        selected && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
        isDragging && 'opacity-50',
        className,
      )}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="text-base font-semibold tracking-tight">{tile.letter}</div>
      <div className="absolute bottom-1 right-1 text-[10px] font-semibold text-muted-foreground">
        {tile.points}
      </div>
    </div>
  )
}

