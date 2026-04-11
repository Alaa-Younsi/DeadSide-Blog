import React from 'react'

const SpaceVignette: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
      zIndex: 50,
    }}
    aria-hidden="true"
  />
)

export default SpaceVignette
