import React from 'react'

export const AirScrubber = () => {
  return (
    <div className="group relative w-60 overflow-hidden border-2 border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-red-600 shadow-[0_0_8px_red]" />
          <div className="h-3 w-3 bg-zinc-800" />
        </div>
        <span className="font-mono text-[9px] text-zinc-500 uppercase">
          Filter_Status: 12%
        </span>
      </div>

      <div className="font-mono text-amber-600/80">
        <div className="mb-2 border-b border-zinc-800 pb-1 text-xs">
          SCRUBBER_04 // ERROR
        </div>
        <div className="space-y-1 text-[10px] leading-tight">
          <p className="line-through opacity-30">{'>'} INIT_PURGE</p>
          <p className="animate-pulse">{'>'} ERROR: CALCIUM_BUILDUP</p>
          <p className="">{'>'} MANUAL_BYPASS_REQUIRED</p>
        </div>
      </div>

      <div className="mt-4 flex h-8 items-center justify-center border border-zinc-700 bg-black">
        <div className="h-full w-full bg-[repeating-linear-gradient(45deg,#450a0a,#450a0a_10px,#000_10px,#000_20px)] opacity-50" />
        <span className="absolute text-[10px] font-black tracking-widest text-white">
          REPLACE UNIT
        </span>
      </div>
    </div>
  )
}

export default AirScrubber