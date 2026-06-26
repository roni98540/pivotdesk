import Link from 'next/link'
import { Clock, TrendingUp } from 'lucide-react'

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-amber-950/60 border border-amber-800/40 flex items-center justify-center mx-auto mb-6">
        <Clock size={24} className="text-amber-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">הבקשה שלך בבדיקה</h1>
      <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
        קיבלנו את הבקשה שלך והיא נמצאת בתהליך בדיקה.
        נחזור אליך תוך <strong className="text-slate-200">48 שעות</strong>.
      </p>
      <div className="bg-[#141924] border border-[#1e2433] rounded-xl p-5 max-w-xs text-left">
        <p className="text-[12px] text-slate-500 leading-relaxed">
          הביקורות מתבצעות ימים א׳–ה׳. אם עברו יותר מ-48 שעות, בדוק את תיבת הדואר הזבל.
        </p>
      </div>
      <Link href="/" className="mt-8 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        <TrendingUp size={14} />
        חזרה לדף הבית
      </Link>
    </div>
  )
}
