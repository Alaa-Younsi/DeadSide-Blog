import React from 'react'

const SpaceDivider: React.FC = () => (
  <div className="flex items-center w-full my-10" aria-hidden="true">
    {/* Left line with flanking dots */}
    <div className="flex items-center gap-3 flex-1">
      <div
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: 'var(--border-hover)' }}
      />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border-hover), var(--border))' }} />
    </div>

    {/* Center pulsing dot */}
    <div className="mx-5 flex-shrink-0 relative">
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full -m-1.5"
        style={{
          border:    '1px solid rgba(204,0,0,0.25)',
          animation: 'redPulse 3s ease-in-out infinite',
        }}
      />
      <div
        className="w-2 h-2 rounded-full"
        style={{
          background: 'var(--red)',
          boxShadow:  '0 0 10px var(--red), 0 0 22px rgba(204,0,0,0.5)',
          animation:  'redPulse 3s ease-in-out infinite',
        }}
      />
    </div>

    {/* Right line with flanking dots */}
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--border), var(--border-hover))' }} />
      <div
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: 'var(--border-hover)' }}
      />
    </div>
  </div>
)

export default SpaceDivider
