import React, { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number; phase: number; speed: number
}

interface InfallingStar {
  angle: number; dist: number; speed: number; size: number; trail: number
}

interface Nebula {
  x: number; y: number; rx: number; ry: number; hue: number; alpha: number
}

const BlackholeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const dataRef   = useRef<{
    stars:     Star[]
    infall:    InfallingStar[]
    nebulae:   Nebula[]
    startTime: number
    W: number
    H: number
  }>({ stars: [], infall: [], nebulae: [], startTime: 0, W: 0, H: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const init = () => {
      const W = (canvas.width  = window.innerWidth)
      const H = (canvas.height = window.innerHeight)
      dataRef.current.W = W
      dataRef.current.H = H

      // Background starfield — varied sizes for depth
      dataRef.current.stars = Array.from({ length: 320 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() < 0.08 ? Math.random() * 1.8 + 1 : Math.random() * 1.2 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.35 + 0.08,
      }))

      // Stars infalling toward the event horizon
      dataRef.current.infall = Array.from({ length: 22 }, (_, i) => ({
        angle: (i / 22) * Math.PI * 2 + Math.random() * 0.8,
        dist:  Math.random() * 0.38 + 0.1,
        speed: Math.random() * 0.003 + 0.001,
        size:  Math.random() * 1.6 + 0.5,
        trail: Math.random() * 0.5 + 0.3,
      }))

      // Background nebula patches (subtle colour clouds)
      dataRef.current.nebulae = Array.from({ length: 5 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        rx:    Math.random() * W * 0.22 + W * 0.08,
        ry:    Math.random() * H * 0.15 + H * 0.05,
        hue:   Math.random() < 0.5 ? 0 : 220, // red or blue nebulae
        alpha: Math.random() * 0.035 + 0.01,
      }))
    }

    const draw = (ts: number) => {
      if (!dataRef.current.startTime) dataRef.current.startTime = ts
      const t  = (ts - dataRef.current.startTime) / 1000
      const W  = dataRef.current.W
      const H  = dataRef.current.H
      const cx = W / 2
      const cy = H / 2
      const R  = Math.min(W, H) * 0.12 // slightly larger event horizon

      // ── Clear ──────────────────────────────────────────────
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, W, H)

      // ── Nebula clouds (distant, subtle) ─────────────────────
      dataRef.current.nebulae.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx)
        grad.addColorStop(0,   `hsla(${n.hue}, 90%, 30%, ${n.alpha})`)
        grad.addColorStop(0.6, `hsla(${n.hue}, 80%, 20%, ${n.alpha * 0.4})`)
        grad.addColorStop(1,   `hsla(${n.hue}, 70%, 10%, 0)`)
        ctx.save()
        ctx.scale(1, n.ry / n.rx)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // ── Starfield ─────────────────────────────────────────
      dataRef.current.stars.forEach((s) => {
        const twinkle  = 0.25 + 0.75 * Math.abs(Math.sin(t * s.speed + s.phase))
        const dx       = s.x - cx
        const dy       = s.y - cy
        const distSq   = dx * dx + dy * dy
        const lensEdge = (R * 4) * (R * 4)
        const dimFactor = distSq < lensEdge ? Math.sqrt(distSq / lensEdge) : 1

        ctx.globalAlpha = twinkle * dimFactor * 0.85
        ctx.fillStyle   = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()

        // Brightest stars get a soft cross-glow
        if (s.r > 1.5 && dimFactor > 0.85) {
          ctx.globalAlpha = twinkle * dimFactor * 0.12
          ctx.strokeStyle  = '#ffffff'
          ctx.lineWidth    = 0.5
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 2.5, s.y)
          ctx.lineTo(s.x + s.r * 2.5, s.y)
          ctx.moveTo(s.x, s.y - s.r * 2.5)
          ctx.lineTo(s.x, s.y + s.r * 2.5)
          ctx.stroke()
        }
      })
      ctx.globalAlpha = 1

      // ── Outer Corona Glow ─────────────────────────────────
      const coronaGrad = ctx.createRadialGradient(cx, cy, R * 1.4, cx, cy, R * 8.5)
      coronaGrad.addColorStop(0,    'rgba(200,0,0,0.28)')
      coronaGrad.addColorStop(0.18, 'rgba(120,0,0,0.14)')
      coronaGrad.addColorStop(0.45, 'rgba( 60,0,0,0.06)')
      coronaGrad.addColorStop(1,    'rgba(  0,0,0,0   )')
      ctx.fillStyle = coronaGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 8.5, 0, Math.PI * 2)
      ctx.fill()

      // ── Accretion Disk ─────────────────────────────────────
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(t * 0.28)

      for (let i = 65; i >= 0; i--) {
        const frac      = i / 65
        const rx        = R * (1.18 + frac * 2.4)
        const ry        = rx * 0.18
        const intensity = Math.pow(1 - frac, 1.4)
        const r         = Math.min(255, Math.floor(245 * intensity + 30))
        const g         = Math.floor( 70 * intensity * intensity)
        const b         = Math.floor( 20 * intensity * intensity)
        const a         = intensity * 0.6 + (Math.sin(t * 2 + frac * 8) * 0.05)
        ctx.strokeStyle = `rgba(${r},${g},${b},${Math.max(0, a)})`
        ctx.lineWidth   = 2
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      // ── Inner disk counter-rotation (adds depth) ──────────
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-t * 0.15)
      for (let i = 20; i >= 0; i--) {
        const frac      = i / 20
        const rx        = R * (1.12 + frac * 0.9)
        const ry        = rx * 0.12
        const intensity = Math.pow(1 - frac, 2.2)
        ctx.strokeStyle = `rgba(255,${Math.floor(120 * intensity)},${Math.floor(40 * intensity)},${intensity * 0.45})`
        ctx.lineWidth   = 1.2
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.restore()

      // ── Gravitational Shadow ───────────────────────────────
      const shadowGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 2.6)
      shadowGrad.addColorStop(0, 'rgba(0,0,0,0.92)')
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0   )')
      ctx.fillStyle = shadowGrad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 2.6, 0, Math.PI * 2)
      ctx.fill()

      // ── Photon Ring (multi-layer for realism) ──────────────
      ctx.save()
      // Outer soft glow
      ctx.shadowBlur   = 40
      ctx.shadowColor  = 'rgba(255,60,0,0.7)'
      ctx.strokeStyle  = 'rgba(255,120,40,0.15)'
      ctx.lineWidth    = 8
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2)
      ctx.stroke()
      // Main bright ring
      ctx.shadowBlur   = 24
      ctx.shadowColor  = 'rgba(240,80,0,0.95)'
      ctx.strokeStyle  = 'rgba(255,130,50,0.75)'
      ctx.lineWidth    = 1.8
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2)
      ctx.stroke()
      // Inner secondary ring
      ctx.shadowBlur   = 12
      ctx.shadowColor  = 'rgba(255,40,0,0.6)'
      ctx.strokeStyle  = 'rgba(255,80,20,0.45)'
      ctx.lineWidth    = 1
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.97, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // ── Infalling Stars with trailing streaks ──────────────
      dataRef.current.infall.forEach((s) => {
        s.angle += s.speed * (1 + (1 - s.dist) * 5)
        s.dist  -= s.speed * 0.1

        if (s.dist < 0.04) {
          s.dist  = Math.random() * 0.32 + 0.16
          s.angle = Math.random() * Math.PI * 2
        }

        const half = Math.min(W, H) * 0.44
        const x    = cx + Math.cos(s.angle) * s.dist * half
        const y    = cy + Math.sin(s.angle) * s.dist * half * 0.32
        const fade = Math.min(1, (s.dist - 0.04) / 0.12) * Math.min(1, s.dist * 5)

        // Trail
        const trailLen = 0.025
        const tx = cx + Math.cos(s.angle - trailLen) * s.dist * half
        const ty = cy + Math.sin(s.angle - trailLen) * s.dist * half * 0.32
        const trailGrad = ctx.createLinearGradient(tx, ty, x, y)
        trailGrad.addColorStop(0, 'rgba(255,100,30,0)')
        trailGrad.addColorStop(1, `rgba(255,100,30,${fade * s.trail * 0.5})`)
        ctx.strokeStyle = trailGrad
        ctx.lineWidth   = s.size * 0.7
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Star dot
        ctx.globalAlpha = fade
        ctx.fillStyle   = s.dist < 0.12 ? 'rgba(255,200,130,1)' : 'rgba(255,100,40,0.9)'
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      // ── Event Horizon (absolute black) ────────────────────
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    init()
    rafRef.current = requestAnimationFrame(draw)

    const onResize = () => init()
    window.addEventListener('resize', onResize, { passive: true })

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