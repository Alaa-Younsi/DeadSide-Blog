"use client"

import { useEffect, useRef } from "react"

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColor;
uniform float uIntensity;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float t = uTime * 0.035;

  vec2 toMouse = uv - uMouse;
  float d = length(toMouse * vec2(uRes.x / uRes.y, 1.0));
  vec2 swirl = toMouse * 0.9 * exp(-d * 5.0);

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 1.1)
  );
  float f = fbm(p + 2.6 * r + swirl + vec2(t * 0.6, t * 0.25));

  float low = 1.0 - smoothstep(0.0, 0.75, uv.y);
  float sides = smoothstep(0.25, 0.75, abs(uv.x - 0.5) * 1.6);
  float density = 0.3 + 0.7 * max(low, sides);

  float smoke = smoothstep(0.32, 0.92, f) * density;
  smoke *= mix(0.45, 1.0, smoothstep(0.0, 0.22, d));

  float a = clamp(smoke * uIntensity, 0.0, 1.0);
  gl_FragColor = vec4(uColor * a, a);
}
`

type Palette = { color: [number, number, number]; intensity: number }

const PALETTES: Record<"light" | "dark", Palette> = {
  light: { color: [0.36, 0.34, 0.3], intensity: 0.34 },
  dark: { color: [0.86, 0.83, 0.76], intensity: 0.28 },
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function FogCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL API method, not a React hook
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "uRes")
    const uTime = gl.getUniformLocation(program, "uTime")
    const uMouse = gl.getUniformLocation(program, "uMouse")
    const uColor = gl.getUniformLocation(program, "uColor")
    const uIntensity = gl.getUniformLocation(program, "uIntensity")

    const lowEnd =
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      ("connection" in navigator &&
        (navigator.connection as { saveData?: boolean } | undefined)?.saveData === true)
    const scale = lowEnd ? 0.25 : 0.4
    const frameInterval = 1000 / (lowEnd ? 24 : 30)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    let baseIntensity = PALETTES.light.intensity
    let boostStart = Number.NEGATIVE_INFINITY

    function applyPalette() {
      const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light"
      const palette = PALETTES[theme]
      baseIntensity = palette.intensity
      gl?.uniform3f(uColor, ...palette.color)
      gl?.uniform1f(uIntensity, baseIntensity)
    }

    function resize() {
      if (!canvas || !gl) return
      const width = Math.max(1, Math.round(window.innerWidth * scale))
      const height = Math.max(1, Math.round(window.innerHeight * scale))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uRes, width, height)
    }

    const mouse = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 }
    function onPointerMove(event: PointerEvent) {
      mouse.tx = event.clientX / window.innerWidth
      mouse.ty = 1 - event.clientY / window.innerHeight
    }

    let frame = 0
    let last = 0
    const start = performance.now()

    function draw(now: number) {
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      gl?.uniform2f(uMouse, mouse.x, mouse.y)
      gl?.uniform1f(uTime, (now - start) / 1000 + 40)
      const boost = Math.exp(-(now - boostStart) / 600)
      gl?.uniform1f(uIntensity, baseIntensity * (1 + 1.6 * boost))
      gl?.drawArrays(gl.TRIANGLES, 0, 3)
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop)
      if (now - last < frameInterval) return
      last = now
      draw(now)
    }

    function startLoop() {
      cancelAnimationFrame(frame)
      if (reducedMotion.matches) {
        draw(performance.now())
        return
      }
      frame = requestAnimationFrame(loop)
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(frame)
      else startLoop()
    }

    let resizeTimer = 0
    function onResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resize()
        if (reducedMotion.matches) draw(performance.now())
      }, 150)
    }

    const themeObserver = new MutationObserver(() => {
      applyPalette()
      if (!reducedMotion.matches) boostStart = performance.now()
      if (reducedMotion.matches) draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] })

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    applyPalette()
    resize()
    startLoop()
    canvas.dataset.ready = "true"

    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    reducedMotion.addEventListener("change", startLoop)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(resizeTimer)
      themeObserver.disconnect()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("visibilitychange", onVisibility)
      reducedMotion.removeEventListener("change", startLoop)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fog-canvas pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
