import * as React from 'react'

import { Board } from '@/components/game/Board'
import { TurnFeedbackPanel, type TurnFeedbackPayload } from '@/components/game/TurnFeedbackPanel'
import { TileRack } from '@/components/game/TileRack'
import { Button } from '@/components/ui/button'
import { ChatPanel } from '@/components/game/ChatPanel'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { makeEmptyBoard, mockChat } from '@/mock/mockGame'
import { MOCK_DICTIONARY_SET } from '@/game/mockDictionary'
import { validateAndScoreMove, type PendingPlacement } from '@/game/rules'
import { createOfficialTileBag, drawTiles, shuffleInPlace } from '@/game/tileBag'
import type { BoardCell, Tile } from '@/types/game'

export function GameRoomPage() {
  const [grid, setGrid] = React.useState<BoardCell[][]>(() => makeEmptyBoard())
  const [bag, setBag] = React.useState<Tile[]>(() => shuffleInPlace(createOfficialTileBag()))
  const [players, setPlayers] = React.useState(() => [
    { id: 'p1', handle: 'Player 1', score: 0 as number, rack: [] as Tile[] },
    { id: 'p2', handle: 'Player 2', score: 0 as number, rack: [] as Tile[] },
  ])
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0)
  const [pending, setPending] = React.useState<PendingPlacement[]>([])
  const [dragging, setDragging] = React.useState<{
    tile: Tile
    from: 'rack'
  } | null>(null)
  const [hoveredCell, setHoveredCell] = React.useState<{ row: number; col: number } | null>(null)
  const [lastTurnScore, setLastTurnScore] = React.useState<number>(0)
  const [feedback, setFeedback] = React.useState<TurnFeedbackPayload | null>(null)
  const [feedbackKey, setFeedbackKey] = React.useState(0)
  const [scoringPlayerId, setScoringPlayerId] = React.useState<string | null>(null)
  const scoreHighlightTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [ruleViolation, setRuleViolation] = React.useState<{
    message: string
    highlightCells: { row: number; col: number }[]
  } | null>(null)

  React.useEffect(() => {
    return () => {
      if (scoreHighlightTimer.current) clearTimeout(scoreHighlightTimer.current)
    }
  }, [])

  const currentPlayer = players[currentPlayerIndex]

  // Initial racks.
  React.useEffect(() => {
    setPlayers((prev) => {
      if (prev.some((p) => p.rack.length > 0)) return prev

      let nextBag = bag
      const nextPlayers = prev.map((p) => {
        const { drawn, remaining } = drawTiles(nextBag, 7)
        nextBag = remaining
        return { ...p, rack: drawn }
      })
      setBag(nextBag)
      return nextPlayers
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCellClick(cell: BoardCell) {
    // Clicking a pending tile removes it back to the current player's rack.
    const idx = pending.findIndex((p) => p.row === cell.row && p.col === cell.col)
    if (idx === -1) return
    const placement = pending[idx]

    setPending((prev) => prev.filter((_, i) => i !== idx))
    setPlayers((prev) =>
      prev.map((p, i) => (i === currentPlayerIndex ? { ...p, rack: [...p.rack, placement.tile] } : p)),
    )
    setRuleViolation(null)
    setFeedback(null)
  }

  function isOccupied(row: number, col: number) {
    if (grid[row]?.[col]?.tile) return true
    return pending.some((p) => p.row === row && p.col === col)
  }

  function tryPlaceOnCell(cell: BoardCell) {
    if (!dragging) return
    if (isOccupied(cell.row, cell.col)) return

    setPending((prev) => [...prev, { row: cell.row, col: cell.col, tile: dragging.tile }])
    setPlayers((prev) =>
      prev.map((p, i) =>
        i === currentPlayerIndex ? { ...p, rack: p.rack.filter((t) => t.id !== dragging.tile.id) } : p,
      ),
    )
    setRuleViolation(null)
    setFeedback(null)
  }

  function handleSubmitMove() {
    setLastTurnScore(0)
    setRuleViolation(null)

    const result = validateAndScoreMove({
      committedGrid: grid,
      pending,
      dictionary: MOCK_DICTIONARY_SET,
    })

    if (result.ok === false) {
      setFeedback({ kind: 'error', message: result.reason })
      setFeedbackKey((k) => k + 1)
      setRuleViolation({
        message: result.reason,
        highlightCells: result.highlightCells ?? [],
      })
      return
    }

    setLastTurnScore(result.turnScore)
    setFeedback({
      kind: 'success',
      turnScore: result.turnScore,
      words: result.words,
    })
    setFeedbackKey((k) => k + 1)

    const scorerId = players[currentPlayerIndex].id
    if (scoreHighlightTimer.current) clearTimeout(scoreHighlightTimer.current)
    setScoringPlayerId(scorerId)
    scoreHighlightTimer.current = setTimeout(() => {
      setScoringPlayerId(null)
      scoreHighlightTimer.current = null
    }, 1200)

    // Commit tiles to the board.
    setGrid((prev) => {
      const next = prev.map((row) => row.map((c) => ({ ...c })))
      for (const p of pending) {
        next[p.row][p.col].tile = p.tile
      }
      return next
    })

    // Update score + refill rack.
    setPlayers((prev) => {
      const next = prev.map((p) => ({ ...p, rack: [...p.rack] }))
      next[currentPlayerIndex].score += result.turnScore
      return next
    })

    // Draw up to 7.
    setBag((prevBag) => {
      const need = Math.max(0, 7 - currentPlayer.rack.length)
      const { drawn, remaining } = drawTiles(prevBag, need)
      if (drawn.length) {
        setPlayers((prev) =>
          prev.map((p, i) =>
            i === currentPlayerIndex ? { ...p, rack: [...p.rack, ...drawn] } : p,
          ),
        )
      }
      return remaining
    })

    setPending([])
    setDragging(null)
    setHoveredCell(null)
    setRuleViolation(null)
    setCurrentPlayerIndex((i) => (i + 1) % 2)
  }

  function handlePassTurn() {
    const hadPending = pending.length > 0
    // Return pending tiles to current rack before passing.
    if (hadPending) {
      setPlayers((prev) =>
        prev.map((p, i) =>
          i === currentPlayerIndex ? { ...p, rack: [...p.rack, ...pending.map((pp) => pp.tile)] } : p,
        ),
      )
      setPending([])
    }
    setDragging(null)
    setHoveredCell(null)
    setLastTurnScore(0)
    setRuleViolation(null)
    setFeedback({
      kind: 'pass',
      message: hadPending
        ? 'Tiles returned to your rack. Passing to the next player.'
        : 'Passing to the next player.',
    })
    setFeedbackKey((k) => k + 1)
    setCurrentPlayerIndex((i) => (i + 1) % 2)
  }

  function dismissErrorFeedback() {
    setFeedback(null)
    setRuleViolation(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Scrabble Demo</h1>
          <p className="text-sm text-muted-foreground">
            Local 2-player demo · Tiles left in bag: {bag.length}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Board
            grid={grid}
            onCellClick={handleCellClick}
            pending={pending}
            ruleHighlights={ruleViolation?.highlightCells}
            draggingTileId={dragging?.tile.id ?? null}
            hoveredCell={hoveredCell}
            onCellDragEnter={(cell) => setHoveredCell({ row: cell.row, col: cell.col })}
            onCellDragLeave={(cell) => {
              setHoveredCell((prev) =>
                prev?.row === cell.row && prev?.col === cell.col ? null : prev,
              )
            }}
            onCellDrop={(cell) => {
              tryPlaceOnCell(cell)
              setDragging(null)
              setHoveredCell(null)
            }}
          />
          <TileRack
            tiles={currentPlayer.rack}
            draggingTileId={dragging?.tile.id ?? undefined}
            onTileDragStart={(tile, _fromRackIndex) => setDragging({ tile, from: 'rack' })}
            onTileDragEnd={() => {
              setDragging(null)
              setHoveredCell(null)
            }}
          />
        </div>

        <div className="space-y-4">
          <ChatPanel initialMessages={mockChat} />
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Turn</CardTitle>
              <CardDescription>
                Current: <Badge variant="secondary">{currentPlayer.handle}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <Button onClick={handleSubmitMove} disabled={pending.length === 0}>
                  Submit move
                </Button>
                <Button variant="outline" onClick={handlePassTurn}>
                  Pass turn
                </Button>
              </div>

              <TurnFeedbackPanel
                payload={feedback}
                feedbackKey={feedbackKey}
                onDismissError={dismissErrorFeedback}
              />

              <div className="rounded-xl border bg-card/80 p-3 text-sm backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Pending tiles</div>
                  <div className="font-semibold tabular-nums">{pending.length}</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-muted-foreground">Last turn score</div>
                  <div
                    className={cn(
                      'font-semibold tabular-nums transition-colors duration-300',
                      lastTurnScore > 0 && 'text-emerald-600 dark:text-emerald-400',
                    )}
                  >
                    {lastTurnScore}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base">Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {players.map((p, idx) => (
                <div
                  key={p.id}
                  className={cn(
                    'flex items-center justify-between rounded-xl border bg-card px-3 py-2 transition-shadow duration-300',
                    scoringPlayerId === p.id &&
                      'ring-2 ring-primary/60 shadow-[0_0_22px_rgba(139,92,246,0.28)]',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{p.handle}</div>
                    {idx === currentPlayerIndex ? <Badge>Turn</Badge> : null}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-semibold tabular-nums transition-transform duration-300',
                      scoringPlayerId === p.id && 'scale-110 text-primary',
                    )}
                  >
                    {p.score}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

