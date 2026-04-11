import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import type { ArticleSection } from '../types'
import SpaceDivider from '../components/CyberDivider'

interface TOCItem { id: string; text: string }

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

const SectionBlock: React.FC<{ section: ArticleSection; id?: string }> = ({ section, id }) => {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          id={id}
          className="font-display font-bold text-2xl md:text-3xl mt-14 mb-5 pl-4 border-l-2 scroll-mt-24"
          style={{ color: 'var(--white)', borderColor: 'var(--red)' }}
        >
          {section.content}
        </h2>
      )
    case 'subheading':
      return (
        <h3
          className="font-display font-semibold text-xl mt-10 mb-3"
          style={{ color: 'var(--star-bright)' }}
        >
          {section.content}
        </h3>
      )
    case 'paragraph':
      return (
        <p
          className="text-base md:text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text)', lineHeight: 1.85 }}
        >
          {section.content}
        </p>
      )
    case 'image':
      return (
        <figure className="my-10">
          <img
            src={section.content}
            alt={section.alt ?? ''}
            className="w-full object-cover"
            style={{ border: '1px solid var(--border)' }}
            loading="lazy"
            width={1200}
            height={500}
          />
          {section.caption && (
            <figcaption className="font-mono text-xs mt-3 text-center" style={{ color: 'var(--muted)' }}>
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'quote':
      return (
        <blockquote className="my-10 pl-6 border-l-2 py-1" style={{ borderColor: 'var(--red)' }}>
          <p className="text-xl italic font-light" style={{ color: 'var(--star-bright)', lineHeight: 1.75 }}>
            {section.content}
          </p>
        </blockquote>
      )
    case 'code':
      return (
        <div className="my-8 overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ background: 'var(--raised)', borderColor: 'var(--border)' }}
          >
            <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {section.language ?? 'code'}
            </span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--red-dim)' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--border-hover)' }} />
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--muted)' }} />
            </div>
          </div>
          <pre
            className="p-6 overflow-x-auto font-mono text-sm leading-relaxed"
            style={{ background: 'var(--surface)', color: 'var(--star-bright)' }}
          >
            <code>{section.content}</code>
          </pre>
        </div>
      )
    case 'list':
      return (
        <ul className="my-6 space-y-2.5">
          {(section.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base" style={{ color: 'var(--text-bright)' }}>
              <span className="mt-1 flex-shrink-0 font-mono text-xs" style={{ color: 'var(--red)' }}>—</span>
              <span style={{ color: 'var(--text)' }}>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'divider':
      return <SpaceDivider />
    default:
      return null
  }
}

const ArticlePost: React.FC = () => {
  const { slug }   = useParams<{ slug: string }>()
  const article    = articles.find((a) => a.slug === slug)
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  const headings: TOCItem[] = useMemo(
    () => (article?.content ?? [])
      .filter((s) => s.type === 'heading')
      .map((s) => ({ id: slugify(s.content ?? ''), text: s.content ?? '' })),
    [article]
  )

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })
  }, [headings])

  useEffect(() => {
    setupObserver()
    return () => observerRef.current?.disconnect()
  }, [setupObserver])

  if (!article) return <Navigate to="/articles" replace />

  let _hi = 0
  const sectionIds: (string | null)[] = article.content.map((s) => {
    if (s.type === 'heading') { const id = headings[_hi]?.id ?? ''; _hi++; return id }
    return null
  })

  return (
    <>
      <Helmet>
        <title>{article.title} | Dead Side</title>
        <meta name="description"        content={article.subtitle} />
        <meta name="keywords"           content={article.keywords.join(', ')} />
        <meta property="og:title"       content={article.title} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:image"       content={article.coverImage} />
        <meta property="og:type"        content="article" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="canonical"           href={`https://deadside.vercel.app/articles/${article.slug}`} />
      </Helmet>

      <div className="pt-16 min-h-screen" style={{ background: 'var(--void)' }}>

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-14 px-5 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-mono text-xs px-2 py-0.5"
                    style={{ color: 'var(--muted)', background: 'var(--raised)', border: '1px solid var(--border)' }}
                  >
                    {article.category}
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--white)' }}
                >
                  {article.title}
                </h1>
                <p className="text-lg mb-4 leading-relaxed" style={{ color: 'var(--text)' }}>
                  {article.subtitle}
                </p>
                <div className="flex items-center gap-4 font-mono text-xs" style={{ color: 'var(--muted)' }}>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <div
                className="w-full md:w-64 flex-shrink-0 overflow-hidden"
                style={{ border: '1px solid var(--border)' }}
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  width={256}
                  height={176}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex flex-col lg:flex-row gap-14">

            {/* Body */}
            <main className="flex-1 min-w-0">
              {article.content.map((section, i) => (
                <SectionBlock key={i} section={section} id={sectionIds[i] ?? undefined} />
              ))}
            </main>

            {/* Sticky TOC */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-56 flex-shrink-0">
                <div
                  className="sticky top-24 p-5 border"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <h4
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    Contents
                  </h4>
                  <nav>
                    <ul className="space-y-2.5">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="block text-sm leading-snug transition-colors duration-200 pl-2"
                            style={{
                              color:       activeId === h.id ? 'var(--white)'  : 'var(--muted)',
                              borderLeft:  `2px solid ${activeId === h.id ? 'var(--red)' : 'transparent'}`,
                            }}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="border-t py-10 px-5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto">
            <Link
              to="/articles"
              className="font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              ← Back to Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticlePost
