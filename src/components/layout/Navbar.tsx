import { HomeIcon, LayoutGrid, Trophy } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../public/icons/logo.png'
import { mockUser } from '@/mock/mockData'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const nav = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/lobby', label: 'Lobby', icon: LayoutGrid },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export function Navbar() {
  const navigate = useNavigate()
  const { toggleTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-left"
          >
            <img src={logo} alt="logo" className="h-9 w-9" />
            <span className="hidden sm:block">
              <div className="text-sm font-semibold leading-tight tracking-tight">
                Scrabble Arena
              </div>
              <div className="text-xs text-muted-foreground">Challenge players & sharpen your word skills</div>
            </span>
          </button>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            onClick={() => navigate('/game/g_1001')}
          >
            Jump into a game
          </Button>

          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="text-xs font-semibold">{theme === 'dark' ? 'D' : 'L'}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border bg-card px-2 py-1.5 shadow-sm transition-colors hover:bg-accent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{mockUser.handle.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold leading-tight">{mockUser.handle}</div>
                  <div className="text-xs text-muted-foreground">Rating {mockUser.rating}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/lobby')}>Lobby</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Mock data only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container pb-3 md:hidden">
        <div className="flex gap-2">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex-1 rounded-xl border bg-card px-3 py-2 text-center text-sm font-medium text-muted-foreground',
                  isActive && 'bg-accent text-accent-foreground',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

