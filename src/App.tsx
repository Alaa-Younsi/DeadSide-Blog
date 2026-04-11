import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SpaceVignette from './components/ScanlineOverlay'
import StarField from './components/ParticleBackground'

const Home       = React.lazy(() => import('./pages/Home'))
const About      = React.lazy(() => import('./pages/About'))
const Blog       = React.lazy(() => import('./pages/Blog'))
const BlogPost   = React.lazy(() => import('./pages/BlogPost'))
const Articles   = React.lazy(() => import('./pages/Articles'))
const ArticlePost = React.lazy(() => import('./pages/ArticlePost'))

const LoadingFallback: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: 'var(--void)' }}
  >
    <span
      className="font-mono text-sm tracking-[0.3em]"
      style={{ color: 'var(--red)', animation: 'horizonPulse 2s ease-in-out infinite' }}
    >
      ···
    </span>
  </div>
)

const pageVariants = {
  initial: { opacity: 0, y: 8  },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn'  } },
}

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/"                element={<Home />}        />
          <Route path="/blog"            element={<Blog />}        />
          <Route path="/blog/:slug"      element={<BlogPost />}    />
          <Route path="/articles"        element={<Articles />}    />
          <Route path="/articles/:slug"  element={<ArticlePost />} />
          <Route path="/about"           element={<About />}       />
          <Route path="*"                element={<NotFound />}    />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

const NotFound: React.FC = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-5 pt-20"
    style={{ background: 'var(--void)' }}
  >
    <StarField />
    <div
      className="relative z-10 font-display font-bold text-7xl tracking-widest event-horizon"
      style={{
        color:      'var(--red)',
        textShadow: '0 0 30px rgba(204,0,0,0.6)',
      }}
    >
      404
    </div>
    <p className="relative z-10 font-mono text-xs tracking-[0.3em]" style={{ color: 'var(--muted)' }}>
      OBJECT BEYOND THE EVENT HORIZON
    </p>
  </div>
)

const App: React.FC = () => (
  <HelmetProvider>
    <BrowserRouter>
      <div className="dark" style={{ minHeight: '100vh', background: 'var(--void)' }}>
        <SpaceVignette />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  </HelmetProvider>
)

export default App
