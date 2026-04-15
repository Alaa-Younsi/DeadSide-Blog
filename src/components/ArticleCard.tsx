import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Article } from '../types'

interface ArticleCardProps {
  article: Article
  index?: number
}

const ArticleCard: React.FC<ArticleCardProps> = memo(({ article, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="group relative overflow-hidden"
      style={{
        borderLeft: '2px solid var(--border)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--red)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
      }}
    >
      <Link to={`/articles/${article.slug}`} className="flex flex-col sm:flex-row" tabIndex={-1}>
        {/* Content */}
        <div
          className="flex flex-col flex-1 px-5 py-5 transition-colors duration-300"
          style={{ background: 'var(--surface)' }}
        >
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-2.5">
            <span
              className="font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider"
              style={{
                color:      'var(--muted)',
                background: 'var(--raised)',
                border:     '1px solid var(--border)',
              }}
            >
              {article.category}
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {article.date}&ensp;·&ensp;{article.readTime}
            </span>
          </div>

          <h3
            className="font-display font-semibold text-base md:text-lg mb-1.5 leading-snug transition-colors duration-200 group-hover:text-white"
            style={{ color: 'var(--text-bright)' }}
          >
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: 'var(--muted)' }}>
            {article.subtitle}
          </p>

          {/* Keywords + read link */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto">
            {article.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="font-mono text-[10px] px-1.5 py-0.5 transition-colors duration-200"
                style={{
                  color:  'var(--muted)',
                  border: '1px solid var(--border)',
                }}
              >
                #{kw}
              </span>
            ))}
            <span
              className="ml-auto font-mono text-xs tracking-wider transition-all duration-300 group-hover:translate-x-1"
              style={{ color: 'var(--red)' }}
              aria-label="Read more"
            >
              READ →
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="hidden sm:block w-36 flex-shrink-0 relative overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ minHeight: '116px' }}
            loading="lazy"
            width={144}
            height={116}
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, var(--surface) 0%, transparent 40%)' }}
          />
        </div>
      </Link>
    </motion.article>
  )
})

ArticleCard.displayName = 'ArticleCard'

export default ArticleCard
