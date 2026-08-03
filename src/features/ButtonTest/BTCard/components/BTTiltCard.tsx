import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'

interface TiltCardProps {
  card: ProjectType;
  isActive: boolean;
  onSelect: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const TiltCard = ({ card, onSelect, isActive }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
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
      onClick={(e) => !isActive && onSelect(e)}
    >
      <motion.div
        className={`transform-style-3d relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl p-8 shadow-2xl ${
          isActive ? 'pointer-events-none' : 'cursor-pointer'
        }`}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={cardRef}
        style={{ rotateX, rotateY }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 transform-gpu rounded-3xl bg-cover bg-center brightness-75 contrast-125"
          layoutId={`card-image-${card.id}`}
          style={{
            backgroundImage: `url(/images/Portfolio/Cards/${card.name}BG.png)`
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl p-6 select-none"
          style={{ x: logoX, y: logoY }}
        >
          <motion.img
            alt={card.image.alt}
            className="max-h-60 w-full translate-z-40 rounded-3xl object-contain"
            layoutId={`card-logo-${card.id}`}
            src={`/images/Portfolio/Cards/${card.name}FG.png`}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TiltCard
