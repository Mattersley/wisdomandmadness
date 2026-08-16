import React, { useState } from 'react'

export const EsperAnalysis = () => {
  const [zoom, setZoom] = useState(100)
  const [coords, setCoords] = useState({ x: 50, y: 50 })

  return (
    <div className="w-80 border-2 border-cyan-900 bg-zinc-900 p-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
      <div className="mb-2 flex items-center justify-between border-b border-cyan-900 pb-1">
        <span className="animate-pulse font-mono text-[10px] text-cyan-500">
          ESPER_ANALYSIS_v4
        </span>
        <span className="font-mono text-[8px] text-cyan-800">SEC: 99-B</span>
      </div>

      {/* Viewport */}
      <div className="relative h-48 overflow-hidden border border-cyan-500/30 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: 'url(\'images.unsplash.com\')',
            transform: `scale(${zoom / 100}) translate(${50 - coords.x}%, ${50 - coords.y}%)`,
            filter: `contrast(1.5) brightness(0.8) sepia(0.5) hue-rotate(140deg) ${zoom > 200 ? 'blur(1px)' : ''}`
          }}
        />
        {/* Targeting Reticle */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center border-[0.5px] border-cyan-500/20">
          <div className="h-10 w-10 border border-cyan-500" />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between font-mono text-[9px] text-cyan-600">
          <span>MAG: {zoom}%</span>
          <span>
            X:{coords.x} Y:{coords.y}
          </span>
        </div>
        <input
          className="w-full bg-zinc-800 accent-cyan-500"
          max="800"
          min="100"
          onChange={(e) => setZoom(Number(e.target.value))}
          type="range"
          value={zoom}
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            className="border border-cyan-600 py-1 text-[10px] text-cyan-600 hover:bg-cyan-600 hover:text-black"
            onClick={() => setZoom((z) => z + 50)}
          >
            ENHANCE
          </button>
          <button
            className="border border-cyan-600 py-1 text-[10px] text-cyan-600"
            onClick={() => setZoom(100)}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}
