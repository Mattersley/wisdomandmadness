import { AnimatePresence, Easing, motion } from 'motion/react'
import { ProjectType } from '@/features/Madness/data/projects.types'
import { Variants } from 'motion'

interface CaseStudyHeroMetadataProps {
  activeCard: ProjectType;
  activeId: number;
  getLogoClasses: (id: number) => string;
  isLight: boolean;
  slideDirection: 'right' | 'left' | null;
  slideVariants: Variants;
  vortexEase: Easing;
}

const CaseStudyHeroMetadata = ({
  activeCard,
  activeId,
  getLogoClasses,
  isLight,
  slideDirection,
  slideVariants,
  vortexEase
}: CaseStudyHeroMetadataProps) => {
  return (
    <div
      className="pointer-events-none inset-0 z-190 -mt-2 -mb-7 flex h-screen flex-col justify-end rounded-b-3xl bg-cover p-16 shadow-2xl select-none"
      style={{
        backgroundImage: `url(/images/Portfolio/Cards/${activeCard.name}BG.png)`
      }}
    >
      <AnimatePresence custom={slideDirection} initial={false} mode="popLayout">
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
  )
}

export default CaseStudyHeroMetadata
