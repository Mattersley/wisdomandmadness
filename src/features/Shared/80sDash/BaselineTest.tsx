import React, { useEffect, useState } from 'react'

export const BaselineTest = () => {
  const [sync, setSync] = useState(100)
  const [isFailing, setIsFailing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSync((s) => Math.max(0, s - Math.random() * 2))
      if (sync < 40) setIsFailing(true)
    }, 500)
    return () => clearInterval(interval)
  }, [sync])

  return (
    <div className="w-60 border-2 border-orange-900 bg-zinc-950 p-4 shadow-[0_0_20px_rgba(124,45,18,0.3)]">
      <div className="mb-2 flex justify-between font-mono text-[9px] text-orange-600">
        <span className="animate-pulse">CELLS_INTERLINKED</span>
        <span>SYNC: {sync.toFixed(1)}%</span>
      </div>

      {/* The "Eye" Tracker */}
      <div className="relative flex h-24 items-center justify-center overflow-hidden border border-orange-900 bg-black">
        <div className="absolute h-px w-full bg-orange-900/30" />
        <div className="absolute h-full w-px bg-orange-900/30" />
        <div
          className={`h-12 w-12 rounded-full border-2 transition-all duration-75 ${isFailing ? 'animate-ping border-red-600' : 'border-orange-500'}`}
          style={{
            transform: `translate(${(50 - sync) * 2}px, ${(Math.random() - 0.5) * 10}px)`
          }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px]">
        <button
          className="border border-orange-600 bg-orange-900/20 py-2 text-orange-500 transition-all hover:bg-orange-600 hover:text-black"
          onClick={() => {
            setSync(100)
            setIsFailing(false)
          }}
        >
          RESET_BASELINE
        </button>
        <div className="flex items-center justify-center border border-red-900 font-black text-red-900">
          {isFailing ? 'DEVIANT' : 'CONSTANT'}
        </div>
      </div>
    </div>
  )
}

export default BaselineTest