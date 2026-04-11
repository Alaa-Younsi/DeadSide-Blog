import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import BlackholeCanvas from '../components/BlackholeCanvas'
import GlitchText from '../components/GlitchText'
import SpaceDivider from '../components/CyberDivider'
import PostCard from '../components/PostCard'
import ArticleCard from '../components/ArticleCard'
import { posts } from '../data/posts'
import { articles } from '../data/articles'

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dead Side | Home</title>
        <meta name="description" content="Dead Side — Dispatches from the edge of the known universe. Tech, thought, and the void between." />
        <meta property="og:title"       content="Dead Side | Home" />
        <meta property="og:description" content="Dispatches from the edge of the known universe." />
        <meta property="og:type"        content="website" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="canonical" href="https://deadside.vercel.app/" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Black hole canvas fills the entire hero */}
        <BlackholeCanvas />

        {/* Content */}
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto select-none">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-mono text-xs uppercase tracking-[0.4em] mb-8"
            style={{ color: 'var(--muted)' }}
          >
            ○ &nbsp; Beyond the Event Horizon &nbsp; ○
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display font-bold leading-none mb-6 tracking-tight"
            style={{
              fontSize:   'clamp(4rem, 13vw, 10rem)',
              color:      'var(--white)',
              textShadow: '0 2px 40px rgba(0,0,0,0.9)',
            }}
          >
            <GlitchText text="DEAD SIDE" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="text-base md:text-lg mb-12 leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            Dispatches from the edge of the known universe.
            <br />
            Tech. Thought. The void between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/blog"
              className="px-8 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                background:  'var(--red)',
                color:       '#fff',
                boxShadow:   '0 0 20px rgba(204,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background  = 'var(--red-glow)'
                el.style.boxShadow   = '0 0 35px rgba(255,32,32,0.6)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background  = 'var(--red)'
                el.style.boxShadow   = '0 0 20px rgba(204,0,0,0.4)'
              }}
            >
              Explore Blog
            </Link>
            <Link
              to="/articles"
              className="px-8 py-3 font-mono text-xs uppercase tracking-widest border transition-all duration-300"
              style={{
                background:  'transparent',
                color:       'var(--star-bright)',
                borderColor: 'var(--border-hover)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--muted)'
                el.style.color       = 'var(--white)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border-hover)'
                el.style.color       = 'var(--star-bright)'
              }}
            >
              Read Articles
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
            scroll
          </span>
          <svg
            width="14" height="22" viewBox="0 0 14 22" fill="none"
            style={{ color: 'var(--red)', animation: 'scrollDown 1.4s ease-in-out infinite' }}
          >
            <path d="M7 2L7 20M7 20L2 14M7 20L12 14"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="relative z-10 py-16 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-4xl mx-auto">
          <SpaceDivider />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20 py-6">
            {[
              { num: `0${posts.length}`,    label: 'Posts'    },
              { num: `0${articles.length}`, label: 'Articles' },
              { num: '∞',                   label: 'Questions' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-display font-bold text-4xl mb-1"
                  style={{ color: 'var(--white)' }}
                >
                  {num}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: 'var(--muted)' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <SpaceDivider />
        </div>
      </section>

      {/* ── FEATURED POSTS ───────────────────────────────── */}
      <section className="relative z-10 py-16 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--red)' }}>
                — Latest
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--white)' }}>
                Blog Posts
              </h2>
            </div>
            <Link
              to="/blog"
              className="font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {posts.map((post, i) => (
              <div key={post.id} style={{ background: 'var(--void)' }}>
                <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ────────────────────────────── */}
      <section className="relative z-10 py-16 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--red)' }}>
                — Recent
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--white)' }}>
                Articles
              </h2>
            </div>
            <Link
              to="/articles"
              className="font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-px" style={{ background: 'var(--border)' }}>
            {articles.map((article, i) => (
              <div key={article.id} style={{ background: 'var(--void)' }}>
                <ArticleCard article={article} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
