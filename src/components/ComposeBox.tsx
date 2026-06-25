'use client'

import { useState } from 'react'
import { BarChart2, Tag, Sliders, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Direction, SetupType } from '@/types'

const SETUP_TYPES: SetupType[] = [
  'Breakout', 'Pullback', 'Cup & Handle', 'Bull Flag',
  'Bear Flag', 'Reversal', 'Gap Fill', 'Other'
]

export function ComposeBox() {
  const [expanded, setExpanded] = useState(false)
  const [body, setBody] = useState('')
  const [ticker, setTicker] = useState('')
  const [direction, setDirection] = useState<Direction>('Long')
  const [setup, setSetup] = useState<SetupType>('Breakout')
  const [entry, setEntry] = useState('')
  const [stop, setStop] = useState('')
  const [target, setTarget] = useState('')

  const rrRatio = entry && stop && target
    ? Math.abs((Number(target) - Number(entry)) / (Number(entry) - Number(stop)))
    : null

  return (
    <div className="bg-[#141924] border border-[#1e2433] rounded-xl p-4 mb-4">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full text-left text-[13px] text-slate-500 hover:text-slate-400 transition-colors"
        >
          Share a trade idea, chart setup, or market observation…
        </button>
      ) : (
        <div className="space-y-3">
          {/* Ticker + Direction */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ticker (e.g. NVDA)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="w-28 bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-1.5 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors uppercase font-semibold"
            />
            <div className="flex rounded-lg border border-[#1e2433] overflow-hidden">
              {(['Long', 'Short'] as Direction[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={cn(
                    'px-3 py-1.5 text-[12px] font-semibold transition-colors',
                    direction === d
                      ? d === 'Long'
                        ? 'bg-green-900/60 text-green-400'
                        : 'bg-red-900/60 text-red-400'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <select
              value={setup}
              onChange={(e) => setSetup(e.target.value as SetupType)}
              className="bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-1.5 text-[12px] text-slate-300 outline-none focus:border-blue-700 transition-colors"
            >
              {SETUP_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Body */}
          <textarea
            rows={3}
            autoFocus
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe the setup, your thesis, catalysts, key levels…"
            className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors resize-none"
          />

          {/* Levels */}
          <div className="flex gap-2">
            {[
              { label: 'Entry', value: entry, set: setEntry },
              { label: 'Stop', value: stop, set: setStop },
              { label: 'Target', value: target, set: setTarget },
            ].map(({ label, value, set }) => (
              <div key={label} className="flex-1">
                <label className="text-[10px] text-slate-600 block mb-1">{label}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-slate-600">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg pl-5 pr-2 py-1.5 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
                  />
                </div>
              </div>
            ))}
            {rrRatio && (
              <div className="flex-none">
                <label className="text-[10px] text-slate-600 block mb-1">R:R</label>
                <div className={cn(
                  'px-3 py-1.5 rounded-lg border text-[13px] font-bold',
                  rrRatio >= 2.5 ? 'text-green-400 border-green-800/40 bg-green-950/30'
                    : rrRatio >= 1.5 ? 'text-amber-400 border-amber-800/40 bg-amber-950/30'
                    : 'text-red-400 border-red-800/40 bg-red-950/30'
                )}>
                  {rrRatio.toFixed(1)}:1
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 pt-1">
            <button className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 px-2 py-1 rounded border border-[#1e2433] hover:border-[#2a3548] transition-all">
              <BarChart2 size={12} /> Chart
            </button>
            <button className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 px-2 py-1 rounded border border-[#1e2433] hover:border-[#2a3548] transition-all">
              <Tag size={12} /> Tags
            </button>
            <button className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 px-2 py-1 rounded border border-[#1e2433] hover:border-[#2a3548] transition-all">
              <Sliders size={12} /> Options
            </button>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setExpanded(false)}
                className="text-[12px] text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!body.trim() || !ticker}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-semibold px-4 py-1.5 rounded-lg transition-colors"
              >
                <Send size={12} /> Post Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
