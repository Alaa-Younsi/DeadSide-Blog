import React from 'react'
import { Link } from 'react-router-dom'

const GitHubIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const XIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative z-10 border-t mt-20"
      style={{ background: 'var(--void)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display font-bold text-lg tracking-[0.2em]"
              style={{ color: 'var(--white)' }}
            >
              DEAD SIDE
            </Link>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Dispatches from the edge of the known universe.
              <br />
              Tech. Thought. The void between.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted)' }}
            >
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/',         label: 'Home'     },
                { to: '/blog',     label: 'Blog'     },
                { to: '/articles', label: 'Articles' },
                { to: '/about',    label: 'About'    },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--muted)' }}
            >
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com', label: 'GitHub', Icon: GitHubIcon },
                { href: 'https://x.com',      label: 'X (Twitter)', Icon: XIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded transition-all duration-200"
                  style={{ color: 'var(--muted)' }}
                  aria-label={label}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--white)'
                    el.style.background = 'var(--surface)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--muted)'
                    el.style.background = 'transparent'
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            Lost in space. Powered by curiosity.
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            © {year} Dead Side. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
