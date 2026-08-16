import React, { useEffect, useState } from 'react'

const MotionTracker: React.FC = () => {
  const [blips, setBlips] = useState<
    { id: number; deg: number; dist: number }[]
  >([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBlips((prev) => [
          ...prev.slice(-3),
          {
            id: Date.now(),
            deg: Math.random() * 360,
            dist: 20 + Math.random() * 60
          }
        ])
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-64 w-64 overflow-hidden rounded-full border-[8px] border-[#222] bg-[#0a110a] shadow-inner">
      {/* Scanner Sweep */}
      <div className="absolute inset-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#00ff4133_90deg,transparent_90deg)]" />

      {/* Radial Grids */}
      <div className="absolute inset-0 scale-75 rounded-full border border-[#00ff4122]" />
      <div className="absolute inset-0 scale-50 rounded-full border border-[#00ff4122]" />

      {/* Target Blips */}
      {blips.map((blip) => (
        <div
          key={blip.id}
          className="absolute h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${blip.deg}deg) translateY(-${blip.dist}px)`
          }}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black px-2 font-mono text-[10px] text-[#00ff41]">
        TRACKING: {blips.length > 0 ? 'ACTIVE' : 'SEARCHING'}
      </div>
    </div>
  )
}

export default MotionTracker