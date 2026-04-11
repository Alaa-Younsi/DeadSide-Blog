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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group border-l-2 overflow-hidden"
      style={{
        borderColor: 'var(--border)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--red)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
      }}
    >
      <Link
        to={`/articles/${article.slug}`}
        className="flex flex-col sm:flex-row gap-0"
        tabIndex={-1}
      >
        {/* Content */}
        <div
          className="flex flex-col flex-1 px-5 py-4 transition-colors duration-300"
          style={{ background: 'var(--surface)' }}
        >
          {/* Category + meta row */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-mono text-xs px-2 py-0.5"
              style={{
                color:      'var(--muted)',
                background: 'var(--raised)',
                border:     '1px solid var(--border)',
              }}
            >
              {article.category}
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {article.date} · {article.readTime}
            </span>
          </div>

          <h3
            className="font-display font-semibold text-lg mb-1.5 leading-snug"
            style={{ color: 'var(--star-bright)' }}
          >
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: 'var(--muted)' }}>
            {article.subtitle}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {article.keywords.slice(0, 3).map((kw) => (
              <span
                key={kw}
                className="font-mono text-xs px-1.5 py-0.5"
                style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
              >
                #{kw}
              </span>
            ))}
            <span
              className="ml-auto font-mono text-xs transition-all duration-200 group-hover:translate-x-1"
              style={{ color: 'var(--red)' }}
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
            style={{ minHeight: '110px' }}
            loading="lazy"
            width={144}
            height={110}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, var(--surface) 0%, transparent 35%)' }}
          />
        </div>
      </Link>
    </motion.article>
  )
})

ArticleCard.displayName = 'ArticleCard'

export default ArticleCard
