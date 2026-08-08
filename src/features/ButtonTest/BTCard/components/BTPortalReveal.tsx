import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'

interface BTPortalRevealProps {
  card: ProjectType;
  rect: DOMRect;
  onComplete: () => void;
}

const BTPortalReveal = ({ card, rect, onComplete }: BTPortalRevealProps) => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    requestAnimationFrame(() => {
      setOpen(true)
    })
  }, [])

  const handleComplete = () => {
    setVisible(false)
    onComplete()
  }

  if (!visible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        animate={
          open
            ? {
                clipPath: 'inset(0px 0px 0px 0px round 0px)'
              }
            : undefined
        }
        className="fixed inset-0 z-100 overflow-hidden bg-white"
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
      </motion.div>
    </AnimatePresence>
  )
}

export default BTPortalReveal
