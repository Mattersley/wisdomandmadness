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

type ActiveId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const CaseStudyPortal = ({
  activeCard,
  activeId,
  handleEject,
  vortexEase,
  onNavigate,
  slideDirection
}: CaseStudyPortalProps) => {
  const isLight = activeCard.theme === 'light'
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [activeId])

  const slideVariants = {
    initial: (direction: typeof slideDirection) => ({
      x: direction ? (direction === 'right' ? '100%' : '-100%') : 0,
      opacity: direction ? 1 : 0
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: typeof slideDirection) => ({
      x: direction ? (direction === 'right' ? '-100%' : '100%') : 0,
      opacity: direction ? 1 : 0
    })
  }

  const getLogoClasses = (activeId: ActiveId | number): string => {
    const classMap: Record<ActiveId, string> = {
      1: '-mx-70 -mt-20 -mb-30',
      2: 'size-78 -mx-50 -my-20',
      3: 'size-80 -mx-80 -mt-10 -mb-12',
      4: '-mx-50 -mt-7 -mb-28',
      5: 'size-90 -mx-70 -mt-10 -mb-26',
      6: 'size-100 -mx-50 -my-30',
      7: 'size-90 -mx-70 -my-10',
      8: 'size-80 -mx-70 -mt-12 -mb-20',
      9: 'size-60 -mx-70 -my-10 '
    }

    return classMap[activeId as ActiveId] || ''
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden rounded-b-3xl ${
        isLight ? 'text-neutral-950' : 'text-white'
      }`}
    >
      <motion.div
        animate={{ opacity: 1 }}
        className="pointer-events-auto absolute inset-0 h-screen w-screen overflow-y-auto rounded-b-3xl"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        ref={scrollContainerRef}
        transition={{ duration: 0.35 }}
      >
        <AnimatePresence
          custom={slideDirection}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={activeId}
            animate="animate"
            className={`absolute inset-0 flex min-h-screen w-full flex-col ${
              isLight ? 'bg-white' : 'bg-neutral-950'
            }`}
            custom={slideDirection}
            exit="exit"
            initial="initial"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            variants={slideVariants}
          >
            <div className="relative flex min-h-screen w-full shrink-0 flex-col justify-between rounded-b-3xl p-8 select-none md:p-16">
              <motion.div
                className="absolute inset-0 transform-gpu rounded-b-[2%] bg-cover bg-center"
                layoutId={`card-image-${activeId}`}
                style={{
                  backgroundImage: `url(/images/Portfolio/Cards/${activeCard.name}BG.png)`
                }}
                transition={{ duration: 0.85, ease: vortexEase }}
              />

              <div className="pointer-events-auto relative z-10 flex w-full items-center justify-between">
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

              <div
                className={`${activeCard.infoPosition === 'right' && 'ml-auto text-right'} relative z-10 mt-auto max-w-4xl rounded-3xl pt-24`}
              >
                <div
                  className={`${activeCard.infoPosition === 'right' && 'flex flex-col items-end'}`}
                >
                  <span
                    className={`mb-3 block font-mono text-xs tracking-widest uppercase ${
                      isLight ? 'text-neutral-900' : 'text-neutral-400'
                    }`}
                  >
                    // CASE STUDY
                  </span>

                  <motion.img
                    alt={activeCard.image.alt}
                    className={`w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${getLogoClasses(activeId)}`}
                    layoutId={`card-logo-${activeId}`}
                    src={`/images/Portfolio/Cards/${activeCard.name}FG.png`}
                    style={{
                      aspectRatio: `${activeCard.image.width} / ${activeCard.image.height}`
                    }}
                    transition={{ duration: 0.85, ease: vortexEase }}
                  />
                  <p
                    className={`mt-6 max-w-2xl font-mono text-base leading-relaxed tracking-wide md:text-xl ${
                      isLight ? 'text-neutral-900' : 'text-neutral-300'
                    }`}
                  >
                    {activeCard.tagline}
                  </p>

                  <div
                    className={`mt-12 flex flex-col items-start gap-2 font-mono text-[10px] tracking-widest uppercase ${
                      isLight ? 'text-neutral-800' : 'text-neutral-500'
                    }`}
                  >
                    <span>Scroll Down to Review</span>
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      className="mt-1 text-sm"
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut'
                      }}
                    >
                      <svg
                        fill="none"
                        height="14"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        width="14"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative shrink-0 px-8 py-24 select-text md:px-16 md:py-32 ${
                isLight ? 'bg-neutral-50' : 'bg-neutral-900'
              }`}
            >
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-3">
                <div
                  className={`space-y-8 border-l pl-6 font-mono text-xs tracking-wider ${
                    isLight
                      ? 'border-neutral-300 text-neutral-600'
                      : 'border-white/10 text-neutral-400'
                  }`}
                >
                  <div>
                    <h4
                      className={`mb-2 uppercase ${isLight ? 'text-neutral-900' : 'text-white'}`}
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
                      className={`mb-2 uppercase ${isLight ? 'text-neutral-900' : 'text-white'}`}
                    >
                      // STACK
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeCard.stack?.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded border px-2 py-1 text-[10px] ${
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
                    <div>
                      <h4
                        className={`mb-3 uppercase ${isLight ? 'text-neutral-900' : 'text-white'}`}
                      >
                        // LINKS
                      </h4>
                      <div className="flex flex-col gap-2.5">
                        {activeCard.urls.map((link, index) => (
                          <a
                            key={index}
                            className={`group flex items-center gap-3 rounded-lg border p-3 font-mono text-[11px] tracking-wide transition-all ${
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
                                (e.target as HTMLImageElement).src =
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
                </div>

                <div className="space-y-8 md:col-span-2">
                  <h2
                    className={`font-serif text-3xl font-light tracking-tight italic ${
                      isLight ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    Project Architecture Overviews
                  </h2>
                  <p
                    className={
                      isLight
                        ? 'font-mono text-sm leading-relaxed tracking-wide text-neutral-700'
                        : 'font-mono text-sm leading-relaxed tracking-wide text-neutral-400'
                    }
                  >
                    {activeCard.overview}
                  </p>
                  <p
                    className={
                      isLight
                        ? 'font-mono text-sm leading-relaxed tracking-wide text-neutral-700'
                        : 'font-mono text-sm leading-relaxed tracking-wide text-neutral-400'
                    }
                  >
                    By isolating key rendering blocks and binding structural
                    interactions into native hardware threads, we eliminated
                    layout recalculation overhead entirely. Every node
                    transition performs with crisp execution precision.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <div
                      className={`flex h-48 flex-col justify-end rounded-xl border p-6 font-mono text-[10px] tracking-widest text-neutral-500 uppercase ${
                        isLight
                          ? 'border-neutral-200 bg-white'
                          : 'border-white/5 bg-neutral-800/50'
                      }`}
                    >
                      <span
                        className={`mb-1 text-xl font-light italic ${isLight ? 'text-neutral-900' : 'text-white'}`}
                      >
                        01 / PERF
                      </span>
                      Lighthouse Matrix locked at 100%
                    </div>
                    <div
                      className={`flex h-48 flex-col justify-end rounded-xl border p-6 font-mono text-[10px] tracking-widest text-neutral-500 uppercase ${
                        isLight
                          ? 'border-neutral-200 bg-white'
                          : 'border-white/5 bg-neutral-800/50'
                      }`}
                    >
                      <span
                        className={`mb-1 text-xl font-light italic ${isLight ? 'text-neutral-900' : 'text-white'}`}
                      >
                        02 / EDGE
                      </span>
                      Zero-cold-start cloud delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default CaseStudyPortal
