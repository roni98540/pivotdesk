import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

async function approveAction(formData: FormData) {
  'use server'
  const supabase = await createClient()
  const id = formData.get('id') as string
  const email = formData.get('email') as string
  const action = formData.get('action') as string

  await supabase.from('applications').update({ status: action === 'approve' ? 'approved' : 'rejected' }).eq('id', id)

  if (action === 'approve') {
    await supabase.from('profiles').update({ is_approved: true }).eq('id',
      (await supabase.from('profiles').select('id').eq('username', email.split('@')[0]).single()).data?.id ?? ''
    )
  }
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('badge').eq('id', user.id).single()
  if (profile?.badge !== 'Moderator') redirect('/feed')

  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  const pending = applications?.filter(a => a.status === 'pending') ?? []
  const reviewed = applications?.filter(a => a.status !== 'pending') ?? []

  return (
    <div className="min-h-screen bg-[#0f1117] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-slate-500">{pending.length} pending applications</p>
        </div>

        <div className="space-y-3 mb-8">
          <h2 className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">Pending Review</h2>
          {pending.length === 0 && (
            <div className="bg-[#141924] border border-[#1e2433] rounded-xl p-6 text-center text-slate-500 text-sm">
              No pending applications
            </div>
          )}
          {pending.map((app) => (
            <div key={app.id} className="bg-[#141924] border border-[#1e2433] rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold text-slate-100">{app.full_name}</p>
                  <p className="text-[12px] text-slate-500">{app.email} · {app.years_experience}</p>
                </div>
                <span className="text-[10px] bg-amber-950/50 text-amber-400 border border-amber-800/40 px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={10} /> Pending
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-[10px] text-slate-600 mb-0.5">Style · Hold Time</p>
                  <p className="text-[12px] text-slate-300">{app.trading_style} · {app.avg_hold_time}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 mb-0.5">Edge</p>
                  <p className="text-[12px] text-slate-300 leading-relaxed">{app.edge_description}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-600 mb-0.5">Worst Mistake</p>
                  <p className="text-[12px] text-slate-300 leading-relaxed">{app.worst_mistake}</p>
                </div>
                {app.track_record && (
                  <div>
                    <p className="text-[10px] text-slate-600 mb-0.5">Track Record</p>
                    <p className="text-[12px] text-slate-300">{app.track_record}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <form action={approveAction}>
                  <input type="hidden" name="id" value={app.id} />
                  <input type="hidden" name="email" value={app.email} />
                  <input type="hidden" name="action" value="approve" />
                  <button className="flex items-center gap-1.5 bg-green-700 hover:bg-green-600 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition-colors">
                    <CheckCircle size={13} /> Approve
                  </button>
                </form>
                <form action={approveAction}>
                  <input type="hidden" name="id" value={app.id} />
                  <input type="hidden" name="email" value={app.email} />
                  <input type="hidden" name="action" value="reject" />
                  <button className="flex items-center gap-1.5 bg-red-900/60 hover:bg-red-800/60 text-red-400 text-[12px] font-semibold px-4 py-2 rounded-lg border border-red-800/40 transition-colors">
                    <XCircle size={13} /> Reject
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {reviewed.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">Reviewed</h2>
            {reviewed.map((app) => (
              <div key={app.id} className="bg-[#141924] border border-[#1e2433] rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-slate-200">{app.full_name}</p>
                  <p className="text-[11px] text-slate-500">{app.email}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  app.status === 'approved'
                    ? 'bg-green-950/50 text-green-400 border border-green-800/40'
                    : 'bg-red-950/50 text-red-400 border border-red-800/40'
                }`}>
                  {app.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
