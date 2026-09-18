# THE DEAD SIDE

A personal newspaper — thoughts, stories, and experiments across a handful of desks (Technology, Culture, Stories, Experiments), designed and built to read like an actual paper: masthead, front-page lead/secondary/briefs, desk sections, drop caps, pull quotes, and a day/night edition toggle.

## Stack

- **[Bun](https://bun.sh)** — runtime and package manager
- **[Next.js](https://nextjs.org) (App Router)** — SSG/SSR, routing, image + OG image generation
- **[Velite](https://velite.js.org)** — typed MDX content layer (Zod-validated frontmatter, build-time)
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling, theme tokens for the day/night edition
- **[Motion](https://motion.dev)** — page transitions, scroll reveals, headline entrance
- **[Biome](https://biomejs.dev)** — linting + formatting (no ESLint/Prettier)
- **TypeScript**, strict mode

No database, no CMS, no backend. Content is `.mdx` files in `content/posts/`; publishing a story is a new file and a `git push`.

## Getting started

```bash
bun install
bun run dev      # runs velite in watch mode + next dev together
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
|---|---|
| `bun run dev` | Velite watch + Next dev server (Turbopack) |
| `bun run build` | Velite build, then `next build` |
| `bun run start` | Serve the production build |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | `biome check .` |
| `bun run lint:fix` | `biome check --write .` |
| `bun run format` | `biome format --write .` |

## Adding a story

Add a new file to `content/posts/`:

```mdx
---
title: "Your Headline"
slug: your-headline
category: technology   # must match a slug in lib/categories.ts
date: "2026-01-01"
excerpt: "One or two sentences for the card and meta description."
cover: "/covers/technology.svg"   # optional
tags: ["tag-one", "tag-two"]
author: "Your Name"
featured: false          # true + featuredOrder to appear on the front page
---

Your first paragraph gets a drop cap automatically.

<PullQuote cite="optional attribution">
  An inline pull quote component, usable anywhere in the body.
</PullQuote>
```

Frontmatter is validated by `velite.config.ts` at build time — an invalid `category` or missing required field fails the build instead of shipping a broken page.

## Adding a desk (category)

Edit `lib/categories.ts` — navigation, the front page's per-desk sections, and category routes are all derived from that one array.

## Project structure

```
app/                 App Router routes (front page, [category], [category]/[slug], about, search, feed.xml, sitemap, robots)
components/          UI components (masthead, article cards, MDX renderer, etc.)
content/posts/       Article content (.mdx)
lib/                 Categories config, site config, content helpers, fonts, utils
public/covers/       Desk illustrations (SVG)
velite.config.ts     Content schema
```

## Deployment

Configured for Vercel (`vercel.json`) — framework `nextjs`, `bun install` / `bun run build`, plus security headers and long-lived caching for `_next/static` and `/covers`.
