import React, { useState, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'

const allKeywords = Array.from(new Set(posts.flatMap((p) => p.keywords)))

const Blog: React.FC = () => {
  const [search,        setSearch]        = useState('')
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null)

  const handleSearch  = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])
  const handleKeyword = useCallback((kw: string) => setActiveKeyword((prev) => (prev === kw ? null : kw)), [])

  const filtered = useMemo(() =>
    posts.filter((post) => {
      const matchSearch  = !search.trim() ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(search.toLowerCase())
      const matchKeyword = !activeKeyword || post.keywords.includes(activeKeyword)
      return matchSearch && matchKeyword
    }), [search, activeKeyword])

  return (
    <>
      <Helmet>
        <title>Dead Side | Blog</title>
        <meta name="description" content="All posts from Dead Side. Deep-dives into tech, systems, and the cosmos." />
        <meta property="og:title"       content="Dead Side | Blog" />
        <meta property="og:description" content="Deep-dives into tech, systems, and the cosmos." />
        <meta property="og:type"        content="website" />
        <link rel="canonical" href="https://deadside.vercel.app/blog" />
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
              — Archive
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-4xl md:text-5xl mb-2"
              style={{ color: 'var(--white)' }}
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-xs"
              style={{ color: 'var(--muted)' }}
            >
              {posts.length} {posts.length === 1 ? 'entry' : 'entries'} in the archive
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
              placeholder="Search posts..."
              className="w-full max-w-md px-4 py-2 font-mono text-xs outline-none transition-all duration-200"
              style={{
                background:   'var(--raised)',
                color:        'var(--star-bright)',
                border:       '1px solid var(--border)',
              }}
              onFocus={(e)  => { e.currentTarget.style.borderColor = 'var(--red-dim)' }}
              onBlur={(e)   => { e.currentTarget.style.borderColor = 'var(--border)'  }}
              aria-label="Search blog posts"
            />
            <div className="flex flex-wrap gap-2">
              {allKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKeyword(kw)}
                  className="font-mono text-xs px-3 py-1 border transition-all duration-200"
                  style={{
                    color:       activeKeyword === kw ? 'var(--white)'  : 'var(--muted)',
                    background:  activeKeyword === kw ? 'var(--red-dim)': 'transparent',
                    borderColor: activeKeyword === kw ? 'var(--red-dim)': 'var(--border)',
                  }}
                  aria-pressed={activeKeyword === kw}
                >
                  #{kw}
                </button>
              ))}
              {activeKeyword && (
                <button
                  onClick={() => setActiveKeyword(null)}
                  className="font-mono text-xs px-3 py-1 border transition-all duration-200"
                  style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
                >
                  clear ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 px-5">
          <div className="max-w-6xl mx-auto">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
                {filtered.map((post, i) => (
                  <div key={post.id} style={{ background: 'var(--void)' }}>
                    <PostCard post={post} index={i} />
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
                  No posts match your current filters.
                </p>
                <button
                  className="font-mono text-xs px-6 py-2 border transition-all duration-200"
                  style={{ color: 'var(--star-bright)', borderColor: 'var(--border-hover)' }}
                  onClick={() => { setSearch(''); setActiveKeyword(null) }}
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

export default Blog
