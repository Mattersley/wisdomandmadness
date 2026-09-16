import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import features from '@/features/Madness/data/features'
import Egg from '@/features/Madness/Eggs/Egg'

const FeatureList = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null)

  const totalItems = features.length
  const degreeInterval = 360 / totalItems

  // The carousel spins globally to align the current active element to the top position (0 degrees)
  const currentRotation = -(activeIndex * degreeInterval)

  // Fluid Loop Auto Rotation
  useEffect(() => {
    if (!isHovered) {
      autoRotateTimer.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalItems)
      }, 4200)
    }

    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current)
    }
  }, [isHovered, totalItems])

  // Nav Step Action Dispatchers
  const stepPrev = () =>
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  const stepNext = () => setActiveIndex((prev) => (prev + 1) % totalItems)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepNext()
      if (e.key === 'ArrowLeft') stepPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalItems])

  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center bg-black px-4 py-16 font-sans text-white antialiased select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Central Technical Studio Viewport Canvas */}
      <div className="relative flex size-[360px] flex-shrink-0 items-center justify-center overflow-visible rounded-full border border-white/5 bg-neutral-950/40 shadow-[0_0_100px_rgba(0,0,0,0.9)] backdrop-blur-3xl sm:size-[480px] lg:size-[540px]">
        {/* Outer Fine Hairline Ticker Loop Ring */}
        <div className="pointer-events-none absolute inset-[-20px] rounded-full border border-white/5" />
        {/* Outer Counter-Rotating Ticking Scale Drum */}
        <motion.div
          animate={{ rotate: -currentRotation * 0.4 }}
          className="pointer-events-none absolute inset-[-12px] scale-100 rounded-full border border-dashed border-[#3F5EFB]/20"
          transition={{ type: 'spring', stiffness: 45, damping: 18 }}
        />
        {/* 360-Degree Hairline Chrono Radial Tick Marks */}
        <div className="pointer-events-none absolute inset-[4px] opacity-15">
          <svg className="h-full w-full rotate-45" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="48"
              stroke="currentColor"
              strokeDasharray="1, 3.98"
              strokeWidth="0.2"
            />
          </svg>
        </div>
        {/* Inner Micro Segmented Index Gauge Ring */}
        <motion.div
          animate={{ rotate: currentRotation * 1.5 }}
          className="pointer-events-none absolute inset-[16px] rounded-full border border-double border-[#FC466B]/15"
          transition={{ type: 'spring', stiffness: 35, damping: 15 }}
        />
        {/* Technical Data Instrumentation Blueprint Layer */}
        <div className="pointer-events-none absolute inset-[32px] rounded-full border border-white/[0.03] opacity-40">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <line
              stroke="currentColor"
              strokeDasharray="2, 4"
              strokeWidth="0.1"
              x1="0"
              x2="100"
              y1="50"
              y2="50"
            />
            <line
              stroke="currentColor"
              strokeDasharray="2, 4"
              strokeWidth="0.1"
              x1="50"
              x2="50"
              y1="0"
              y2="100"
            />
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="38"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          </svg>
        </div>
        {/* Geometric Crosshair Alignment Guides */}
        <div className="pointer-events-none absolute inset-0 scale-95 rounded-full border border-white/[0.02]" />
        {/* ================= HIGH-PRECISION LOCKING RAY ================= */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: activeIndex * degreeInterval + currentRotation }}
            className="absolute h-[180px] w-[2px] origin-bottom -translate-y-1/2 bg-gradient-to-t from-[#3F5EFB] via-[#FC466B] to-transparent shadow-[0_0_20px_rgba(252,70,107,0.4)] sm:h-[240px] lg:h-[270px]"
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 14,
              mass: 0.8
            }}
          />
        </div>
        {/* ================= EMBEDDED CENTER DATA CORE DISPLAY ================= */}
        {/* Padding set to p-3 to maximize the interactive scrollable viewport radius area */}
        <div className="absolute z-30 flex size-[210px] flex-col items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/95 p-3 text-center shadow-[0_0_50px_rgba(0,0,0,0.95)] sm:size-[280px] sm:p-5 lg:size-[310px]">
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-black/50" />

          <AnimatePresence mode="wait">
            {(() => {
              const activeFeature = features[activeIndex]

              return activeFeature.blurb === "Eggs?" ? (
                <motion.div
                  key="embedded-egg"
                  animate={{ opacity: 1, scale: 1 }}
                  className="scale-75 text-white"
                  exit={{ opacity: 0, scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                >
                  <Egg id={4} />
                </motion.div>
              ) : (
                <motion.div
                  key={activeFeature.caption}
                  animate="visible"
                  className="relative flex h-full w-full flex-col items-center justify-center gap-1.5 pb-8 text-center sm:gap-2.5"
                  exit="exit"
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.015 },
                    },
                    exit: { opacity: 0, transition: { duration: 0.18 } },
                  }}
                >
                  {/* Micro Technical Data Stream Flag */}
                  <span className="shrink-0 bg-linear-to-r from-[#FC466B] to-[#3F5EFB] bg-clip-text font-mono text-[10px] font-bold tracking-[0.25em] text-transparent uppercase select-none">
                    NODE // 0{activeIndex + 1}
                  </span>

                  {/* Premium Swiss Center Title with Kinetic Letter Splits */}
                  <h1 className=" font-vt323 font-bold w-full max-w-[170px] shrink-0 flex-wrap justify-center overflow-hidden text-2xl leading-none tracking-wider text-white uppercase select-none sm:max-w-60">
                    {activeFeature.caption.split("").map((char, index) => (
                      <motion.span
                        key={`${char}-${index}`}
                        className="inline-block origin-bottom select-none"
                        variants={{
                          hidden: { y: "100%" },
                          visible: {
                            y: 0,
                            transition: {
                              type: "spring",
                              stiffness: 160,
                              damping: 13,
                            },
                          },
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </h1>

                  <div className="no-scrollbar pointer-events-auto w-full max-w-[155px] shrink pr-1 text-left sm:max-h-[120px] sm:max-w-[220px] sm:text-center lg:max-h-[140px] lg:max-w-60">
                    <p className="no-scrollbar font-sans text-[10px] leading-relaxed font-normal tracking-wide wrap-break-word whitespace-normal text-neutral-400 sm:text-[11px] lg:text-xs">
                      {activeFeature.blurb}
                    </p>
                  </div>

                  {/* ================= INTEGRATED NAVIGATION ARROWS ================= */}
                  <div className="pointer-events-none absolute mb-5 inset-x-0 bottom-0 flex shrink-0 items-center justify-between px-2 select-none sm:px-6">
                    {/* Left Step Trigger */}
                    <button
                      className="pointer-events-auto flex size-7 items-center justify-center rounded-full border border-white/10 bg-neutral-900/60 text-white/50 transition-all duration-300 outline-none hover:border-white hover:bg-white hover:text-black focus:outline-none sm:size-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        stepPrev();
                      }}
                    >
                      <svg
                        className="size-3 sm:size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>

                    {/* Fine Digital Separation Dot */}
                    <div className="size-1 rounded-full bg-white/20" />

                    {/* Right Step Trigger */}
                    <button
                      className="pointer-events-auto flex size-7 items-center justify-center rounded-full border border-white/10 bg-neutral-900/60 text-white/50 transition-all duration-300 outline-none hover:border-white hover:bg-white hover:text-black focus:outline-none sm:size-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        stepNext();
                      }}
                    >
                      <svg
                        className="size-3 sm:size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
        {/* ================= CONSTELLATION NODE RING ================= */}
        <motion.div
          animate={{ rotate: currentRotation }}
          className="absolute inset-0 h-full w-full rounded-full will-change-transform"
          transition={{ type: 'spring', stiffness: 70, damping: 15, mass: 1.1 }}
        >
          {features.map((feature, index) => {
            const isSelected = index === activeIndex
            const itemAngle = index * degreeInterval

            return (
              <div
                key={`swiss-chrono-node-${index}`}
                className="absolute top-0 left-1/2 -ml-6 origin-[24px_180px] sm:origin-[24px_240px] lg:origin-[24px_270px]"
                style={{
                  transform: `rotate(${itemAngle}deg) translateY(12px)`
                }}
              >
                <motion.button
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    borderColor: isSelected
                      ? '#FC466B'
                      : 'rgba(255,255,255,0.1)',
                    backgroundColor: isSelected ? '#FFFFFF' : '#000000',
                    color: isSelected ? '#3F5EFB' : '#FFFFFF',
                    boxShadow: isSelected
                      ? '0 0 35px rgba(252,70,107,0.35)'
                      : '0 0 0px transparent',
                    filter: isSelected
                      ? 'blur(0px)'
                      : isHovered
                        ? 'blur(1px)'
                        : 'blur(0px)'
                  }}
                  className="pointer-events-auto relative z-20 flex size-12 cursor-pointer items-center justify-center rounded-full border-2 shadow-2xl transition-colors duration-200 outline-none focus:outline-none"
                  onClick={() => setActiveIndex(index)}
                  style={{ rotate: -itemAngle - currentRotation }}
                  whileHover={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    scale: isSelected ? 1.25 : 1.08
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
                          ? 'url(#swiss-neon-gradient-core)'
                          : 'currentColor'
                      }
                    >
                      <defs>
                        <linearGradient
                          id="swiss-neon-gradient-core"
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
        </motion.div>
      </div>
    </div>
  )
}

export default FeatureList
