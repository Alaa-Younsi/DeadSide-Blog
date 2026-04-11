import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const starsRef  = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = Array.from({ length: 180 }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.1 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.3 + 0.08,
      }))
    }

    let startTime = 0
    const draw = (ts: number) => {
      if (!startTime) startTime = ts
      const t = (ts - startTime) / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      starsRef.current.forEach((s) => {
        const twinkle   = 0.25 + 0.75 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.globalAlpha = twinkle * 0.6
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha  = 1
      rafRef.current   = requestAnimationFrame(draw)
    }

    init()
    rafRef.current = requestAnimationFrame(draw)
    window.addEventListener('resize', init)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

export default StarField
