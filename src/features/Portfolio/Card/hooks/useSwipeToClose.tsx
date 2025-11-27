import { useRef } from 'react'

const useSwipeToClose = (closingThreshold: number, isActive: boolean, onTrigger: () => void) => {
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    currentY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isActive) return

    currentY.current = e.touches[0].clientY
    const diff = currentY.current - startY.current
    if (diff > closingThreshold) {
      onTrigger()
    }
  }

  return { handleTouchStart, handleTouchMove }
}

export default useSwipeToClose