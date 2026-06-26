'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TrendingUp, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('אימייל או סיסמה שגויים')
      setLoading(false)
      return
    }

    router.push('/feed')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
          <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">
          Pivot<span className="text-blue-400">Desk</span>
        </span>
      </Link>

      <div className="w-full max-w-sm bg-[#141924] border border-[#1e2433] rounded-2xl p-7">
        <h1 className="text-xl font-bold text-white mb-1">ברוך השב</h1>
        <p className="text-sm text-slate-500 mb-6">כניסה לחשבון שלך</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] text-slate-500 block mb-1.5">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2.5 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 block mb-1.5">סיסמה</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#0f1117] border border-[#1e2433] rounded-lg px-3 py-2.5 pr-10 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-700 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? 'נכנס...' : 'כניסה'}
          </button>
        </form>

        <p className="text-center text-[12px] text-slate-500 mt-5">
          אין לך חשבון?{' '}
          <Link href="/apply" className="text-blue-400 hover:text-blue-300 transition-colors">
            בקש גישה
          </Link>
        </p>
      </div>
    </div>
  )
}
