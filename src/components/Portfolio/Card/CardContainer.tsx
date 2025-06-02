import use3DCard from '@/hooks/use3DCard'
import { motion } from 'motion/react'
import { SetStateAction, useRef, useState } from 'react'

interface CardContainerProps {
  children: React.ReactNode;
  closing: boolean;
  current: string;
  name: string;
  setClosing: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<string>>;
}

const CardContainer = ({
  children,
  closing,
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

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchStartTime, setTouchStartTime] = useState<number>(0)
  const [pullDistance, setPullDistance] = useState(0)
  const isCurrentCard = current === name
  const pullThreshold = 100 // Amount of pixels to pull down before closing
  const longPressThreshold = 200 // ms threshold for long press

  const handleClick = () => {
    if (current === '') {
      setCurrent(name)
    }
    setClosing(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCurrentCard) {
      handlePointerEnter(e)
      return
    }
    setTouchStart(e.touches[0].clientY)
    setTouchStartTime(Date.now())
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isCurrentCard) {
      handlePointerMove(e)
      return
    }

    if (touchStart !== null) {
      const currentY = e.touches[0].clientY
      const difference = currentY - touchStart
      const touchDuration = Date.now() - touchStartTime
      
      // Only allow pulling down after long press threshold
      if (difference > 0 && touchDuration > longPressThreshold) {
        setPullDistance(difference)
        e.preventDefault() // Prevent scroll only when pulling down after long press
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isCurrentCard) {
      handlePointerLeave()
      if (Date.now() - touchStartTime < longPressThreshold) {
        handleClick()
      }
      return
    }

    if (pullDistance > pullThreshold) {
      setClosing(true)
      setCurrent('')
    }
    
    // Reset states
    setTouchStart(null)
    setTouchStartTime(0)
    setPullDistance(0)
  }

  return (
    <motion.div
      className={`relative flex [touch-action: none] h-40 w-72 flex-col rounded-xl shadow-lg sm:h-32 sm:w-60 md:h-40 md:w-72  ${isCurrentCard && 'z-0'}`}
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