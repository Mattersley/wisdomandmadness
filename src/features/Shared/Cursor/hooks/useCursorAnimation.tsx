import {
  RefObject,
  useCallback,
  useEffect,
  useRef
} from 'react'

const useCursorAnimation = (
  cursorCoordinatesRef: RefObject<{ x: number; y: number }>,
  mousePositionRef: RefObject<{ x: number; y: number }>,
  cursorDotOutlineRef: RefObject<HTMLDivElement | null>
) => {
  const requestRef = useRef<number>(undefined)
  const previousTimeRef = useRef<number>(undefined)

  const animateDotOutline = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const {x: targetX, y: targetY} = mousePositionRef.current
        const {x: currentX, y: currentY} = cursorCoordinatesRef.current

        // Smooth ease-out animation
        const newX = currentX + (targetX - currentX) / 8
        const newY = currentY + (targetY - currentY) / 8

        cursorCoordinatesRef.current = {x: newX, y: newY}

        if (cursorDotOutlineRef.current) {
          cursorDotOutlineRef.current.style.top = `${newY}px`
          cursorDotOutlineRef.current.style.left = `${newX}px`
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateDotOutline)
    },
    [cursorCoordinatesRef, cursorDotOutlineRef, mousePositionRef]
  )

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateDotOutline)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [animateDotOutline])
}

export default useCursorAnimation