export type SetupType =
  | 'Breakout'
  | 'Pullback'
  | 'Cup & Handle'
  | 'Bull Flag'
  | 'Bear Flag'
  | 'Reversal'
  | 'Gap Fill'
  | 'Other'

export type Direction = 'Long' | 'Short'

export type MemberBadge = 'Top Contributor' | 'Verified Trader' | 'Moderator' | null

export interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  years_experience: string
  trading_style: string
  badge: MemberBadge
  win_rate: number | null
  post_count: number
  follower_count: number
  created_at: string
  is_approved: boolean
}

export interface Post {
  id: string
  author_id: string
  author: Profile
  ticker: string
  direction: Direction
  setup_type: SetupType
  entry: number | null
  stop: number | null
  target: number | null
  rr_ratio: number | null
  body: string
  tags: string[]
  like_count: number
  comment_count: number
  is_liked: boolean
  is_bookmarked: boolean
  created_at: string
}

export interface Comment {
  id: string
  post_id: string
  author: Profile
  body: string
  created_at: string
}

export interface Application {
  id: string
  email: string
  full_name: string
  years_experience: string
  avg_hold_time: string
  trading_style: string
  edge_description: string
  track_record: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
