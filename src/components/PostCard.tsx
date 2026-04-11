import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  index?: number
}

const PostCard: React.FC<PostCardProps> = memo(({ post, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative rounded overflow-hidden border flex flex-col h-full"
      style={{
        background:   'var(--surface)',
        borderColor:  'var(--border)',
        transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--red-dim)'
        el.style.boxShadow   = '0 0 24px rgba(204,0,0,0.1), 0 8px 32px rgba(0,0,0,0.6)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow   = 'none'
      }}
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full" tabIndex={-1}>
        {/* Cover image */}
        <div className="relative overflow-hidden h-44 flex-shrink-0">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={600}
            height={176}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' }}
          />
          {/* Keywords */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {post.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="font-mono text-xs px-2 py-0.5"
                style={{
                  color:      'var(--muted)',
                  background: 'rgba(0,0,0,0.7)',
                  border:     '1px solid var(--border)',
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3
            className="font-display font-semibold text-lg mb-2 leading-snug transition-colors duration-200"
            style={{ color: 'var(--star-bright)' }}
          >
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--muted)' }}>
            {post.subtitle}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <span
              className="font-mono text-xs transition-all duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--red)' }}
            >
              READ →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
})

PostCard.displayName = 'PostCard'

export default PostCard
