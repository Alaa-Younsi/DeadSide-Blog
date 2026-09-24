import type { Metadata } from "next"
import type { ReactNode } from "react"
import { FogCanvas } from "@/components/fog-canvas"
import { Footer } from "@/components/footer"
import { GrainOverlay } from "@/components/grain-overlay"
import { Masthead } from "@/components/masthead"
import { MotionProvider } from "@/components/motion-provider"
import { PageTransition } from "@/components/page-transition"
import { PressIntro } from "@/components/press-intro"
import { ThemeScript } from "@/components/theme-script"
import { bodyFont, headlineFont, meta } from "@/lib/fonts"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headlineFont.variable} ${bodyFont.variable} ${meta.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <MotionProvider>
          <PressIntro />
          <FogCanvas />
          <GrainOverlay />
          <Masthead />
          <PageTransition>
            <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
          </PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
