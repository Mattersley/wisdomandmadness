import use3DCard from '@/features/Portfolio/Card/hooks/use3DCard'
import { motion } from 'motion/react'
import React, { SetStateAction } from 'react'
import useCardGestures from '@/features/Portfolio/Card/hooks/useCardGestures'

interface CardContainerProps {
  children: React.ReactNode;
  current: string;
  name: string;
  setClosing: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<string>>;
}

const CardContainer = ({
  children,
  current,
  name,
  setClosing,
  setCurrent
}: CardContainerProps) => {
  const {
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    rotateX,
    rotateY,
    scale
  } = use3DCard({ cardRotation: 30, cardScale: 1.1, off: current !== '' })

  const isCurrentCard = current === name

  const handleClick = () => {
    if (current === '') {
      setCurrent(name)
    }
    setClosing(false)
  }

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    pullDistance,
    pullThreshold
  } = useCardGestures(isCurrentCard, {
    onClick: handleClick,
    onClose: () => {
      setClosing(true)
      setCurrent('')
    },
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerMove: handlePointerMove
  })

  return (
    <motion.div
      className={'shadow-xl flex [touch-action: none] flex-col rounded-xl h-40 w-72 sm:h-32 sm:w-60 md:h-40 md:w-72'}
      layout
      onClick={handleClick}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onMouseMove={handlePointerMove}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
        ...(isCurrentCard && {
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance ? 'none' : 'transform 0.3s ease'
        })
      }}
      whileHover={isCurrentCard ? { scale: 1 } : { scale: 1.05 }}
      whileTap={isCurrentCard ? { scale: 1 } : { scale: 0.8 }}
    >
      {children}
      {isCurrentCard && pullDistance > 0 && (
        <div
          className="absolute left-0 right-0 top-0 flex justify-center text-gray-400 text-sm"
          style={{
            opacity: Math.min(pullDistance / pullThreshold, 1)
          }}
        >
          Pull down to close
        </div>
      )}
    </motion.div>
  )
}

export default CardContainer