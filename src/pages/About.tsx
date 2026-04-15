import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import GlitchText from '../components/GlitchText'
import SpaceDivider from '../components/CyberDivider'

const skills = [
  'TypeScript', 'Rust', 'Systems Design', 'Distributed Systems',
  'Philosophy of Mind', 'Cybersecurity', 'Open Source', 'Linux',
  'Cryptography', 'Dark Aesthetics', 'Coffee', 'Existential Dread',
]

const terminalLines = [
  { delay: 0,    text: '$ whoami',                          color: 'var(--muted)' },
  { delay: 300,  text: '> ashv3il',                   color: 'var(--white)' },
  { delay: 700,  text: '$ cat /etc/identity',               color: 'var(--muted)' },
  { delay: 1100, text: '> Location: Somewhere in the void', color: 'var(--text)' },
  { delay: 1400, text: '> Status: Online (mostly)',         color: 'var(--text)' },
  { delay: 1700, text: '> Occupation: Code and cosmos',     color: 'var(--text)' },
  { delay: 2100, text: '$ grep -r "passion" ./life',        color: 'var(--muted)' },
  { delay: 2500, text: '> Found: building things that last', color: 'var(--red)' },
  { delay: 2800, text: '> Found: understanding systems deeply', color: 'var(--red)' },
  { delay: 3100, text: '> Found: making art from logic',    color: 'var(--red)' },
  { delay: 3500, text: '$ _',                               color: 'var(--muted)' },
]

const About: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay + 500)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <Helmet>
        <title>Dead Side | About</title>
        <meta name="description"        content="About the author of Dead Side — a developer and writer operating somewhere in the void." />
        <meta name="keywords"           content="about, developer, writer, ashv3il" />
        <meta property="og:title"       content="Dead Side | About" />
        <meta property="og:description" content="A developer and writer. Somewhere in the void." />
        <meta property="og:type"        content="profile" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="canonical"           href="https://deadside.vercel.app/about" />
      </Helmet>

      <div className="pt-20 min-h-screen" style={{ background: 'var(--void)' }}>

        {/* Hero */}
        <section className="relative py-24 px-5 overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
          {/* Subtle star-dot pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.35em] mb-5"
              style={{ color: 'var(--red)' }}
            >
              — Identity
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold leading-none mb-5"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--white)' }}
            >
              <GlitchText text="ashv3il" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg max-w-xl mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Developer. Writer. Signal in the void.
            </motion.p>
          </div>
        </section>

        <SpaceDivider />

        {/* Bio + Terminal */}
        <section className="py-16 px-5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2
                className="font-display font-bold text-2xl mb-6 pl-4 border-l-2"
                style={{ color: 'var(--white)', borderColor: 'var(--red)' }}
              >
                Profile
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                <p>
                  I operate under the handle{' '}
                  <span style={{ color: 'var(--star-bright)' }} className="font-mono">
                    ashv3il
                  </span>
                  . I don't have a physical address, exactly — I have a series of connections, a
                  network of servers, a collection of half-finished projects that probably run
                  better than they have any right to.
                </p>
                <p>
                  By day, I build systems that are supposed to be reliable. By night, I write about
                  the ones that aren't. I'm interested in the gap between how we think technology
                  works and how it actually works — that gap is where all the interesting things live.
                </p>
                <p>
                  Dead Side started as a private document. Notes I kept for myself about ideas that
                  wouldn't leave me alone. At some point I decided the void deserved to see them.
                  Make of that what you will.
                </p>
                <p>
                  I believe software is a humanistic discipline. The choices we make in code reflect
                  our values, our assumptions, our blindspots. Understanding that is the beginning of
                  building things worth building.
                </p>
              </div>
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2
                className="font-display font-bold text-2xl mb-6 pl-4 border-l-2"
                style={{ color: 'var(--white)', borderColor: 'var(--red)' }}
              >
                Terminal
              </h2>
              <div className="overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                {/* Terminal header */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3 border-b"
                  style={{ background: 'var(--raised)', borderColor: 'var(--border)' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--red-dim)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--border-hover)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--muted)' }} />
                  <span className="ml-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    bash — ghost@node:~
                  </span>
                </div>
                {/* Terminal body */}
                <div
                  className="p-5 font-mono text-sm min-h-64"
                  style={{ background: 'var(--void)' }}
                >
                  {terminalLines.map((line, i) => (
                    <div
                      key={i}
                      className="mb-1 transition-opacity duration-300"
                      style={{
                        opacity: visibleLines.includes(i) ? 1 : 0,
                        color: line.color,
                      }}
                    >
                      {line.text}
                      {i === terminalLines.length - 1 && visibleLines.includes(i) && (
                        <span className="animate-blink" style={{ color: 'var(--muted)' }}>█</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SpaceDivider />

        {/* Skills */}
        <section className="py-16 px-5">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="font-display font-bold text-2xl mb-2"
              style={{ color: 'var(--white)' }}
            >
              Interests &amp; Skills
            </h2>
            <p className="font-mono text-xs mb-10" style={{ color: 'var(--muted)' }}>
              — the things I think about
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                  className="font-mono text-xs px-4 py-1.5 border transition-all duration-300 cursor-default"
                  style={{
                    color:       'var(--text)',
                    borderColor: 'var(--border)',
                    background:  'var(--surface)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.color       = 'var(--white)'
                    el.style.borderColor = 'var(--border-hover)'
                    el.style.background  = 'var(--raised)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.color       = 'var(--text)'
                    el.style.borderColor = 'var(--border)'
                    el.style.background  = 'var(--surface)'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-14 px-5 text-center border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-widest mb-7" style={{ color: 'var(--muted)' }}>
              Find me in the void
            </p>
            <div className="flex gap-4 justify-center">
              {[
                { label: 'GitHub',    href: 'https://github.com', primary: false },
                { label: 'X / Twitter', href: 'https://x.com',   primary: true  },
              ].map(({ label, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-6 py-2 border transition-all duration-300"
                  style={{
                    color:       primary ? 'var(--white)'  : 'var(--muted)',
                    borderColor: primary ? 'var(--red-dim)' : 'var(--border)',
                    background:  'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color       = 'var(--white)'
                    el.style.borderColor = 'var(--red)'
                    el.style.background  = 'var(--red-faint)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color       = primary ? 'var(--white)'  : 'var(--muted)'
                    el.style.borderColor = primary ? 'var(--red-dim)' : 'var(--border)'
                    el.style.background  = 'transparent'
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
