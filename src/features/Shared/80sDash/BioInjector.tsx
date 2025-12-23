import { useState } from 'react'

export const BioInjector = () => {
  const [level, setLevel] = useState(85)

  return (
    <div className="w-60 border-l-8 border-cyan-900 bg-[#0c0c0c] p-4">
      <div className="mb-4 flex flex-col gap-1">
        <span className="font-mono text-[10px] tracking-tighter text-cyan-500">
          PUMP_01 // THE_JUICE
        </span>
        <div className="h-1 w-full bg-cyan-950">
          <div className="h-full bg-cyan-500" style={{ width: `${level}%` }} />
        </div>
      </div>

      <div className="grid h-20 grid-cols-4 items-end gap-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="relative border-t border-cyan-500/40 bg-cyan-900/20"
          >
            <div
              className="absolute bottom-0 w-full bg-cyan-500 opacity-60"
              style={{ height: `${Math.random() * level}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          className="bg-cyan-600 py-1 text-xs font-black text-black shadow-[0_0_10px_rgba(6,182,212,0.5)] active:translate-y-1"
          onClick={() => setLevel((prev) => Math.min(100, prev + 5))}
        >
          INJECT_DORAMINE
        </button>
        <span className="text-center font-mono text-[8px] tracking-widest text-cyan-900 italic">
          WEYLAND-BIOMEDICAL-SYSTEMS
        </span>
      </div>
    </div>
  )
}

export default BioInjector