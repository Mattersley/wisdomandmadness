import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const lenis = new Lenis({
      eventsTarget: document.documentElement,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical'
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    let touchTimeout: NodeJS.Timeout | null = null
    let isTouchScrollPrevented = false

    const preventScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const preventScrollElement = target.closest('[data-prevent-scroll]')

      if (preventScrollElement) {
        touchTimeout = setTimeout(() => {
          isTouchScrollPrevented = true
          lenis.stop()
        }, 200)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTouchScrollPrevented) {
        e.preventDefault()
      }
    }

    const restartScroll = () => {
      if (touchTimeout) {
        clearTimeout(touchTimeout)
        touchTimeout = null
      }
      isTouchScrollPrevented = false
      lenis.start()
    }

    document.addEventListener('touchstart', preventScroll)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', restartScroll)
    document.addEventListener('touchcancel', restartScroll)

    return () => {
      if (touchTimeout) {
        clearTimeout(touchTimeout)
      }
      lenis.destroy()
      document.removeEventListener('touchstart', preventScroll)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', restartScroll)
      document.removeEventListener('touchcancel', restartScroll)
    }
  }, [])
}