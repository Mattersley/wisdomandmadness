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
      5: 'size-90 -mx-70 -mt-10 mb-12',
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
                transition={{ duration: 0.55, ease: vortexEase }}
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
                className={`${activeCard.infoPosition === 'right' && 'ml-auto text-right'} ${activeCard.infoPosition === 'center' && 'mx-auto text-center'} relative z-10 mt-auto max-w-4xl rounded-3xl pt-24`}
              >
                <div
                  className={`flex flex-col ${activeCard.infoPosition === 'right' && 'items-end'} ${activeCard.infoPosition === 'center' && 'items-center'} `}
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
                    transition={{ duration: 0.55, ease: vortexEase }}
                  />
                  <p
                    className={`mt-6 max-w-2xl font-mono text-base leading-relaxed tracking-wide md:text-xl ${
                      isLight ? 'text-neutral-900' : 'text-neutral-300'
                    }`}
                  >
                    {activeCard.tagline}
                  </p>

                  <div
                    className={`flex- mt-12 flex ${activeCard.infoPosition === 'center' ? 'items-center' : 'items-start'} gap-2 font-mono text-[10px] tracking-widest uppercase ${
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

                  <section className="grid grid-cols-1 gap-3 border-t border-current/10 py-20">
                    <div className="font-mono text-xs tracking-widest opacity-40">
                      // THE CONCEPTUAL ANCHOR
                    </div>
                    <div className="space-y-8 md:col-span-2">
                      <span className="rounded bg-current/10 px-2 py-1 font-mono text-[10px] tracking-widest uppercase">
                        Narrative Direction
                      </span>
                      <h3 className="mt-3 font-serif text-4xl leading-none font-light tracking-tight italic md:text-6xl">
                        "Controlled Chaos."
                      </h3>
                      <p className="max-w-2xl font-mono text-base leading-relaxed opacity-70 select-text">
                        To break the client out of a sterile corporate mold, we
                        constructed a visual sandbox built entirely on the
                        friction between brutalist grid structures and fluid,
                        organic motion. Every interaction is designed to feel
                        alive, deliberately disrupting the predictability of
                        standard layout rules to provoke user curiosity.
                      </p>
                    </div>
                  </section>

                  {/*<section className="grid grid-cols-1 gap-2 border-t border-current/10 py-16">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // THE BASELINE*/}
                  {/*  </div>*/}
                  {/*  <div className="space-y-6 md:col-span-2">*/}
                  {/*    <span className="rounded bg-current/10 px-2 py-1 font-mono text-[10px] tracking-widest uppercase">*/}
                  {/*      Market Displacement*/}
                  {/*    </span>*/}
                  {/*    <h3 className="mt-4 font-serif text-3xl leading-tight font-light tracking-tight italic md:text-5xl">*/}
                  {/*      "Shedding legacy visual weight to clear a path for*/}
                  {/*      unthrottled global scale."*/}
                  {/*    </h3>*/}
                  {/*    <p className="max-w-xl font-mono text-sm leading-relaxed opacity-60">*/}
                  {/*      The client entered the space as an industry titan*/}
                  {/*      shackled by fragmented visual standards. Our*/}
                  {/*      foundational directive was to isolate their core equity*/}
                  {/*      and rebuild their ecosystem entirely around high-density*/}
                  {/*      typography and instantaneous loading states.*/}
                  {/*    </p>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*<section className="grid grid-cols-1 gap-12 border-t border-current/10 py-20">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // ATMOSPHERIC BLUEPRINT*/}
                  {/*  </div>*/}
                  {/*  <div className="grid grid-cols-1 gap-12 font-mono md:col-span-2 md:grid-cols-2">*/}
                  {/*    <div className="space-y-4">*/}
                  {/*      <div className="text-xs opacity-40">*/}
                  {/*        A / CHROMATIC INTENTION*/}
                  {/*      </div>*/}
                  {/*      <p className="text-xs leading-relaxed opacity-70 select-text">*/}
                  {/*        We abandoned safe digital blues for an uncompromising*/}
                  {/*        high-contrast monochrome base paired with raw, tactile*/}
                  {/*        grain overlays. The palette draws heavy inspiration*/}
                  {/*        from mid-century editorial design and architectural*/}
                  {/*        concrete textures.*/}
                  {/*      </p>*/}
                  {/*    </div>*/}
                  {/*    <div className="space-y-4">*/}
                  {/*      <div className="text-xs opacity-40">*/}
                  {/*        B / TYPOGRAPHIC SENTIMENT*/}
                  {/*      </div>*/}
                  {/*      <p className="text-xs leading-relaxed opacity-70 select-text">*/}
                  {/*        Choosing a razor-sharp, oversized serif alongside*/}
                  {/*        micro-spaced mono fonts allowed us to create immediate*/}
                  {/*        editorial friction. The type choices communicate both*/}
                  {/*        classical authority and modern counter-culture design*/}
                  {/*        rules.*/}
                  {/*      </p>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*/!* THE FRICTION CORE *!/*/}
                  {/*<section className="grid grid-cols-1 gap-12 border-t border-current/10 py-16">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // THE FRICTION*/}
                  {/*  </div>*/}
                  {/*  <div className="grid grid-cols-1 gap-12 md:col-span-2 md:grid-cols-2">*/}
                  {/*    <div className="space-y-4">*/}
                  {/*      <div className="font-mono text-sm opacity-40">*/}
                  {/*        01 / THE BOTTLENECK*/}
                  {/*      </div>*/}
                  {/*      <p className="font-mono text-sm leading-relaxed text-balance">*/}
                  {/*        A multi-second time-to-interactive latency was causing*/}
                  {/*        a staggering 42% abandonment rate at critical*/}
                  {/*        transaction milestones. The legacy identity couldn't*/}
                  {/*        translate to modern WebGL canvas environments.*/}
                  {/*      </p>*/}
                  {/*    </div>*/}
                  {/*    <div className="space-y-4">*/}
                  {/*      <div className="font-mono text-sm opacity-40">*/}
                  {/*        02 / THE RE-ENGINEERING*/}
                  {/*      </div>*/}
                  {/*      <ul className="space-y-2 font-mono text-xs tracking-wider uppercase">*/}
                  {/*        <li className="flex items-center gap-2">*/}
                  {/*          → Sub-300ms Node Transits*/}
                  {/*        </li>*/}
                  {/*        <li className="flex items-center gap-2">*/}
                  {/*          → Vector-Isolated Monomarks*/}
                  {/*        </li>*/}
                  {/*        <li className="flex items-center gap-2">*/}
                  {/*          → Unified Hardware-Accelerated Scale*/}
                  {/*        </li>*/}
                  {/*      </ul>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*<section className="grid grid-cols-1 gap-12 border-t border-current/10 py-20">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // THE CHOREOGRAPHY LAYER*/}
                  {/*  </div>*/}
                  {/*  <div className="space-y-6 md:col-span-2">*/}
                  {/*    <h4 className="font-serif text-2xl tracking-tight italic">*/}
                  {/*      Designing Emotional Physics*/}
                  {/*    </h4>*/}
                  {/*    <p className="max-w-xl font-mono text-sm leading-relaxed opacity-70 select-text">*/}
                  {/*      Instead of uniform, snappy animations, we engineered*/}
                  {/*      custom cubic-bezier curves that mimic physical mass.*/}
                  {/*      Elements possess visual weight—they accelerate smoothly,*/}
                  {/*      glide over boundaries with a heavy damping effect, and*/}
                  {/*      warp slightly when dragged across canvas boundaries.*/}
                  {/*    </p>*/}
                  {/*    <div className="flex flex-wrap gap-3 pt-4 font-mono text-[9px] tracking-widest uppercase">*/}
                  {/*      <span className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5">*/}
                  {/*        Inertial Mouse Tracking*/}
                  {/*      </span>*/}
                  {/*      <span className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5">*/}
                  {/*        Dynamic Vector Distortion*/}
                  {/*      </span>*/}
                  {/*      <span className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5">*/}
                  {/*        Asymmetric Frame Staggering*/}
                  {/*      </span>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*/!* THE BLUEPRINT ENGINE *!/*/}
                  {/*<section className="grid grid-cols-1 gap-12 border-t border-current/10 py-16">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // SYSTEM INFRASTRUCTURE*/}
                  {/*  </div>*/}
                  {/*  <div className="space-y-16 md:col-span-2">*/}
                  {/*    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">*/}
                  {/*      <div className="space-y-3">*/}
                  {/*        <h4 className="font-serif text-xl italic">*/}
                  {/*          A. Kinetic Typography Systems*/}
                  {/*        </h4>*/}
                  {/*        <p className="font-mono text-xs leading-relaxed opacity-60">*/}
                  {/*          We established an uncompromising fluid typographic*/}
                  {/*          grid that recalculates tracking values based on*/}
                  {/*          viewport velocity, keeping the layout perfectly*/}
                  {/*          balanced during rapid mouse scrolls.*/}
                  {/*        </p>*/}
                  {/*      </div>*/}
                  {/*      <div className="space-y-3">*/}
                  {/*        <h4 className="font-serif text-xl italic">*/}
                  {/*          B. Micro-Interaction Layers*/}
                  {/*        </h4>*/}
                  {/*        <p className="font-mono text-xs leading-relaxed opacity-60">*/}
                  {/*          Every interactive block utilizes Framer Motion’s*/}
                  {/*          layoutId engine to anchor user focus, mimicking a*/}
                  {/*          native OS by transferring layouts flawlessly across*/}
                  {/*          page nodes.*/}
                  {/*        </p>*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*<section className="grid grid-cols-1 gap-12 border-t border-b border-current/10 py-20">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // THE CULTURAL ECHO*/}
                  {/*  </div>*/}
                  {/*  <div className="space-y-12 md:col-span-2">*/}
                  {/*    /!* Grid of Prestige Wins *!/*/}
                  {/*    <div className="grid grid-cols-3 gap-6">*/}
                  {/*      {[*/}
                  {/*        { metric: '#1', label: 'Product Hunt of the Day' },*/}
                  {/*        { metric: 'Site', label: 'of the Day / Awwwards' },*/}
                  {/*        { metric: '100%', label: 'Custom Asset Originality' }*/}
                  {/*      ].map((win, idx) => (*/}
                  {/*        <div*/}
                  {/*          key={idx}*/}
                  {/*          className={`rounded-xl border p-6 ${isLight ? 'border-neutral-200 bg-white' : 'border-white/5 bg-neutral-900'}`}*/}
                  {/*        >*/}
                  {/*          <div className="font-serif text-2xl font-bold tracking-tight italic">*/}
                  {/*            {win.metric}*/}
                  {/*          </div>*/}
                  {/*          <div className="mt-1 font-mono text-[9px] tracking-wider uppercase opacity-50">*/}
                  {/*            {win.label}*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*      ))}*/}
                  {/*    </div>*/}

                  {/*    <blockquote className="border-t border-dashed border-current/10 pt-8">*/}
                  {/*      <p className="font-serif text-xl leading-relaxed font-light italic opacity-90 select-text md:text-2xl">*/}
                  {/*        "They didn't just redesign our storefront—they built a*/}
                  {/*        digital artifact that completely transformed how our*/}
                  {/*        community identifies with us. It felt less like a*/}
                  {/*        product launch and more like a cultural event."*/}
                  {/*      </p>*/}
                  {/*      <cite className="mt-4 block font-mono text-[10px] tracking-widest uppercase not-italic opacity-40">*/}
                  {/*        — Creative Director / Launch Partner*/}
                  {/*      </cite>*/}
                  {/*    </blockquote>*/}
                  {/*  </div>*/}
                  {/*</section>*/}

                  {/*/!* THE LIGHTHOUSE MATRIX *!/*/}
                  {/*<section className="grid grid-cols-1 gap-12 border-t border-b border-current/10 py-16">*/}
                  {/*  <div className="font-mono text-xs tracking-widest opacity-40">*/}
                  {/*    // TELEMETRY VALIDATION*/}
                  {/*  </div>*/}
                  {/*  <div className="space-y-12 md:col-span-2">*/}
                  {/*    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">*/}
                  {/*      {[*/}
                  {/*        { value: '99%', label: 'Core Web Vitals' },*/}
                  {/*        { value: '-1.8s', label: 'Interactive Delay' },*/}
                  {/*        { value: '+210%', label: 'Session Duration' },*/}
                  {/*        { value: '0.0', label: 'Layout Shifts' }*/}
                  {/*      ].map((stat, i) => (*/}
                  {/*        <div*/}
                  {/*          key={i}*/}
                  {/*          className={`rounded-xl border p-6 ${isLight ? 'border-neutral-200 bg-white' : 'border-white/5 bg-neutral-900'}`}*/}
                  {/*        >*/}
                  {/*          <div className="font-mono text-3xl font-bold tracking-tighter md:text-4xl">*/}
                  {/*            {stat.value}*/}
                  {/*          </div>*/}
                  {/*          <div className="mt-1 font-mono text-[9px] tracking-widest uppercase opacity-40">*/}
                  {/*            {stat.label}*/}
                  {/*          </div>*/}
                  {/*        </div>*/}
                  {/*      ))}*/}
                  {/*    </div>*/}

                  {/*    <blockquote className="border-t border-dashed border-current/10 pt-6">*/}
                  {/*      <p className="font-serif text-xl leading-relaxed font-light italic opacity-80">*/}
                  {/*        "The absolute engineering precision delivered by the*/}
                  {/*        agency completely redefined how our engineering layers*/}
                  {/*        coordinate design parameters. A masterpiece of web*/}
                  {/*        architecture."*/}
                  {/*      </p>*/}
                  {/*      <cite className="mt-4 block font-mono text-[10px] tracking-widest uppercase not-italic opacity-50">*/}
                  {/*        — Head of Platform Architecture*/}
                  {/*      </cite>*/}
                  {/*    </blockquote>*/}
                  {/*  </div>*/}
                  {/*</section>*/}
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
