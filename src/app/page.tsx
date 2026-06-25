import Link from 'next/link'
import { TrendingUp, Shield, Users, Zap, BarChart2, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

const features = [
  {
    icon: Shield,
    title: 'Vetted Members Only',
    desc: 'Every applicant goes through a manual review. We check experience, strategy, and mindset before granting access.',
  },
  {
    icon: BarChart2,
    title: 'High-Quality Trade Ideas',
    desc: 'Structured posts with entry, stop, target, and R:R ratio. No noise — only well-thought-out setups.',
  },
  {
    icon: Zap,
    title: 'Real-Time Feed',
    desc: 'See trade ideas as they happen, tagged by sector, setup type, and direction. Filter to what matters to you.',
  },
  {
    icon: Users,
    title: 'Small & Serious',
    desc: "We're not chasing thousands of members. A tight community of experienced swing traders is our goal.",
  },
]

const criteria = [
  'Minimum 1 year of active swing trading experience',
  'Clear understanding of risk management and position sizing',
  'Ability to articulate your trading edge in 2-3 sentences',
  'Willingness to share ideas constructively, not just lurk',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-blue-400 bg-blue-950/50 border border-blue-800/40 px-3 py-1.5 rounded-full mb-8">
            <Lock size={11} />
            Application-Only Community
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            Your edge.<br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Your desk.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            PivotDesk is a private community for serious swing traders who want to share
            high-quality setups and find ideas worth acting on — not a place for hype or noise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/20 text-sm"
            >
              Apply for Access
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/feed"
              className="text-sm text-slate-400 hover:text-slate-200 border border-[#1e2433] hover:border-[#2a3548] px-6 py-3 rounded-xl transition-colors"
            >
              Preview the Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#1e2433] py-6">
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '148', label: 'Active Members' },
            { value: '312', label: 'Ideas Shared' },
            { value: '68%', label: 'Avg Win Rate' },
            { value: '~6%', label: 'Acceptance Rate' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[12px] text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-2">Built for swing traders who are serious</h2>
          <p className="text-center text-slate-500 text-sm mb-12">Everything here is designed around quality, not quantity.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-[#141924] border border-[#1e2433] rounded-xl p-5 hover:border-[#2a3548] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-800/30 flex items-center justify-center mb-3">
                  <f.icon size={16} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-1.5 text-[14px]">{f.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto bg-[#141924] border border-[#1e2433] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-blue-400" />
            <h2 className="text-lg font-bold text-white">Who we&apos;re looking for</h2>
          </div>
          <div className="space-y-3">
            {criteria.map((c) => (
              <div key={c} className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-[13px] text-slate-300">{c}</p>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm"
          >
            Apply Now — It&apos;s Free
            <ArrowRight size={15} />
          </Link>
          <p className="text-center text-[11px] text-slate-600 mt-3">Applications reviewed within 48 hours</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e2433] py-6 px-4 text-center">
        <p className="text-[12px] text-slate-600">
          © 2025 PivotDesk · For educational purposes only · Not financial advice
        </p>
      </footer>
    </div>
  )
}
