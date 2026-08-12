import { useState } from 'react'

const useBTCardGestures = (
  isCurrentCard: boolean,
  handlers: {
    onClick: () => void;
    onPointerEnter: (e: React.TouchEvent) => void;
    onPointerLeave: () => void;
    onPointerMove: (e: React.TouchEvent) => void;
  }
) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchStartTime, setTouchStartTime] = useState<number>(0)
  const [pullDistance, setPullDistance] = useState(0)
  const pullThreshold = 100
  const longPressThreshold = 200

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCurrentCard) {
      handlers.onPointerEnter(e)
      return
    }
    setTouchStart(e.touches[0].clientY)
    setTouchStartTime(Date.now())
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isCurrentCard) {
      handlers.onPointerMove(e)
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
      handlers.onPointerLeave()
      if (Date.now() - touchStartTime < longPressThreshold) {
        handlers.onClick()
      }
      return
    }

    // Reset states
    setTouchStart(null)
    setTouchStartTime(0)
    setPullDistance(0)
  }

  return {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    pullDistance,
    pullThreshold
  }
}

export default useBTCardGestures
