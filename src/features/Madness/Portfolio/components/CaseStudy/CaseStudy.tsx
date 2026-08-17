import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, Easing } from 'motion/react'
import { ProjectType } from '@/features/Madness/data/projects.types'
import CaseStudyHeroControls from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyHeroControls'
import CaseStudyHeroMetadata from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyHeroMetadata'
import CaseStudyDetails from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/CaseStudyDetails'

interface CaseStudyPortalProps {
  activeCard: ProjectType;
  activeId: number;
  handleEject: () => void;
  vortexEase: Easing;
  onNavigate: (direction: 'prev' | 'next') => void;
  slideDirection: 'left' | 'right' | null;
}

// TODO: Dropdown Case Study Selector/Better Nav

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

      <CaseStudyHeroControls
        handleEject={handleEject}
        isLight={isLight}
        onNavigate={onNavigate}
      />
      <CaseStudyHeroMetadata
        activeCard={activeCard}
        activeId={activeId}
        getLogoClasses={getLogoClasses}
        isLight={isLight}
        slideDirection={slideDirection}
        slideVariants={slideVariants}
        vortexEase={vortexEase}
      />

      <div className="pointer-events-auto relative -z-10 w-full">
        <AnimatePresence
          custom={slideDirection}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={activeId}
            animate="animate"
            className={`relative -z-10 px-8 py-20 select-text md:px-16 ${
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
            <div className="mx-auto mt-10">
              <CaseStudyDetails activeCard={activeCard} isLight={isLight} />

              <div className="mx-auto mt-20 mb-10 max-w-5xl items-center justify-center space-y-8 text-center">
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
              </div>
            </div>
          </motion.div>
          <div className="relative -mt-14 rounded-t-3xl px-10 drop-shadow-xl">
            {activeCard.content && activeCard.content}
            <div className="absolute top-0 -z-10 h-full w-[calc(100%-80px)] rounded-t-3xl bg-white" />
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CaseStudy
