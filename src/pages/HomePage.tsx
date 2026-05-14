import {
  ArrowRight,
  Crown,
  Gauge,
  Grid3x3,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'

import { HomeFloatingTiles } from '@/components/home/HomeFloatingTiles'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { mockLeaderboard } from '@/mock/mockData'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

const features = [
  {
    icon: Grid3x3,
    title: 'Premium board',
    description: 'Classic 15×15 grid, bonus squares, and crisp tile presentation built for clarity at any screen size.',
  },
  {
    icon: Zap,
    title: 'Snappy turns',
    description: 'Drag tiles from your rack, preview placements, and submit with responsive feedback tuned for flow.',
  },
  {
    icon: Gauge,
    title: 'Live scoring',
    description: 'Letter and word multipliers, cross-word detection, and animated score celebrations on every play.',
  },
  {
    icon: Sparkles,
    title: 'Polished demo',
    description: 'Frontend-only prototype you can extend — no backend required to explore the full loop.',
  },
] as const

export function HomePage() {
  const navigate = useNavigate()
  const topPlayers = mockLeaderboard.slice(0, 5)

  return (
    <div className="space-y-0 overflow-x-hidden pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-2xl shadow-primary/5 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.12] via-transparent to-sky-500/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <HomeFloatingTiles />

        <div className="relative z-10 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <Badge
                variant="secondary"
                className="mb-6 border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-sm shadow-primary/10"
              >
                <Crown className="mr-1.5 inline h-3.5 w-3.5" />
                Competitive wordplay · Built for multiplayer nights
              </Badge>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl lg:leading-[1.05]"
            >
              Scrabble, elevated.
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              A polished, game-first experience — premium visuals, smooth motion, and a board that feels alive.
              Gather at the lobby, create a room, and play locally with a friend on one device.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="h-12 min-w-[200px] rounded-xl bg-gradient-to-r from-primary to-primary/85 px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  onClick={() => navigate('/lobby')}
                >
                  Enter lobby
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 min-w-[200px] rounded-xl border-border/80 bg-background/60 backdrop-blur-sm"
                  onClick={() => navigate('/game/demo')}
                >
                  Quick match
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                Live demo board
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                Motion-driven UI
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                2-player local turns
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative mx-auto max-w-6xl px-1 pt-20 sm:px-2">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.p variants={staggerItem} className="text-sm font-semibold uppercase tracking-widest text-primary">
            Game features
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you expect from a serious table
          </motion.h2>
          <motion.p variants={staggerItem} className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Thoughtful defaults, tactile feedback, and a layout that scales from phone to desktop without losing the
            magic.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
            >
              <Card className="group h-full overflow-hidden border-border/70 bg-card/60 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl border border-primary/15 bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Multiplayer */}
      <section className="relative mx-auto max-w-6xl px-1 pt-24 sm:px-2">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-primary/[0.06] p-8 shadow-xl sm:p-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-14">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="outline" className="mb-4 border-primary/25 bg-background/50">
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Multiplayer experience
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Play together, on one device</h2>
            <p className="mt-4 text-muted-foreground">
              Alternate turns, manage racks, and keep the pace high — perfect for couch co-op, tournaments, or teaching
              someone the ropes without juggling accounts.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                'Shared lobby with room creation and quick join',
                'Clear turn ownership and score feedback after every play',
                'Chat panel mock for that “live table” atmosphere',
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.45)]" />
                  <span className="text-foreground/90">{line}</span>
                </li>
              ))}
            </ul>
            <motion.div className="mt-10" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="rounded-xl" onClick={() => navigate('/lobby')}>
                Browse rooms
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] max-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.35),transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="grid w-full max-w-[200px] grid-cols-5 gap-1.5 opacity-90 sm:max-w-[240px]">
                  {['W', 'O', 'R', 'D', 'S'].map((L, idx) => (
                    <motion.div
                      key={L + idx}
                      className={cn(
                        'flex aspect-square items-center justify-center rounded-md border border-white/20 bg-white/10 text-sm font-bold text-white shadow-inner',
                        idx === 2 && 'ring-2 ring-amber-400/80',
                      )}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * idx, type: 'spring', stiffness: 380, damping: 22 }}
                    >
                      {L}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/90 backdrop-blur-md">
                <span>Table ready</span>
                <span className="font-mono text-amber-300/95">P1 → P2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="relative mx-auto max-w-6xl px-1 pt-24 sm:px-2">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leaderboard</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">Top players this season</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Preview data — wire to your backend when you are ready. Rankings update the competitive vibe of the
              landing page.
            </p>
          </div>
          <Button variant="outline" className="rounded-xl border-border/80" asChild>
            <Link to="/leaderboard">Full leaderboard</Link>
          </Button>
        </div>

        <motion.div
          className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-3 border-b border-border/60 bg-muted/30 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-6">
            <span>#</span>
            <span>Player</span>
            <span className="text-right">Rating</span>
            <span className="text-right">Streak</span>
          </div>
          <div className="divide-y divide-border/50">
            {topPlayers.map((row, idx) => (
              <motion.div
                key={row.handle}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-primary/[0.04] sm:px-6"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * idx, duration: 0.35 }}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold',
                    idx === 0 && 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
                    idx === 1 && 'bg-zinc-300/40 text-zinc-800 dark:bg-zinc-600/40 dark:text-zinc-100',
                    idx === 2 && 'bg-orange-700/20 text-orange-900 dark:text-orange-200',
                    idx > 2 && 'bg-muted text-muted-foreground',
                  )}
                >
                  {row.rank}
                </span>
                <span className="truncate font-medium">{row.handle}</span>
                <span className="text-right font-mono text-sm text-muted-foreground">{row.rating}</span>
                <span className="text-right font-mono text-sm font-semibold text-primary">{row.streak}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-1 pt-24 sm:px-2">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/20 via-card to-sky-500/15 p-10 text-center shadow-2xl shadow-primary/15 sm:p-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />

          <Trophy className="mx-auto h-10 w-10 text-primary drop-shadow-md" />
          <h2 className="relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Your next match starts here</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-muted-foreground">
            Jump into the lobby, spin up a room, and play a full frontend Scrabble demo with scoring, validation, and
            turn flow.
          </p>
          <Separator className="relative mx-auto my-8 max-w-md bg-border/60" />
          <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button size="lg" className="h-12 rounded-xl px-8 shadow-lg shadow-primary/20" onClick={() => navigate('/lobby')}>
                Get started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button size="lg" variant="secondary" className="h-12 rounded-xl px-8" asChild>
                <Link to="/profile">View profile</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
