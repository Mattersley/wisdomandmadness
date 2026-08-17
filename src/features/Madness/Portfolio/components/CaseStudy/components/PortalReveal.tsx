import { AnimatePresence, motion } from 'motion/react'
import { ProjectType } from '@/features/Madness/data/projects.types'

interface BTPortalRevealProps {
  card: ProjectType;
  rect: DOMRect;
  onComplete: () => void;
}

const PortalReveal = ({ card, rect, onComplete }: BTPortalRevealProps) => {
  const handleComplete = () => {
    onComplete()
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
    <AnimatePresence>
      <motion.div
        animate={{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }}
        className="pointer-events-none fixed inset-0 z-100 overflow-hidden bg-white"
        initial={{
          clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 24px)`
        }}
        onAnimationComplete={handleComplete}
        transition={{
          duration: 2.5,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/Portfolio/Cards/${card.name}BG.png)`
          }}
        />

        {/* Foreground Logo: Uses layoutId for vector flight animation */}
        <div className="pointer-events-none absolute inset-0 z-190 flex h-full flex-col justify-end p-16 select-none">
          <div
            className={`mt-auto w-full max-w-4xl ${
              card.infoPosition === 'right'
                ? 'ml-auto text-right'
                : card.infoPosition === 'center'
                  ? 'mx-auto text-center'
                  : 'text-left'
            }`}
          >
            <div
              className={`flex flex-col ${
                card.infoPosition === 'right'
                  ? 'items-end'
                  : card.infoPosition === 'center'
                    ? 'items-center'
                  : 'items-start'
              }`}
            >
              <span className="invisible mb-3 block font-mono text-xs tracking-widest uppercase">
                {'// CASE STUDY'}
              </span>

              <motion.img
                alt={card.image.alt}
                className={`w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${getLogoClasses(card.id)}`}
                layoutId={`logo-${card.id}`}
                src={`/images/Portfolio/Cards/${card.name}FG.png`}
                style={{
                  aspectRatio: `${card.image.width} / ${card.image.height}`
                }}
                transition={{
                  duration: 2.5,
                  ease: [0.76, 0, 0.24, 1]
                }}
              />

              <p className="invisible mt-6 max-w-2xl font-mono text-base leading-relaxed tracking-wide md:text-xl">
                {card.tagline}
              </p>

              <div className="invisible mt-12 flex w-full flex-col items-center gap-1 font-mono text-[10px] tracking-widest uppercase">
                <span>Scroll Down to Review</span>
                <div>↓</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PortalReveal
