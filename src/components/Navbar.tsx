import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GlitchText from './GlitchText'

const navLinks = [
  { to: '/',        label: 'Home'     },
  { to: '/blog',    label: 'Blog'     },
  { to: '/articles',label: 'Articles' },
  { to: '/about',   label: 'About'    },
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled,       setScrolled]        = useState(false)
  const [mobileOpen,     setMobileOpen]      = useState(false)

  const handleScroll = useCallback(() => {
    const el           = document.documentElement
    const scrollTop    = el.scrollTop || document.body.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    setScrolled(scrollTop > 30)
    if (scrollHeight > 0) setScrollProgress((scrollTop / scrollHeight) * 100)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[200] transition-all duration-75"
        style={{
          width:      `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--red-dim), var(--red), var(--red-glow))',
          boxShadow:  '0 0 8px var(--red), 0 0 16px rgba(204,0,0,0.3)',
        }}
        aria-hidden="true"
      />

      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background:    scrolled ? 'rgba(0,0,0,0.94)' : 'rgba(0,0,0,0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom:  scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="font-display font-bold text-lg tracking-[0.18em]"
              style={{ color: 'var(--white)' }}
              aria-label="Dead Side — Home"
            >
              <GlitchText text="DEAD SIDE" />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = isActive(link.to)
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 flex items-center gap-1.5 py-1"
                      style={{ color: active ? 'var(--white)' : 'var(--muted)' }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {/* Active dot */}
                      {active && (
                        <span
                          className="block w-1 h-1 rounded-full flex-shrink-0"
                          style={{
                            background: 'var(--red)',
                            boxShadow:  '0 0 6px var(--red)',
                            animation:  'redPulse 2s ease-in-out infinite',
                          }}
                          aria-hidden="true"
                        />
                      )}
                      {link.label}
                      {/* Bottom underline */}
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-300 origin-left"
                        style={{
                          background: 'var(--red)',
                          transform:  active ? 'scaleX(1)' : 'scaleX(0)',
                          boxShadow:  active ? '0 0 6px var(--red)' : 'none',
                        }}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px w-5 transition-all duration-300"
                  style={{
                    background: 'var(--text-bright)',
                    opacity:    i === 1 && mobileOpen ? 0 : 1,
                    transform:
                      i === 0 && mobileOpen ? 'rotate(45deg) translate(4px,4px)'   :
                      i === 2 && mobileOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileOpen ? '280px' : '0' }}
        >
          <ul
            className="flex flex-col px-5 py-4 gap-1 border-t"
            style={{ background: 'rgba(0,0,0,0.98)', borderColor: 'var(--border)' }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest py-2.5 border-b transition-colors duration-200"
                    style={{
                      color:       active ? 'var(--white)'  : 'var(--muted)',
                      borderColor: 'var(--border)',
                    }}
                    aria-current={active ? 'page' : undefined}
                  >
                    {active && (
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'var(--red)', boxShadow: '0 0 4px var(--red)' }}
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
