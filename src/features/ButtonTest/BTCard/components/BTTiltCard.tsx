import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'

import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'

interface TiltCardProps {
  card: ProjectType;
  isActive: boolean;
  onSelect: (rect: DOMRect) => void;
}

const TiltCard = ({ card, onSelect, isActive }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15])
  const logoX = useTransform(x, [-0.5, 0.5], [-20, 20])
  const logoY = useTransform(y, [-0.5, 0.5], [-20, 20])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isActive) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      className="perspective-1000 h-full w-full rounded-3xl"
      onClick={() => {
        if (!isActive && cardRef.current) {
          handleMouseLeave()
          onSelect(cardRef.current.getBoundingClientRect())
        }
      }}
      ref={cardRef}
    >
      <motion.div
        animate={{
          rotateX: 0,
          rotateY: 0
        }}
        className="transform-style-3d relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-8"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          rotateX: isActive ? 0 : rotateX,
          rotateY: isActive ? 0 : rotateY
        }}
        transition={{
          duration: 2.5,
          ease: [0.76, 0, 0.24, 1]
        }}
      >
        {/* WHITE BASE LAYER */}
        <div className="absolute inset-0 bg-white" />

        {/* CARD IMAGE */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/Portfolio/Cards/${card.name}BG.png)`
          }}
        />

        {/* LOGO */}
        <motion.div
          animate={{
            opacity: isActive ? 0 : 1,
            scale: isActive ? 0.8 : 1
          }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6"
          style={{
            x: isActive ? 0 : logoX,
            y: isActive ? 0 : logoY
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          <img
            alt={card.image.alt}
            className="max-h-60 w-full translate-z-40 transform-gpu object-contain"
            src={`/images/Portfolio/Cards/${card.name}FG.png`}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TiltCard
