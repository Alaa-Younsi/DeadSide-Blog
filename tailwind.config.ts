import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void:    '#000000',
        space:   '#060606',
        surface: '#0e0e0e',
        raised:  '#141414',
        'space-border': '#1e1e1e',
        muted:   '#444444',
        star:    '#888888',
        'star-bright': '#cccccc',
        'star-white':  '#f2f2f2',
        red: {
          DEFAULT: '#cc0000',
          glow:    '#ff2020',
          dim:     '#660000',
          faint:   '#1a0000',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      animation: {
        glitch:       'glitch 0.4s steps(2) infinite',
        fadeInUp:     'fadeInUp 0.6s ease-out forwards',
        fadeIn:       'fadeIn 0.4s ease-out forwards',
        blink:        'blink 1s step-end infinite',
        horizonPulse: 'horizonPulse 4s ease-in-out infinite',
        scrollDown:   'scrollDown 1.6s ease-in-out infinite',
        float:        'float 3s ease-in-out infinite',
        redPulse:     'redPulse 2s ease-in-out infinite',
        shimmer:      'shimmer 2.4s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%':   { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-2px, 0)' },
          '20%':  { clipPath: 'inset(92% 0 1%  0)', transform: 'translate( 2px, 0)' },
          '40%':  { clipPath: 'inset(43% 0 1%  0)', transform: 'translate( 1px, 0)' },
          '60%':  { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(-1px, 0)' },
          '80%':  { clipPath: 'inset(54% 0 7%  0)', transform: 'translate( 2px, 0)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(-2px, 0)' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        horizonPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(204,0,0,0.35), 0 0 50px rgba(204,0,0,0.15)' },
          '50%':      { boxShadow: '0 0 35px rgba(204,0,0,0.55), 0 0 80px rgba(204,0,0,0.25)' },
        },
        scrollDown: {
          '0%':   { transform: 'translateY(0)',    opacity: '1' },
          '60%':  { transform: 'translateY(10px)', opacity: '0' },
          '61%':  { transform: 'translateY(-4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        redPulse: {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 6px #cc0000' },
          '50%':      { opacity: '1',   boxShadow: '0 0 14px #cc0000, 0 0 28px rgba(204,0,0,0.4)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%)  skewX(-15deg)' },
        },
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
