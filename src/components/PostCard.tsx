'use client'

import { useState } from 'react'
import { ThumbsUp, MessageSquare, Bookmark, Plus, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.is_liked)
  const [likeCount, setLikeCount] = useState(post.like_count)
  const [bookmarked, setBookmarked] = useState(post.is_bookmarked)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const badgeColors: Record<string, string> = {
    'Top Contributor': 'bg-amber-950/60 text-amber-400 border-amber-800/40',
    'Verified Trader': 'bg-blue-950/60 text-blue-400 border-blue-800/40',
    'Moderator': 'bg-violet-950/60 text-violet-400 border-violet-800/40',
  }

  const badgeEmojis: Record<string, string> = {
    'Top Contributor': '🎯',
    'Verified Trader': '⭐',
    'Moderator': '🛡️',
  }

  const rrColor = post.rr_ratio
    ? post.rr_ratio >= 2.5 ? 'text-green-400' : post.rr_ratio >= 1.5 ? 'text-amber-400' : 'text-red-400'
    : 'text-slate-500'

  return (
    <article className="bg-[#141924] border border-[#1e2433] rounded-xl p-4 hover:border-[#2a3548] transition-colors">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
          {post.author.full_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="font-semibold text-[13px] text-slate-100">{post.author.full_name}</span>
            {post.author.badge && (
              <span className={cn(
                'text-[10px] font-semibold px-1.5 py-0.5 rounded border',
                badgeColors[post.author.badge] ?? 'bg-slate-800 text-slate-400 border-slate-700'
              )}>
                {badgeEmojis[post.author.badge]} {post.author.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {post.author.years_experience} experience · {post.created_at}
          </p>
        </div>

        {/* Direction tag */}
        <div className={cn(
          'flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg border shrink-0',
          post.direction === 'Long'
            ? 'bg-green-950/50 text-green-400 border-green-800/40'
            : 'bg-red-950/50 text-red-400 border-red-800/40'
        )}>
          {post.direction === 'Long' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {post.direction}
        </div>
      </div>

      {/* Ticker + Setup */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={cn(
          'font-bold text-sm px-2.5 py-1 rounded-lg border',
          post.direction === 'Long'
            ? 'bg-green-950/40 text-green-300 border-green-800/30'
            : 'bg-red-950/40 text-red-300 border-red-800/30'
        )}>
          ${post.ticker}
        </span>
        <span className="text-[11px] text-slate-500 bg-[#1e2433] px-2 py-1 rounded-md border border-[#1e2433]">
          {post.setup_type}
        </span>
      </div>

      {/* Body */}
      <p className="text-[13px] text-slate-300 leading-relaxed mb-3">{post.body}</p>

      {/* Trade levels */}
      {(post.entry || post.stop || post.target) && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {post.entry && (
            <div className="bg-[#0f1117] border border-[#1e2433] rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-600 mb-0.5">Entry</p>
              <p className="text-[12px] font-semibold text-slate-200">${post.entry}</p>
            </div>
          )}
          {post.stop && (
            <div className="bg-[#0f1117] border border-[#1e2433] rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-600 mb-0.5">Stop</p>
              <p className="text-[12px] font-semibold text-red-400">${post.stop}</p>
            </div>
          )}
          {post.target && (
            <div className="bg-[#0f1117] border border-[#1e2433] rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-600 mb-0.5">Target</p>
              <p className="text-[12px] font-semibold text-green-400">${post.target}</p>
            </div>
          )}
          {post.rr_ratio && (
            <div className="bg-[#0f1117] border border-[#1e2433] rounded-lg p-2 text-center">
              <p className="text-[10px] text-slate-600 mb-0.5">R:R</p>
              <p className={cn('text-[12px] font-bold', rrColor)}>{post.rr_ratio.toFixed(1)}:1</p>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-[#1e2433]">
        <button
          onClick={handleLike}
          className={cn(
            'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border transition-all',
            liked
              ? 'bg-blue-950/40 text-blue-400 border-blue-800/40'
              : 'text-slate-500 border-[#1e2433] hover:text-slate-300 hover:bg-[#1e2433]'
          )}
        >
          <ThumbsUp size={13} fill={liked ? 'currentColor' : 'none'} />
          {likeCount}
        </button>

        <button className="flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-[#1e2433] text-slate-500 hover:text-slate-300 hover:bg-[#1e2433] transition-all">
          <MessageSquare size={13} />
          {post.comment_count}
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={cn(
            'flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border transition-all',
            bookmarked
              ? 'bg-violet-950/40 text-violet-400 border-violet-800/40'
              : 'text-slate-500 border-[#1e2433] hover:text-slate-300 hover:bg-[#1e2433]'
          )}
        >
          <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'} />
          Save
        </button>

        <button className="flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-lg border border-[#1e2433] text-slate-500 hover:text-slate-300 hover:bg-[#1e2433] transition-all ml-auto">
          <Plus size={13} />
          Watchlist
        </button>
      </div>
    </article>
  )
}
