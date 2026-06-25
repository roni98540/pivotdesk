import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { RightPanel } from '@/components/RightPanel'
import { ComposeBox } from '@/components/ComposeBox'
import { PostCard } from '@/components/PostCard'
import type { Post } from '@/types'

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    author_id: 'u1',
    author: {
      id: 'u1',
      username: 'yaron_c',
      full_name: 'Yaron C.',
      avatar_url: null,
      bio: null,
      years_experience: '5+ years',
      trading_style: 'Momentum + Breakout',
      badge: 'Verified Trader',
      win_rate: 71,
      post_count: 84,
      follower_count: 42,
      created_at: '2021-03-01',
      is_approved: true,
    },
    ticker: 'NVDA',
    direction: 'Long',
    setup_type: 'Cup & Handle',
    entry: 143.50,
    stop: 138.00,
    target: 162.00,
    rr_ratio: 3.4,
    body: 'Cup & Handle on the weekly, consolidating near ATH after earnings beat. Volume confirming the base. Looking at a break above $145 as the trigger, target the measured move to $162. Clean risk defined at prior support $138.',
    tags: ['CupAndHandle', 'WeeklySetup', 'TechSector', 'Breakout'],
    like_count: 24,
    comment_count: 8,
    is_liked: false,
    is_bookmarked: false,
    created_at: '2 hours ago',
  },
  {
    id: '2',
    author_id: 'u2',
    author: {
      id: 'u2',
      username: 'maya_k',
      full_name: 'Maya K.',
      avatar_url: null,
      bio: null,
      years_experience: '3 years',
      trading_style: 'Technical Analysis',
      badge: 'Top Contributor',
      win_rate: 65,
      post_count: 56,
      follower_count: 31,
      created_at: '2022-06-15',
      is_approved: true,
    },
    ticker: 'META',
    direction: 'Short',
    setup_type: 'Reversal',
    entry: 608.00,
    stop: 618.00,
    target: 582.00,
    rr_ratio: 2.6,
    body: 'Bearish divergence on RSI (weekly) after two rejections at the $610 resistance zone. If it breaks below $585 on elevated volume I\'d add to the short. Watching for confirmation next week — no trigger yet.',
    tags: ['BearishDivergence', 'RSI', 'ShortSetup', 'WeeklyChart'],
    like_count: 17,
    comment_count: 5,
    is_liked: true,
    is_bookmarked: false,
    created_at: '5 hours ago',
  },
  {
    id: '3',
    author_id: 'u3',
    author: {
      id: 'u3',
      username: 'david_r',
      full_name: 'David R.',
      avatar_url: null,
      bio: null,
      years_experience: '7 years',
      trading_style: 'Momentum',
      badge: 'Verified Trader',
      win_rate: 69,
      post_count: 112,
      follower_count: 67,
      created_at: '2019-01-10',
      is_approved: true,
    },
    ticker: 'AMD',
    direction: 'Long',
    setup_type: 'Bull Flag',
    entry: 172.00,
    stop: 165.50,
    target: 193.00,
    rr_ratio: 3.2,
    body: 'Bull flag forming after a strong move from $148. Tight consolidation on declining volume — textbook pattern. Entry on break of the flag high with volume. I\'m watching the $175 level closely as confirmation.',
    tags: ['BullFlag', 'Momentum', 'SemiSector'],
    like_count: 31,
    comment_count: 12,
    is_liked: false,
    is_bookmarked: true,
    created_at: '1 day ago',
  },
]

const filterTabs = ['Latest', 'Top Rated', 'My Follows', 'Long Ideas', 'Short Ideas']

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Navbar showActions />
      <Sidebar />

      <main className="ml-[220px] mr-[260px] pt-14 min-h-screen">
        <div className="max-w-2xl mx-auto py-5 px-4">
          {/* Feed header */}
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

          {/* Posts */}
          <div className="space-y-3">
            {DEMO_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <RightPanel />
    </div>
  )
}
