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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dead Side — Dispatches from the Edge of the Known Universe</title>
        <meta name="description" content="Dead Side — Tech deep-dives, engineering philosophy, and the void between stars." />
        <meta property="og:title"       content="Dead Side | Home" />
        <meta property="og:description" content="Dispatches from the edge of the known universe." />
        <meta property="og:type"        content="website" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="canonical" href="https://deadside.vercel.app/" />
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Black hole canvas */}
        <BlackholeCanvas />

        {/* Coordinates label — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute top-20 right-6 font-mono text-xs text-right hidden sm:block"
          style={{ color: 'var(--muted)', zIndex: 10 }}
          aria-hidden="true"
        >
          <div>RA 17h 45m 40s</div>
          <div>Dec −29° 00′ 28″</div>
          <div className="mt-1" style={{ color: 'var(--red-dim)' }}>Sgr A* / GC</div>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto select-none">
          <motion.p
            {...fadeUp(0)}
            className="font-mono text-xs uppercase tracking-[0.45em] mb-8"
            style={{ color: 'var(--muted)' }}
          >
            ○ &nbsp; Beyond the Event Horizon &nbsp; ○
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-none mb-6 tracking-tight"
            style={{
              fontSize:   'clamp(3.5rem, 12vw, 9rem)',
              color:      'var(--white)',
              textShadow: '0 0 80px rgba(0,0,0,1), 0 2px 40px rgba(0,0,0,0.9)',
            }}
          >
            <GlitchText text="DEAD SIDE" />
          </motion.h1>

          {/* Thin rule under title */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-6 h-px origin-center"
            style={{ width: '80px', background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }}
            aria-hidden="true"
          />

          <motion.p
            {...fadeUp(0.65)}
            className="text-base md:text-lg mb-12 leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            Dispatches from the edge of the known universe.
            <br />
            Tech.&nbsp; Thought.&nbsp; The void between.
          </motion.p>

          <motion.div
            {...fadeUp(0.9)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/blog"
              className="px-8 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                background: 'var(--red)',
                color:      '#fff',
                boxShadow:  '0 0 24px rgba(204,0,0,0.45)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--red-glow)'
                el.style.boxShadow  = '0 0 40px rgba(255,32,32,0.65)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--red)'
                el.style.boxShadow  = '0 0 24px rgba(204,0,0,0.45)'
              }}
            >
              Explore Blog
            </Link>
            <Link
              to="/articles"
              className="px-8 py-3 font-mono text-xs uppercase tracking-widest border transition-all duration-300"
              style={{
                background:  'transparent',
                color:       'var(--text-bright)',
                borderColor: 'var(--border-hover)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--muted)'
                el.style.color       = 'var(--white)'
                el.style.background  = 'rgba(255,255,255,0.03)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border-hover)'
                el.style.color       = 'var(--text-bright)'
                el.style.background  = 'transparent'
              }}
            >
              Read Articles
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator — mouse icon, properly z-indexed */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
          aria-hidden="true"
        >
          {/* Mouse outline */}
          <div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5 border"
            style={{ borderColor: 'var(--muted)' }}
          >
            <div
              className="w-0.5 h-1.5 rounded-full"
              style={{
                background: 'var(--red)',
                boxShadow: '0 0 4px var(--red)',
                animation: 'scrollDown 1.6s ease-in-out infinite',
              }}
            />
          </div>
          <span
            className="font-mono uppercase tracking-[0.25em]"
            style={{ color: 'var(--muted)', fontSize: '9px' }}
          >
            scroll
          </span>
        </motion.div>

        {/* Bottom horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)',
            zIndex: 5,
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="relative z-10 py-12 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-4xl mx-auto">
          <SpaceDivider />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-24 py-4">
            {[
              { num: `${String(posts.length).padStart(2, '0')}`,    label: 'Posts'    },
              { num: `${String(articles.length).padStart(2, '0')}`, label: 'Articles' },
              { num: '∞',                                           label: 'Questions' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-mono font-bold text-3xl mb-1"
                  style={{ color: 'var(--white)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {num}
                </div>
                <div
                  className="font-mono text-xs uppercase tracking-[0.3em]"
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

      {/* ── FEATURED POSTS ────────────────────────────────── */}
      <section className="relative z-10 py-16 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-[0.35em] mb-2"
                style={{ color: 'var(--red)' }}
              >
                — Latest
              </p>
              <h2
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: 'var(--white)' }}
              >
                Blog Posts
              </h2>
            </div>
            <Link
              to="/blog"
              className="font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--border)' }}
          >
            {posts.map((post, i) => (
              <div key={post.id} style={{ background: 'var(--void)' }}>
                <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ─────────────────────────────── */}
      <section className="relative z-10 py-16 px-5" style={{ background: 'var(--void)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-[0.35em] mb-2"
                style={{ color: 'var(--red)' }}
              >
                — Recent
              </p>
              <h2
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: 'var(--white)' }}
              >
                Articles
              </h2>
            </div>
            <Link
              to="/articles"
              className="font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              View all <span aria-hidden="true">→</span>
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
