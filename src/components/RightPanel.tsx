import { TrendingUp, TrendingDown, Users, Target, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const trendingTickers = [
  { ticker: 'NVDA', change: +2.4, mentions: 14, direction: 'Long' },
  { ticker: 'META', change: -1.1, mentions: 9, direction: 'Short' },
  { ticker: 'TSLA', change: +3.7, mentions: 8, direction: 'Long' },
  { ticker: 'AMD', change: +0.9, mentions: 6, direction: 'Long' },
  { ticker: 'SPY', change: -0.3, mentions: 5, direction: 'Short' },
]

const activeMembers = [
  { name: 'Yaron C.', badge: '⭐', online: true },
  { name: 'Maya K.', badge: '🎯', online: true },
  { name: 'David R.', badge: '', online: false },
  { name: 'Shira M.', badge: '🎯', online: true },
]

const stats = [
  { label: 'Members', value: '148', sub: '+3 this week', icon: Users },
  { label: 'Win Rate', value: '68%', sub: 'Community avg', icon: Target },
  { label: 'Ideas', value: '312', sub: 'This month', icon: Activity },
  { label: 'Acceptance', value: '94%', sub: 'Selective', icon: Users },
]

export function RightPanel() {
  return (
    <aside className="fixed right-0 top-14 bottom-0 w-[260px] bg-[#0f1117] border-l border-[#1e2433] overflow-y-auto py-4 px-3.5">
      {/* Community Stats */}
      <div className="mb-5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Community Stats</p>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#141924] border border-[#1e2433] rounded-xl p-3">
              <p className="text-base font-bold text-slate-100">{s.value}</p>
              <p className="text-[10px] text-slate-500">{s.label}</p>
              <p className="text-[10px] text-blue-400 font-medium mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Tickers */}
      <div className="mb-5">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Trending in Community</p>
        <div className="space-y-1">
          {trendingTickers.map((t) => {
            const isUp = t.change > 0
            const barWidth = Math.min(100, (Math.abs(t.change) / 4) * 100)
            return (
              <div key={t.ticker} className="flex items-center gap-2 py-1.5 border-b border-[#1e2433]/60 last:border-0">
                <span className="font-bold text-[12px] text-slate-200 w-10 shrink-0">${t.ticker}</span>
                <div className="flex-1 h-1 bg-[#1e2433] rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', isUp ? 'bg-blue-500' : 'bg-red-500')}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className={cn(
                  'text-[11px] font-semibold w-10 text-right shrink-0',
                  isUp ? 'text-green-400' : 'text-red-400'
                )}>
                  {isUp ? '+' : ''}{t.change}%
                </span>
                {isUp
                  ? <TrendingUp size={11} className="text-green-500 shrink-0" />
                  : <TrendingDown size={11} className="text-red-500 shrink-0" />
                }
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Now */}
      <div>
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3">Active Now</p>
        <div className="space-y-1">
          {activeMembers.map((m) => (
            <div key={m.name} className="flex items-center gap-2 py-1.5">
              <div className={cn(
                'w-1.5 h-1.5 rounded-full shrink-0',
                m.online ? 'bg-green-400' : 'bg-slate-600'
              )} />
              <span className="text-[12px] text-slate-300 flex-1">{m.name}</span>
              {m.badge && <span className="text-[11px]">{m.badge}</span>}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
