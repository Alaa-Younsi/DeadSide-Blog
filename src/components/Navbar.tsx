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
    const el          = document.documentElement
    const scrollTop   = el.scrollTop || document.body.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    setScrolled(scrollTop > 20)
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
      {/* Scroll progress — red line at very top */}
      <div
        className="fixed top-0 left-0 h-px z-[200] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'var(--red)',
          boxShadow: '0 0 6px var(--red)',
        }}
        aria-hidden="true"
      />

      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="font-display font-bold text-xl tracking-[0.15em]"
              style={{ color: 'var(--white)' }}
              aria-label="Dead Side — Home"
            >
              <GlitchText text="DEAD SIDE" />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="relative font-mono text-xs uppercase tracking-widest transition-colors duration-200"
                    style={{ color: isActive(link.to) ? 'var(--white)' : 'var(--muted)' }}
                  >
                    {link.label}
                    {/* Underline: always-visible when active, expands on hover */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                      style={{
                        background: 'var(--red)',
                        width: isActive(link.to) ? '100%' : '0%',
                        boxShadow: isActive(link.to) ? '0 0 6px var(--red)' : 'none',
                      }}
                    />
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 opacity-50"
                      style={{ background: 'var(--red)' }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px w-6 transition-all duration-300"
                  style={{
                    background: 'var(--star-bright)',
                    opacity:    i === 1 && mobileOpen ? 0 : 1,
                    transform:
                      i === 0 && mobileOpen ? 'rotate(45deg) translateY(8px)'  :
                      i === 2 && mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight:   mobileOpen ? '260px' : '0',
            borderTop:   mobileOpen ? '1px solid var(--border)' : 'none',
          }}
        >
          <ul
            className="flex flex-col px-5 py-5 gap-5"
            style={{ background: 'rgba(0,0,0,0.97)' }}
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block font-mono text-sm uppercase tracking-widest py-1 border-b transition-colors duration-200"
                  style={{
                    color:        isActive(link.to) ? 'var(--white)' : 'var(--muted)',
                    borderColor:  'var(--border)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
