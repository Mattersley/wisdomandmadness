import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, Easing } from 'motion/react'
import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'

interface CaseStudyPortalProps {
  activeCard: ProjectType;
  activeId: number;
  handleEject: () => void;
  vortexEase: Easing;
  onNavigate: (direction: 'prev' | 'next') => void;
  slideDirection: 'left' | 'right' | null;
}

const CaseStudy = ({
  activeCard,
  activeId,
  handleEject,
  vortexEase,
  onNavigate,
  slideDirection
}: CaseStudyPortalProps) => {
  const isLight = activeCard.theme === 'light'
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior
    })
  }, [activeId])

  const slideVariants = {
    initial: (direction: 'left' | 'right' | null) => ({
      x: direction === 'right' ? '25%' : direction === 'left' ? '-25%' : 0,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right' | null) => ({
      x: direction === 'right' ? '-25%' : direction === 'left' ? '25%' : 0,
      opacity: 0
    })
  }

  const getLogoClasses = (id: number): string => {
    const classMap: Record<number, string> = {
      1: '-mx-70 -mt-20 -mb-30',
      2: 'size-78 -mx-50 -my-20',
      3: 'size-80 -mx-80 -mt-10 -mb-12',
      4: '-mx-50 -mt-7 -mb-28',
      5: 'size-90 -mx-70 -mt-10 mb-12',
      6: 'size-100 -mx-50 -my-30',
      7: 'size-90 -mx-70 -my-10',
      8: 'size-80 -mx-70 -mt-12 -mb-20',
      9: 'size-60 -mx-70 -my-10'
    }
    return classMap[id] || ''
  }

  return (
    <motion.div
      className={`no-scrollbar no-scrollbar-track no-scrollbar-thumb fixed inset-0 z-120 h-screen w-screen overflow-y-auto ${
        isLight ? 'bg-white text-neutral-950' : 'bg-neutral-950 text-white'
      }`}
      ref={scrollContainerRef}
    >
      <div
        className={`${isLight ? 'bg-white' : 'bg-neutral-950'} pointer-events-none fixed inset-0 -z-10`}
      />

      {/* HERO CONTROLS */}
      <div className="pointer-events-auto absolute top-0 right-0 left-0 z-200 flex w-full items-center justify-between p-8 md:p-16">
        <div className="flex gap-2">
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
              isLight
                ? 'border-black/10 bg-white/60 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                : 'border-white/10 bg-black/60 text-white hover:bg-white hover:text-black'
            }`}
            onClick={() => onNavigate('prev')}
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
              isLight
                ? 'border-black/10 bg-white/60 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                : 'border-white/10 bg-black/60 text-white hover:bg-white hover:text-black'
            }`}
            onClick={() => onNavigate('next')}
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button
          className={`rounded-full border px-8 py-3 font-mono text-xs tracking-widest uppercase shadow-lg backdrop-blur-xl transition-all ${
            isLight
              ? 'border-black/20 bg-white/60 text-neutral-900 hover:border-black hover:bg-black hover:text-white'
              : 'border-white/20 bg-black/60 text-white hover:border-white hover:bg-white hover:text-black'
          }`}
          onClick={handleEject}
        >
          RETURN
        </button>
      </div>

      {/* HERO METADATA */}
      <div
        className="pointer-events-none inset-0 z-190 -mt-2 flex h-screen flex-col justify-end rounded-b-3xl bg-cover p-16 select-none"
        style={{
          backgroundImage: `url(/images/Portfolio/Cards/${activeCard.name}BG.png)`
        }}
      >
        <AnimatePresence
          custom={slideDirection}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={activeId}
            animate="animate"
            className={`mt-auto w-full max-w-4xl ${
              activeCard.infoPosition === 'right'
                ? 'ml-auto text-right'
                : activeCard.infoPosition === 'center'
                  ? 'mx-auto text-center'
                  : 'text-left'
            }`}
            custom={slideDirection}
            exit="exit"
            initial="initial"
            transition={{
              duration: 2.5,
              ease: vortexEase
            }}
            variants={slideVariants}
          >
            <div
              className={`-mb-2 flex flex-col ${
                activeCard.infoPosition === 'right'
                  ? 'items-end'
                  : activeCard.infoPosition === 'center'
                    ? 'items-center'
                    : 'items-start'
              }`}
            >
              <span
                className={`mb-3 block font-mono text-xs tracking-widest uppercase ${isLight ? 'text-neutral-900' : 'text-neutral-400'}`}
              >
                // CASE STUDY
              </span>

              <motion.img
                alt={activeCard.image.alt}
                className={`w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${getLogoClasses(activeId)}`}
                src={`/images/Portfolio/Cards/${activeCard.name}FG.png`}
                style={{
                  aspectRatio: `${activeCard.image.width} / ${activeCard.image.height}`
                }}
                transition={{
                  duration: 2.5,
                  ease: vortexEase
                }}
              />

              <p
                className={`mt-6 max-w-2xl font-mono text-base leading-relaxed tracking-wide md:text-xl ${isLight ? 'text-neutral-900' : 'text-neutral-300'}`}
              >
                {activeCard.tagline}
              </p>
              <div
                className={`mt-12 flex w-full flex-col gap-1 font-mono text-[10px] tracking-widest uppercase ${
                  isLight ? 'text-neutral-800' : 'text-neutral-400'
                }`}
              >
                <span>Scroll Down to Review</span>

                <motion.div
                  animate={{
                    y: [0, -6, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut'
                  }}
                >
                  ↓
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOCUMENT BODY */}

      <div className="pointer-events-auto relative z-150 w-full">
        <AnimatePresence
          custom={slideDirection}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={activeId}
            animate="animate"
            className={`relative px-8 py-20 select-text md:px-16 ${
              isLight
                ? 'bg-neutral-50 text-neutral-950'
                : 'bg-neutral-900 text-white'
            }`}
            custom={slideDirection}
            exit="exit"
            initial="initial"
            transition={{
              duration: 2.5,
              ease: vortexEase
            }}
            variants={slideVariants}
          >
            <div className="mx-auto">
              {/* SIDE PANEL */}

              <div
                className={
                  'flex w-full flex-row justify-center gap-10 space-y-8 font-mono text-xs tracking-wider select-none'
                }
              >
                {' '}
                <div className="w-30">
                  <h4
                    className={`mb-2 uppercase ${
                      isLight ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    // SERVED
                  </h4>

                  <div className="flex flex-col gap-1">
                    {activeCard.served?.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4
                    className={`mb-2 uppercase ${
                      isLight ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    // STACK
                  </h4>

                  <div className="mt-3 flex w-60 flex-wrap gap-2">
                    {activeCard.stack?.map((tech) => (
                      <span
                        key={tech}
                        className={`cursor-alias rounded border px-2 py-1 text-[10px] hover:bg-gray-200 ${
                          isLight
                            ? 'border-neutral-200 bg-white text-neutral-800'
                            : 'border-white/5 bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {activeCard.urls && activeCard.urls.length > 0 && (
                  <div className="w-60">
                    <h4
                      className={`mb-3 uppercase ${
                        isLight ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      // LINKS
                    </h4>

                    <div className="flex flex-col gap-2.5">
                      {activeCard.urls.map((link, index) => (
                        <a
                          key={index}
                          className={`group flex w-50 items-center gap-3 rounded-lg border p-3 font-mono text-[11px] tracking-wide transition-all ${
                            isLight
                              ? 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50'
                              : 'border-white/5 bg-neutral-800/40 text-neutral-300 hover:border-white/20 hover:bg-neutral-800/80'
                          }`}
                          href={link.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <img
                            alt="favicon"
                            className="h-4 w-4 object-contain"
                            onError={(e) => {
                              e.currentTarget.src =
                                '/images/Portfolio/Cards/fallback-link.png'
                            }}
                            src={link.favi}
                          />

                          <span className="truncate group-hover:underline">
                            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeCard.colourPalettes && (
                  <div>
                    <h4
                      className={`mb-3 uppercase ${
                        isLight ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      // PALETTES
                    </h4>
                    <div className="mt-2 flex h-20 flex-col gap-3">
                      {activeCard.colourPalettes.pal && (
                        <div className="flex flex-row items-start gap-2 font-mono text-xs">
                          <p className="mt-1.5 text-[10px]">MAIN</p>
                          {activeCard.colourPalettes.pal.map((colour) => (
                            <div
                              key={colour}
                              className="group flex cursor-crosshair flex-col items-center gap-1"
                            >
                              <div
                                className={
                                  'h-6 w-18 rounded transition-all group-hover:h-18'
                                }
                                style={{
                                  background: colour
                                }}
                              />
                              {colour}
                            </div>
                          ))}
                        </div>
                      )}
                      {activeCard.colourPalettes.bg && (
                        <div className="flex flex-row items-start gap-2 font-mono text-xs">
                          <p className="mt-1.5 text-[10px]">GRAD</p>
                          {activeCard.colourPalettes.bg.map((colour) => (
                            <div
                              key={colour}
                              className="group flex cursor-crosshair flex-col items-center gap-1"
                            >
                              <div
                                className={
                                  'h-6 w-18 rounded transition-all group-hover:h-18'
                                }
                                style={{
                                  background: colour
                                }}
                              />
                              {colour}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* MAIN CONTENT */}

              <div className="mx-auto mt-20 max-w-5xl items-center justify-center space-y-8 text-center">
                <h2
                  className={`font-instrument text-3xl font-bold ${
                    isLight ? 'text-neutral-900' : 'text-white'
                  }`}
                >
                  Project Overview
                </h2>

                <p
                  className={`font-mono text-sm leading-relaxed tracking-wide ${
                    isLight ? 'text-neutral-700' : 'text-neutral-400'
                  }`}
                >
                  {activeCard.overview}
                </p>

                <p
                  className={`font-mono text-sm leading-relaxed tracking-wide ${
                    isLight ? 'text-neutral-700' : 'text-neutral-400'
                  }`}
                >
                  By isolating key rendering blocks and binding structural
                  interactions into native hardware threads, we eliminated
                  layout recalculation overhead entirely. Every node transition
                  performs with crisp execution precision.
                </p>
              </div>
            </div>
          </motion.div>
          {activeCard.content && activeCard.content}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CaseStudy
