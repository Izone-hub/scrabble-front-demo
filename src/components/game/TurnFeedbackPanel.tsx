import * as React from 'react'
import { AlertTriangle, CheckCircle2, SkipForward, Sparkles, Trophy, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type TurnFeedbackPayload =
  | { kind: 'success'; turnScore: number; words: { word: string; score: number }[] }
  | { kind: 'error'; message: string }
  | { kind: 'pass'; message: string }

function useAnimatedCount(target: number, run: boolean, resetKey: number, duration = 750) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!run) {
      setValue(0)
      return
    }
    if (target <= 0) {
      setValue(0)
      return
    }

    let raf = 0
    const start = performance.now()
    const from = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 2.8
      setValue(Math.round(from + (target - from) * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setValue(target)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, resetKey, duration])

  return value
}

export function TurnFeedbackPanel({
  payload,
  feedbackKey,
  onDismissError,
}: {
  payload: TurnFeedbackPayload | null
  feedbackKey: number
  onDismissError?: () => void
}) {
  const successScore = payload?.kind === 'success' ? payload.turnScore : 0
  const runScoreAnim = payload?.kind === 'success'
  const animatedScore = useAnimatedCount(successScore, runScoreAnim, feedbackKey, 780)

  const isBigPlay =
    payload?.kind === 'success' &&
    (payload.turnScore >= 18 ||
      payload.words.some((w) => w.word.replace(/\s/g, '').length >= 7))

  if (!payload) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-muted/15 px-4 py-8 text-center">
        <p className="text-xs text-muted-foreground">
          Place tiles on the board, then <span className="font-medium text-foreground">Submit move</span> — your
          score breakdown and rule feedback show up here.
        </p>
      </div>
    )
  }

  if (payload.kind === 'success') {
    return (
      <div
        key={`success-${feedbackKey}`}
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-md',
          'from-emerald-500/12 via-card to-sky-500/10',
          'border-emerald-500/35 animate-feedback-in animate-success-glow',
        )}
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-sky-400/15 blur-2xl" />

        <div className="relative flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 shadow-sm dark:text-emerald-300">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-emerald-950 dark:text-emerald-50">
                Valid play
              </div>
              <div className="text-xs text-muted-foreground">Words locked in — nice turn.</div>
            </div>
          </div>
          {isBigPlay ? (
            <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/35 bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-900 dark:text-amber-100">
              <Sparkles className="h-3.5 w-3.5" />
              Big play
            </div>
          ) : null}
        </div>

        <div className="relative mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Turn total</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+</span>
              <span
                className={cn(
                  'font-mono text-4xl font-bold tabular-nums tracking-tight text-emerald-700 dark:text-emerald-300',
                  'animate-score-pop',
                )}
              >
                {animatedScore}
              </span>
              <span className="pb-1 text-xs text-muted-foreground">pts</span>
            </div>
          </div>
          <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-600/80 dark:text-emerald-400/80" aria-hidden />
        </div>

        <div className="relative mt-4 space-y-2">
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Words scored</div>
          <ul className="flex flex-wrap gap-2">
            {payload.words.map((w, i) => (
              <li
                key={`${w.word}-${i}`}
                style={{ animationDelay: `${i * 75}ms` }}
                className="animate-word-chip-in"
              >
                <span className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm">
                  <span className="font-semibold tracking-tight">{w.word}</span>
                  <span className="rounded-md bg-primary/15 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                    +{w.score}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  if (payload.kind === 'error') {
    return (
      <div
        key={`error-${feedbackKey}`}
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 shadow-md',
          'from-destructive/15 via-card to-destructive/5',
          'border-destructive/40 animate-feedback-in',
        )}
      >
        <div className="animate-feedback-shake">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-destructive/35 bg-destructive/15 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="text-sm font-semibold text-destructive">Move rejected</div>
                <p className="text-sm leading-snug text-muted-foreground">{payload.message}</p>
              </div>
            </div>
            {onDismissError ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-foreground"
                onClick={onDismissError}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Adjust your tiles — invalid squares are highlighted on the board.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      key={`pass-${feedbackKey}`}
      className={cn(
        'rounded-2xl border bg-gradient-to-br p-4 shadow-sm',
        'from-muted/40 via-card to-muted/20',
        'border-border animate-feedback-in',
      )}
    >
      <div className="flex items-start gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl border bg-muted/40 text-muted-foreground">
          <SkipForward className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Turn passed</div>
          <p className="mt-1 text-sm text-muted-foreground">{payload.message}</p>
        </div>
      </div>
    </div>
  )
}
