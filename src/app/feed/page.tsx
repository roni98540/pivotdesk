import { createClient } from '@/lib/supabase/server'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { RightPanel } from '@/components/RightPanel'
import { ComposeBox } from '@/components/ComposeBox'
import { PostCard } from '@/components/PostCard'
import type { Post } from '@/types'

const filterTabs = ['Latest', 'Top Rated', 'My Follows', 'Long Ideas', 'Short Ideas']

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, username, full_name, avatar_url, years_experience, trading_style, badge, win_rate, post_count, follower_count, created_at, is_approved)
    `)
    .order('created_at', { ascending: false })
    .limit(30)

  // Check which posts user liked/bookmarked
  const postIds = (posts ?? []).map(p => p.id)
  const [{ data: likes }, { data: bookmarks }] = await Promise.all([
    supabase.from('likes').select('post_id').eq('user_id', user?.id ?? '').in('post_id', postIds),
    supabase.from('bookmarks').select('post_id').eq('user_id', user?.id ?? '').in('post_id', postIds),
  ])

  const likedIds = new Set((likes ?? []).map(l => l.post_id))
  const bookmarkedIds = new Set((bookmarks ?? []).map(b => b.post_id))

  const typedPosts: Post[] = (posts ?? []).map(p => ({
    ...p,
    is_liked: likedIds.has(p.id),
    is_bookmarked: bookmarkedIds.has(p.id),
  }))

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Navbar showActions />
      <Sidebar />

      <main className="ml-[220px] mr-[260px] pt-14 min-h-screen">
        <div className="max-w-2xl mx-auto py-5 px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[15px] font-bold text-slate-100">📊 Community Feed</h1>
            <div className="flex gap-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${
                    tab === 'Latest'
                      ? 'bg-[#1e2433] text-slate-200 font-semibold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <ComposeBox />

          {typedPosts.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium text-slate-300 mb-1">No ideas yet</p>
              <p className="text-sm">Be the first to share a setup!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {typedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <RightPanel />
    </div>
  )
}
