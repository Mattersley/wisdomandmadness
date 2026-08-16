const NeuroLink = () => {
  return (
    <div className="w-64 border-l-4 border-cyan-500 bg-[#050505] p-4">
      <div className="mb-4 flex items-center gap-2 border-b border-cyan-900 pb-2">
        <div className="h-2 w-2 rotate-45 bg-cyan-500 shadow-[0_0_8px_cyan]" />
        <span className="font-mono text-[10px] font-black text-cyan-500 uppercase italic">
          Neural_Bridge_Active
        </span>
      </div>

      <div className="space-y-4">
        <div className="relative h-16 overflow-hidden border border-cyan-900/40 bg-cyan-950/20">
          {/* Neural Signal Wave */}
          <div className="absolute inset-0 flex items-center justify-around">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-[2px] animate-pulse bg-cyan-500/60"
                style={{
                  height: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
          <div className="flex flex-col text-cyan-600">
            <span>SYNC: 0.992</span>
            <span>TEMP: 38.2C</span>
          </div>
          <div className="flex animate-pulse flex-col text-right text-red-600">
            <span>GHOST: LOCK</span>
            <span>HACK: 0.00%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeuroLink