import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { posts } from '../data/posts'
import type { PostSection } from '../types'
import SpaceDivider from '../components/CyberDivider'

const SectionBlock: React.FC<{ section: PostSection }> = ({ section }) => {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          className="font-display font-bold text-2xl md:text-3xl mt-14 mb-5 pl-4 border-l-2"
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
            <figcaption
              className="font-mono text-xs mt-3 text-center"
              style={{ color: 'var(--muted)' }}
            >
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'quote':
      return (
        <blockquote
          className="my-10 pl-6 border-l-2 py-1"
          style={{ borderColor: 'var(--red)' }}
        >
          <p
            className="text-xl md:text-2xl italic font-light"
            style={{ color: 'var(--star-bright)', lineHeight: 1.75 }}
          >
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
    case 'divider':
      return <SpaceDivider />
    default:
      return null
  }
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const idx      = posts.indexOf(post)
  const prevPost = posts[idx - 1]
  const nextPost = posts[idx + 1]

  return (
    <>
      <Helmet>
        <title>{post.title} | Dead Side</title>
        <meta name="description"        content={post.subtitle} />
        <meta name="keywords"           content={post.keywords.join(', ')} />
        <meta property="og:title"       content={post.title} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:image"       content={post.coverImage} />
        <meta property="og:type"        content="article" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="canonical"           href={`https://deadside.vercel.app/blog/${post.slug}`} />
      </Helmet>

      <article className="pt-16" style={{ background: 'var(--void)' }}>

        {/* Hero image */}
        <div className="relative h-64 md:h-[28rem] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={1200}
            height={600}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.97) 100%)' }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14 max-w-4xl mx-auto left-0 right-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.keywords.map((kw) => (
                <span
                  key={kw}
                  className="font-mono text-xs px-2 py-0.5"
                  style={{
                    color:      'var(--muted)',
                    background: 'rgba(0,0,0,0.8)',
                    border:     '1px solid var(--border)',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold leading-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--white)' }}
            >
              {post.title}
            </motion.h1>
            <p className="text-base md:text-lg mb-4" style={{ color: 'var(--text)' }}>
              {post.subtitle}
            </p>
            <div className="flex items-center gap-4 font-mono text-xs" style={{ color: 'var(--muted)' }}>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-5 py-14">
          {post.content.map((section, i) => (
            <SectionBlock key={i} section={section} />
          ))}
        </div>

        {/* Post navigation */}
        <div
          className="border-t py-10 px-5"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <Link
              to="/blog"
              className="font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
            >
              ← Back to Blog
            </Link>
            <div className="flex gap-8">
              {prevPost && (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="font-mono text-xs transition-colors duration-200"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
                >
                  ← Prev
                  <div className="text-xs mt-0.5 truncate max-w-[140px]" style={{ color: 'var(--star-bright)' }}>
                    {prevPost.title}
                  </div>
                </Link>
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="font-mono text-xs text-right transition-colors duration-200"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--white)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
                >
                  Next →
                  <div className="text-xs mt-0.5 truncate max-w-[140px]" style={{ color: 'var(--star-bright)' }}>
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogPost
