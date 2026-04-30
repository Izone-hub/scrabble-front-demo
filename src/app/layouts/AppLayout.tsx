import { Outlet } from 'react-router-dom'

import { Navbar } from '@/components/layout/Navbar'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_-10%,hsl(var(--primary)/0.15),transparent_60%),radial-gradient(900px_circle_at_90%_10%,hsl(var(--primary)/0.08),transparent_55%)]" />
      <Navbar />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}

