import React from 'react'

const SpaceDivider: React.FC = () => (
  <div className="flex items-center w-full my-10" aria-hidden="true">
    <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    <div
      className="mx-4 w-1.5 h-1.5 rounded-full"
      style={{
        background: 'var(--red)',
        boxShadow: '0 0 8px var(--red), 0 0 16px rgba(204,0,0,0.4)',
      }}
    />
    <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
  </div>
)

export default SpaceDivider
