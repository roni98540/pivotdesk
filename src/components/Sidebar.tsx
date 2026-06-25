'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Lightbulb,
  Flame,
  Newspaper,
  User,
  Bookmark,
  FolderOpen,
  Bell,
  Cpu,
  Zap,
  Heart,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mainNav = [
  { href: '/feed', icon: LayoutDashboard, label: 'Feed', badge: 12 },
  { href: '/feed/ideas', icon: Lightbulb, label: 'Ideas' },
  { href: '/feed/trending', icon: Flame, label: 'Trending' },
  { href: '/feed/news', icon: Newspaper, label: 'News Impact' },
]

const myNav = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/feed/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { href: '/feed/my-trades', icon: FolderOpen, label: 'My Trades' },
  { href: '/feed/alerts', icon: Bell, label: 'Alerts', badge: 3 },
]

const sectors = [
  { href: '/feed/sector/tech', icon: Cpu, label: 'Tech / AI' },
  { href: '/feed/sector/energy', icon: Zap, label: 'Energy' },
  { href: '/feed/sector/healthcare', icon: Heart, label: 'Healthcare' },
  { href: '/feed/sector/financials', icon: DollarSign, label: 'Financials' },
]

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
}

function NavItem({ href, icon: Icon, label, badge }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-all mb-0.5',
        isActive
          ? 'bg-blue-950/60 text-blue-400 font-semibold'
          : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e2433]'
      )}
    >
      <Icon size={15} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={cn(
          'text-[10px] px-1.5 py-0.5 rounded-full font-semibold',
          isActive
            ? 'bg-blue-900/60 text-blue-300'
            : 'bg-[#1e2433] text-slate-500'
        )}>
          {badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[220px] bg-[#0f1117] border-r border-[#1e2433] overflow-y-auto py-4 px-3">
      <div className="mb-5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 px-2">Main</p>
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <div className="mb-5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 px-2">My Space</p>
        {myNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <div>
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 px-2">Sectors</p>
        {sectors.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
    </aside>
  )
}
