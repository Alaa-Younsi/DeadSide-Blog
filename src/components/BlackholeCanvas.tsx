import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

interface InfallingStar {
  angle: number
  dist: number
  speed: number
  size: number
}

const BlackholeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const dataRef   = useRef<{
    stars:     Star[]
    infall:    InfallingStar[]
    startTime: number
    W: number
    H: number
  }>({ stars: [], infall: [], startTime: 0, W: 0, H: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      const W = (canvas.width  = window.innerWidth)
      const H = (canvas.height = window.innerHeight)
      dataRef.current.W = W
      dataRef.current.H = H

      // Background starfield — density varies by distance from centre
      dataRef.current.stars = Array.from({ length: 250 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.1,
      }))

      // Stars being pulled into the black hole
      dataRef.current.infall = Array.from({ length: 14 }, (_, i) => ({
        angle: (i / 14) * Math.PI * 2 + Math.random() * 0.5,
        dist:  Math.random() * 0.35 + 0.12,
        speed: Math.random() * 0.0025 + 0.0008,
        size:  Math.random() * 1.3 + 0.4,
      }))
    }

    const draw = (ts: number) => {
      if (!dataRef.current.startTime) dataRef.current.startTime = ts
      const t  = (ts - dataRef.current.startTime) / 1000
      const W  = dataRef.current.W
      const H  = dataRef.current.H
      const cx = W / 2
      const cy = H / 2
      const R  = Math.min(W, H) * 0.1 // event horizon radius

      // ── Clear ──────────────────────────────────────────────
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      // ── Starfield ─────────────────────────────────────────
      dataRef.current.stars.forEach((s) => {
        const twinkle  = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase))
        const dx       = s.x - cx
        const dy       = s.y - cy
        const distSq   = dx * dx + dy * dy
        const lensEdge = (R * 3.5) * (R * 3.5)
        // Stars closer to the black hole are dimmed (gravitational lensing)
        const dimFactor = distSq < lensEdge ? Math.sqrt(distSq / lensEdge) : 1

        ctx.globalAlpha = twinkle * dimFactor * 0.9
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // ── Outer Corona Glow ─────────────────────────────────
      const coronaGrad = ctx.createRadialGradient(cx, cy, R * 1.2, cx, cy, R * 7)
      coronaGrad.addColorStop(0,   'rgba(160,0,0,0.22)')
      coronaGrad.addColorStop(0.25,'rgba( 90,0,0,0.12)')
      coronaGrad.addColorStop(0.6, 'rgba( 35,0,0,0.05)')
      coronaGrad.addColorStop(1,   'rgba(  0,0,0,0   )')
      ctx.fillStyle = coronaGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 7, 0, Math.PI * 2)
      ctx.fill()

      // ── Accretion Disk ─────────────────────────────────────
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(t * 0.32)

      for (let i = 55; i >= 0; i--) {
        const frac      = i / 55
        const rx        = R * (1.15 + frac * 2.1)
        const ry        = rx * 0.20
        const intensity = Math.pow(1 - frac, 1.6)
        const r         = Math.min(255, Math.floor(230 * intensity + 40))
        const g         = Math.floor( 55 * intensity * intensity)
        const b         = Math.floor( 15 * intensity * intensity)
        ctx.strokeStyle = `rgba(${r},${g},${b},${intensity * 0.55})`
        ctx.lineWidth   = 1.8
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      // ── Gravitational Shadow (darkens zone around horizon) ─
      const shadowGrad = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 2.2)
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.85)')
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0   )')
      ctx.fillStyle = shadowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 2.2, 0, Math.PI * 2)
      ctx.fill()

      // ── Photon Ring ────────────────────────────────────────
      ctx.save()
      ctx.shadowBlur   = 22
      ctx.shadowColor  = 'rgba(220,60,0,0.9)'
      ctx.strokeStyle  = 'rgba(255,110,30,0.65)'
      ctx.lineWidth    = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2)
      ctx.stroke()

      ctx.shadowBlur  = 8
      ctx.shadowColor = 'rgba(255,30,0,0.5)'
      ctx.strokeStyle = 'rgba(255,60,0,0.3)'
      ctx.lineWidth   = 1
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.97, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // ── Infalling Stars ────────────────────────────────────
      dataRef.current.infall.forEach((s) => {
        // Orbit faster as they approach the event horizon
        s.angle += s.speed * (1 + (1 - s.dist) * 4)
        s.dist  -= s.speed * 0.12

        if (s.dist < 0.04) {
          s.dist  = Math.random() * 0.3 + 0.18
          s.angle = Math.random() * Math.PI * 2
        }

        const half = Math.min(W, H) * 0.45
        const x    = cx + Math.cos(s.angle) * s.dist * half
        const y    = cy + Math.sin(s.angle) * s.dist * half * 0.35
        const fade = Math.min(1, (s.dist - 0.04) / 0.1) * Math.min(1, s.dist * 4)

        ctx.globalAlpha = fade
        ctx.fillStyle   = s.dist < 0.15 ? 'rgba(255,180,100,1)' : 'rgba(255,90,30,0.9)'
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // ── Event Horizon (pure black) ─────────────────────────
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    init()
    rafRef.current = requestAnimationFrame(draw)

    const onResize = () => init()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

export default BlackholeCanvas
