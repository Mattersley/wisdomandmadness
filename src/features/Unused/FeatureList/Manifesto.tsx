import { useEffect, useRef, useState } from 'react'
import features from '@/features/Madness/data/features'
import { AnimatePresence, motion } from 'motion/react'
import Egg from '@/features/Madness/Eggs/Egg'

const FeatureList = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null)

  const totalItems = features.length
  const columnsCount = 5
  const cellSize = 68 // Cell dimension tracking matrix step size

  // Auto Rotation System
  useEffect(() => {
    if (!isHovered) {
      autoRotateTimer.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalItems)
      }, 4500)
    }

    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current)
    }
  }, [isHovered, totalItems])

  // Map flat array indexes straight onto absolute 2D grid matrix coordinates
  const getCoordinates = (index: number) => {
    const row = Math.floor(index / columnsCount)
    const col = index % columnsCount
    return {
      x: col * cellSize + cellSize / 2,
      y: row * cellSize + cellSize / 2
    }
  }

  const currentCoords = getCoordinates(activeIndex)

  const stepPrev = () =>
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  const stepNext = () => setActiveIndex((prev) => (prev + 1) % totalItems)

  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center bg-black px-4 py-16 font-sans text-white antialiased select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Master Blueprint Layout Container Chassis */}
      <div className="relative flex h-[550px] w-[380px] flex-shrink-0 flex-col items-center overflow-visible rounded-2xl border-2 border-white/10 bg-neutral-950/20 p-4 shadow-[0_50px_100px_rgba(0,0,0,0.9)] sm:h-[630px] sm:w-[460px] sm:p-6">
        {/* Architectural Layout Header Markings */}
        <div className="mb-4 flex w-full items-center justify-between border-b border-white/5 pb-2 font-mono text-[9px] text-neutral-500 uppercase">
          <span>Manifesto Matrix System // Ver 3.0</span>
          <span>Axis: Lock // Status: Active</span>
        </div>

        {/* Vector Grid Container Panel */}
        <div
          className="relative shrink-0 overflow-hidden rounded-xl border border-white/5 bg-black/40"
          style={{ width: columnsCount * cellSize, height: 3 * cellSize }}
        >
          {/* Fine Blueprint Mesh Lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: `${cellSize}px ${cellSize}px`
            }}
          />
          {/* ================= AXONOMETRIC CROSSHAIR SCOPES ================= */}
          {/* Horizontal Grid Tracker Ray */}
          <motion.div
            animate={{ top: currentCoords.y }}
            className="pointer-events-none absolute right-0 left-0 z-0 h-px bg-gradient-to-r from-transparent via-[#FC466B]/50 to-transparent"
            transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          />
          {/* Vertical Grid Tracker Ray */}
          <motion.div
            animate={{ left: currentCoords.x }}
            className="pointer-events-none absolute top-0 bottom-0 z-0 w-px bg-gradient-to-b from-transparent via-[#3F5EFB]/50 to-transparent"
            transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          />
          {/* Intersecting Radar Scope Target Reticle */}
          <motion.div
            animate={{ top: currentCoords.y - 14, left: currentCoords.x - 14 }}
            className="pointer-events-none absolute z-10 size-7 rounded-full border border-cyan-400/30 bg-cyan-400/5 blur-[1px]"
            transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          />
          {/* ================= VECTOR MATRIX BUTTON INSTANCES ================= */}
          <div className="absolute inset-0 z-20 grid grid-cols-5 grid-rows-3">
            {features.map((feature, index) => {
              const isSelected = index === activeIndex

              return (
                <div
                  key={`matrix-node-${index}`}
                  className="flex h-full w-full items-center justify-center"
                >
                  <motion.button
                    animate={{
                      scale: isSelected ? 1.15 : 1,
                      borderColor: isSelected
                        ? '#FC466B'
                        : 'rgba(255,255,255,0.08)',
                      backgroundColor: isSelected
                        ? '#FFFFFF'
                        : 'rgba(12,10,15,0.6)',
                      color: isSelected ? '#3F5EFB' : '#FFFFFF',
                      boxShadow: isSelected
                        ? '0 0 25px rgba(252,70,107,0.25)'
                        : '0 0 0px transparent',
                      filter: isSelected
                        ? 'blur(0px)'
                        : isHovered
                          ? 'blur(0.5px)'
                          : 'blur(0px)'
                    }}
                    className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-xl border shadow-xl transition-colors duration-200 outline-none focus:outline-none sm:size-12"
                    onClick={() => setActiveIndex(index)}
                    whileHover={{
                      borderColor: 'rgba(255,255,255,0.4)',
                      scale: isSelected ? 1.15 : 1.06
                    }}
                  >
                    <svg
                      className="size-5 stroke-[1.5]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <g
                        stroke={
                          isSelected
                            ? 'url(#blueprint-neon-gradient-v3)'
                            : 'currentColor'
                        }
                      >
                        <defs>
                          <linearGradient
                            id="blueprint-neon-gradient-v3"
                            x1="0%"
                            x2="100%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FC466B" />
                            <stop offset="100%" stopColor="#3F5EFB" />
                          </linearGradient>
                        </defs>
                        {feature.icon}
                      </g>
                    </svg>
                  </motion.button>
                </div>
              )
            })}
          </div>
        </div>

        {/* ================= SQUARE MANIFESTO TEXT TERMINAL DECK ================= */}
        {/* Structural square terminal viewport box completely avoids text truncations */}
        <div className="relative mt-6 flex w-full flex-1 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/80 p-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] sm:p-5">
          {/* Corner Blueprint Accent Ticks */}
          <div className="pointer-events-none absolute top-2 left-2 size-1.5 border-t border-l border-white/20" />
          <div className="pointer-events-none absolute top-2 right-2 size-1.5 border-t border-r border-white/20" />
          <div className="pointer-events-none absolute bottom-2 left-2 size-1.5 border-b border-l border-white/20" />
          <div className="pointer-events-none absolute right-2 bottom-2 size-1.5 border-r border-b border-white/20" />

          <AnimatePresence mode="wait">
            {(() => {
              const activeFeature = features[activeIndex]

              return activeFeature.blurb === 'Eggs?' ? (
                <motion.div
                  key="embedded-blueprint-egg"
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full w-full scale-75 items-center justify-center text-white"
                  exit={{ opacity: 0, scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                >
                  <Egg id={4} />
                </motion.div>
              ) : (
                <motion.div
                  key={activeFeature.caption}
                  animate="visible"
                  className="relative flex h-full w-full flex-col justify-start pt-1"
                  exit="exit"
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.012 }
                    },
                    exit: { opacity: 0, transition: { duration: 0.15 } }
                  }}
                >
                  {/* Micro Index Metadata Tracking Tag */}
                  <span className="mb-1 bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text font-mono text-[9px] font-bold tracking-[0.25em] text-transparent uppercase select-none">
                    MANIFESTO // CORE DECK SECTOR 0{activeIndex + 1}
                  </span>

                  {/* Premium Kinetic Split Character Headline */}
                  <h1 className="mb-3 flex max-w-full flex-wrap overflow-hidden text-xs leading-none font-black tracking-wider text-white uppercase select-none sm:text-sm">
                    {activeFeature.caption.split('').map((char, idx) => (
                      <motion.span
                        key={`${char}-${idx}`}
                        className="inline-block origin-bottom select-none"
                        variants={{
                          hidden: { y: '100%' },
                          visible: {
                            y: 0,
                            transition: {
                              type: 'spring',
                              stiffness: 180,
                              damping: 14
                            }
                          }
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </h1>

                  {/* NO TRUNCATION VIEWPORT LANE: Independent vertical scroll channel maps long copy options perfectly */}
                  <div className="custom-mini-scrollbar pointer-events-auto mb-12 h-[110px] w-full overflow-x-hidden overflow-y-auto pr-1 select-text sm:h-[140px]">
                    <p className="text-left font-mono text-[10px] leading-relaxed font-normal tracking-wide text-neutral-300 sm:text-[11px]">
                      {activeFeature.blurb}
                    </p>
                  </div>

                  {/* ================= STEP ACTION NAVIGATION ROW ================= */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/5 bg-black pt-3 select-none">
                    {/* Left Index Increment button */}
                    <button
                      className="pointer-events-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-neutral-900/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/50 uppercase transition-all duration-300 outline-none hover:border-white hover:bg-white hover:text-black focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        stepPrev()
                      }}
                    >
                      <svg
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      Prev
                    </button>

                    {/* Technical Diagnostic Baseline Markings */}
                    <div className="hidden font-mono text-[8px] tracking-wider text-neutral-600 sm:block">
                      X-AXIS // INFRASTRUCTURE // FREQUENCY
                    </div>

                    {/* Right Index Increment button */}
                    <button
                      className="pointer-events-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-neutral-900/60 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/50 uppercase transition-all duration-300 outline-none hover:border-white hover:bg-white hover:text-black focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        stepNext()
                      }}
                    >
                      Next
                      <svg
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
            })()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FeatureList
