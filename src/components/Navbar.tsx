'use client'

import Link from 'next/link'
import { TrendingUp, Bell, Plus, Search } from 'lucide-react'

interface NavbarProps {
  showActions?: boolean
}

export function Navbar({ showActions = false }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0f1117] border-b border-[#1e2433] flex items-center px-5 gap-4">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
          <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-[15px] tracking-tight text-white">
          Pivot<span className="text-blue-400">Desk</span>
        </span>
      </Link>

      <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-full">
        Swing Traders Only
      </span>

      {showActions && (
        <>
          <div className="flex-1 max-w-xs mx-4 hidden md:flex items-center gap-2 bg-[#141924] border border-[#1e2433] rounded-lg px-3 py-1.5">
            <Search size={13} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search tickers, setups…"
              className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none flex-1 min-w-0"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1e2433] transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
            </button>
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
              <Plus size={13} strokeWidth={2.5} />
              New Idea
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
          </div>
        </>
      )}

      {!showActions && (
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/apply"
            className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block"
          >
            Apply
          </Link>
          <Link
            href="/apply"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Request Access
          </Link>
        </div>
      )}
    </header>
  )
}
