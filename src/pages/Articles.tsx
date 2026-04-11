import React, { useState, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../data/articles'

const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))]

const Articles: React.FC = () => {
  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const handleSearch   = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])
  const handleCategory = useCallback((cat: string) => setActiveCategory(cat), [])

  const filtered = useMemo(() =>
    articles.filter((article) => {
      const matchSearch   = !search.trim() ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'All' || article.category === activeCategory
      return matchSearch && matchCategory
    }), [search, activeCategory])

  return (
    <>
      <Helmet>
        <title>Dead Side | Articles</title>
        <meta name="description"        content="Long-form articles on engineering, systems, and the cosmos from Dead Side." />
        <meta property="og:title"       content="Dead Side | Articles" />
        <meta property="og:description" content="Long-form articles on engineering and the cosmos." />
        <meta property="og:type"        content="website" />
        <link rel="canonical" href="https://deadside.vercel.app/articles" />
      </Helmet>

      <div className="pt-20 min-h-screen" style={{ background: 'var(--void)' }}>

        {/* Header */}
        <section className="py-16 px-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] mb-3"
              style={{ color: 'var(--red)' }}
            >
              — Long-form
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-4xl md:text-5xl mb-2"
              style={{ color: 'var(--white)' }}
            >
              Articles
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-xs"
              style={{ color: 'var(--muted)' }}
            >
              {articles.length} {articles.length === 1 ? 'piece' : 'pieces'} in the archive
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-7 px-5 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto space-y-4">
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search articles..."
              className="w-full max-w-md px-4 py-2 font-mono text-xs outline-none transition-all duration-200"
              style={{
                background:   'var(--raised)',
                color:        'var(--star-bright)',
                border:       '1px solid var(--border)',
              }}
              onFocus={(e)  => { e.currentTarget.style.borderColor = 'var(--red-dim)' }}
              onBlur={(e)   => { e.currentTarget.style.borderColor = 'var(--border)'  }}
              aria-label="Search articles"
            />

            {/* Category tabs */}
            <div className="flex gap-0 border-b" style={{ borderColor: 'var(--border)' }} role="tablist">
              {categories.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategory(cat)}
                    className="font-mono text-xs px-4 py-2 border-b-2 -mb-px transition-all duration-200"
                    style={{
                      color:       isActive ? 'var(--white)'  : 'var(--muted)',
                      borderColor: isActive ? 'var(--red)'    : 'transparent',
                      background:  'transparent',
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* List */}
        <section className="py-12 px-5">
          <div className="max-w-6xl mx-auto">
            {filtered.length > 0 ? (
              <div className="flex flex-col gap-px" style={{ background: 'var(--border)' }}>
                {filtered.map((article, i) => (
                  <div key={article.id} style={{ background: 'var(--void)' }}>
                    <ArticleCard article={article} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--border-hover)' }}>
                  Nothing found
                </div>
                <p className="font-mono text-xs mb-6" style={{ color: 'var(--muted)' }}>
                  No articles match your current filters.
                </p>
                <button
                  className="font-mono text-xs px-6 py-2 border transition-all duration-200"
                  style={{ color: 'var(--star-bright)', borderColor: 'var(--border-hover)' }}
                  onClick={() => { setSearch(''); setActiveCategory('All') }}
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Articles
