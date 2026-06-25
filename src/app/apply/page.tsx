'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3

const yearsOptions = [
  '6 months – 1 year',
  '1 – 2 years',
  '2 – 5 years',
  '5 – 10 years',
  '10+ years',
]

const holdOptions = [
  '1 – 3 days',
  '3 – 7 days',
  '1 – 2 weeks',
  '2 – 4 weeks',
  '1 – 3 months',
]

const styleOptions = [
  'Technical Analysis (TA)',
  'Momentum Trading',
  'Breakout Trading',
  'Mean Reversion',
  'Fundamental + TA hybrid',
  'Other',
]

export default function ApplyPage() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    yearsExp: '',
    holdTime: '',
    style: '',
    edgeDescription: '',
    worstMistake: '',
    trackRecord: '',
  })

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const canNext1 = form.fullName && form.email && form.yearsExp && form.holdTime
  const canNext2 = form.style && form.edgeDescription.length >= 80
  const canSubmit = form.worstMistake.length >= 40

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-950/60 border border-green-800/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Application Submitted</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            We received your application and will review it carefully.
            You&apos;ll hear back within <strong className="text-slate-200">48 hours</strong> at{' '}
            <strong className="text-blue-400">{form.email}</strong>.
          </p>
          <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500">
            <Clock size={13} />
            Reviews happen Monday – Friday
          </div>
          <Link href="/" className="mt-8 inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      {/* Top bar */}
      <div className="h-14 border-b border-[#1e2433] flex items-center px-5 gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white">
            Pivot<span className="text-blue-400">Desk</span>
          </span>
        </Link>
        <span className="text-slate-600 text-sm">/ Apply</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  step > s ? 'bg-green-600 text-white'
                    : step === s ? 'bg-blue-600 text-white'
                    : 'bg-[#1e2433] text-slate-600'
                )}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                  <div className={cn(
                    'flex-1 h-0.5 rounded-full',
                    step > s ? 'bg-green-600' : 'bg-[#1e2433]'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="flex justify-between mb-8 text-[11px] text-slate-500">
            <span className={step === 1 ? 'text-blue-400' : ''}>Basic Info</span>
            <span className={step === 2 ? 'text-blue-400' : ''}>Your Edge</span>
            <span className={step === 3 ? 'text-blue-400' : ''}>Mindset</span>
          </div>

          <div className="bg-[#141924] border border-[#1e2433] rounded-2xl p-6">
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h1 className="text-xl font-bold text-white mb-1">Tell us about yourself</h1>
                <p className="text-sm text-slate-500 mb-6">Basic info to get started.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => set('fullName', e.target.value)}
                        placeholder="Yaron Cohen"
                        className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">Years of swing trading experience</label>
                    <div className="grid grid-cols-2 gap-2">
                      {yearsOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => set('yearsExp', opt)}
                          className={cn(
                            'text-left text-[12px] px-3 py-2 rounded-lg border transition-all',
                            form.yearsExp === opt
                              ? 'bg-blue-950/50 text-blue-300 border-blue-700'
                              : 'text-slate-400 border-[#1e2433] hover:border-[#2a3548] hover:text-slate-200'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">Average hold time per trade</label>
                    <div className="grid grid-cols-2 gap-2">
                      {holdOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => set('holdTime', opt)}
                          className={cn(
                            'text-left text-[12px] px-3 py-2 rounded-lg border transition-all',
                            form.holdTime === opt
                              ? 'bg-blue-950/50 text-blue-300 border-blue-700'
                              : 'text-slate-400 border-[#1e2433] hover:border-[#2a3548] hover:text-slate-200'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h1 className="text-xl font-bold text-white mb-1">What&apos;s your edge?</h1>
                <p className="text-sm text-slate-500 mb-6">This is the core of the review — be specific.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">Primary trading style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {styleOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => set('style', opt)}
                          className={cn(
                            'text-left text-[12px] px-3 py-2 rounded-lg border transition-all',
                            form.style === opt
                              ? 'bg-blue-950/50 text-blue-300 border-blue-700'
                              : 'text-slate-400 border-[#1e2433] hover:border-[#2a3548] hover:text-slate-200'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">
                      Describe your edge in 2-4 sentences
                      <span className={cn(
                        'ml-2',
                        form.edgeDescription.length >= 80 ? 'text-green-500' : 'text-slate-600'
                      )}>
                        ({form.edgeDescription.length} chars, min 80)
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      value={form.edgeDescription}
                      onChange={(e) => set('edgeDescription', e.target.value)}
                      placeholder="e.g. I trade momentum breakouts on stocks with relative volume > 2x and clear technical structure. I only take trades with minimum 2:1 R:R and use daily/weekly timeframes for context..."
                      className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">Track record (optional)</label>
                    <input
                      type="text"
                      value={form.trackRecord}
                      onChange={(e) => set('trackRecord', e.target.value)}
                      placeholder="e.g. ~65% win rate over 200 trades, verified on Tradervue"
                      className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h1 className="text-xl font-bold text-white mb-1">Mindset check</h1>
                <p className="text-sm text-slate-500 mb-6">We want to understand how you think about losses and discipline.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1.5">
                      Describe a significant trading mistake and what you learned from it
                      <span className={cn(
                        'ml-2',
                        form.worstMistake.length >= 40 ? 'text-green-500' : 'text-slate-600'
                      )}>
                        ({form.worstMistake.length} chars, min 40)
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      value={form.worstMistake}
                      onChange={(e) => set('worstMistake', e.target.value)}
                      placeholder="Be honest — everyone has made mistakes. How you respond to them matters more than the mistake itself."
                      className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors resize-none"
                    />
                  </div>

                  <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-4">
                    <p className="text-[12px] text-blue-300 font-medium mb-1">Before you submit</p>
                    <p className="text-[12px] text-slate-500">
                      Applications are reviewed manually. We read every answer carefully.
                      Generic responses or obvious copy-pastes are rejected automatically.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1e2433]">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
                  <ArrowLeft size={14} /> Cancel
                </Link>
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!canSubmit}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
                >
                  Submit Application <CheckCircle size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
