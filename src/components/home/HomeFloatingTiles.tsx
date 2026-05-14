import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

type FloatTile = {
  letter: string
  points: number
  left: string
  top: string
  rotate: number
  delay: number
  duration: number
  scale: number
}

const FLOAT_TILES: FloatTile[] = [
  { letter: 'Q', points: 10, left: '6%', top: '14%', rotate: -14, delay: 0, duration: 9.5, scale: 1 },
  { letter: 'Z', points: 10, left: '84%', top: '10%', rotate: 11, delay: 0.4, duration: 11, scale: 0.95 },
  { letter: 'X', points: 8, left: '12%', top: '72%', rotate: -8, delay: 0.2, duration: 10.2, scale: 0.9 },
  { letter: 'J', points: 8, left: '90%', top: '58%', rotate: 16, delay: 0.8, duration: 9.8, scale: 0.88 },
  { letter: '★', points: 0, left: '48%', top: '8%', rotate: 0, delay: 0.1, duration: 12, scale: 0.75 },
  { letter: 'A', points: 1, left: '22%', top: '38%', rotate: -6, delay: 0.5, duration: 8.8, scale: 0.82 },
  { letter: 'K', points: 5, left: '76%', top: '36%', rotate: 9, delay: 0.3, duration: 10.5, scale: 0.85 },
  { letter: 'W', points: 4, left: '4%', top: '48%', rotate: -10, delay: 1.1, duration: 11.2, scale: 0.78 },
  { letter: 'M', points: 3, left: '92%', top: '78%', rotate: 7, delay: 0.6, duration: 9.2, scale: 0.8 },
]

function MiniTile({ letter, points, className }: { letter: string; points: number; className?: string }) {
  return (
    <div
      className={cn(
        'relative grid aspect-square w-14 place-items-center rounded-xl border border-white/25 bg-gradient-to-b from-white/95 to-zinc-100/90 text-zinc-900 shadow-lg shadow-black/20 dark:from-zinc-800/95 dark:to-zinc-950/90 dark:text-zinc-50 sm:w-16',
        className,
      )}
    >
      <span className="text-lg font-bold tracking-tight">{letter}</span>
      {points > 0 ? (
        <span className="absolute bottom-1 right-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400">
          {points}
        </span>
      ) : null}
    </div>
  )
}

export function HomeFloatingTiles({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)]" />
      {FLOAT_TILES.map((t, i) => (
        <motion.div
          key={`${t.letter}-${i}`}
          className="absolute will-change-transform"
          style={{
            left: t.left,
            top: t.top,
            rotate: t.rotate,
            scale: t.scale,
          }}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{
            opacity: [0.22, 0.38, 0.22],
            y: [0, -18, 0],
            rotate: [t.rotate, t.rotate + 4, t.rotate],
            filter: ['blur(0px)', 'blur(0px)', 'blur(0px)'],
          }}
          transition={{
            duration: t.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: t.delay,
          }}
        >
          <MiniTile letter={t.letter} points={t.points} />
        </motion.div>
      ))}
    </div>
  )
}
