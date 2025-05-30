'use client'

import React, { useEffect, useRef, useState } from 'react'
import './Cursor.css'
import { AnimatePresence, motion } from 'motion/react'
import useIsSSR from '@/hooks/useIsSSR'

interface CursorProps {
  helpMode: boolean;
}

// TODO: morph dot into arrows etc hovering over inputs
// TODO: tap/touch

const Cursor = ({ helpMode }: CursorProps) => {
  const isSSR = useIsSSR()
  const cursorVisible = useRef(false)
  const cursorEnlarged = useRef(false)
  const itemHasText = useRef(false)
  const cursorDotOutline = useRef<HTMLDivElement>(null)
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
  const requestRef: React.RefObject<number | undefined> = useRef(undefined)
  const previousTimeRef: React.RefObject<number | undefined> =
    useRef(undefined)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [width, setWidth] = useState(
    !isSSR && typeof window !== 'undefined' && window.innerWidth
  ) //TODO: change window !== undefined for SSR
  const [height, setHeight] = useState(
    !isSSR && typeof window !== 'undefined' && window.innerHeight
  ) //TODO: change window !== undefined for SSR
  const [cursorText, setCursorText] = useState({
    text: '',
    textSize: 0,
    color: '#ffffff'
  })
  const [helpModeOn, setHelpModeOn] = useState(true)

  useEffect(() => {
    setHelpModeOn(!helpMode)
  }, [helpMode])

  /** Mouse Moves */
  const onMouseMove = (event: MouseEvent) => {
    const { pageX: x, pageY: y } = event
    setMousePosition({ x, y })
    positionDot(event)
  }
  const onMouseEnter = () => {
    cursorVisible.current = true
    toggleCursorVisibility()
  }
  const onMouseLeave = () => {
    cursorVisible.current = false
    toggleCursorVisibility()
  }
  const onMouseDown = () => {
    cursorEnlarged.current = true
    toggleCursorSize()
  }
  const onMouseUp = () => {
    cursorEnlarged.current = false
    toggleCursorSize()
  }
  const onResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  let { x, y } = mousePosition
  const winDimensions = { width, height }
  let endX = (winDimensions.width as number) / 2
  let endY = (winDimensions.height as number) / 2

  /** Position Dot (cursor) */
  const positionDot = (e: MouseEvent) => {
    cursorVisible.current = true
    toggleCursorVisibility()
    toggleTextVisibility()
    // Position the dot
    endX = e.pageX
    endY = e.pageY
    cursorDot.current!.style.top = `${endY}px`
    cursorTextRef.current!.style.top = `${endY}px`
    cursorDot.current!.style.left = `${endX}px`
    cursorTextRef.current!.style.left = `${endX}px`
  }

  /** Toggle Cursor Visibility */
  const toggleCursorVisibility = () => {
    if (cursorVisible.current) {
      cursorDot.current!.style.opacity = String(1)
      cursorDotOutline.current!.style.opacity = String(1)
    } else {
      cursorDot.current!.style.opacity = String(0)
      cursorDotOutline.current!.style.opacity = String(0)
    }
  }

  const toggleTextVisibility = () => {
    if (helpModeOn) {
      cursorTextRef.current!.style.opacity = String(1)
      cursorTextRef.current!.style.transition = 'opacity 3s'
    } else {
      cursorTextRef.current!.style.opacity = String(0)
      cursorTextRef.current!.style.transition = 'opacity 3s'
    }
  }

  /** Toggle Cursor Size */
  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
      cursorDot.current!.style.transform = 'translate(-50%, -50%) scale(0.7)'
      cursorDotOutline.current!.style.transform =
        'translate(-50%, -50%) scale(7)'
    } else {
      cursorDot.current!.style.transform = 'translate(-50%, -50%) scale(1)'
      cursorDotOutline.current!.style.transform =
        'translate(-50%, -50%) scale(1)'
    }
  }

  /** Handle Links
   * Applies mouseover/out hooks on all links
   * to trigger cursor animation
   */
  const handleLinkHovers = () => {
    document
      .querySelectorAll('.cursor-hover-text, .cursor-expand')
      .forEach((el) => {
        el.addEventListener('mouseover', () => {
          cursorEnlarged.current = true
          toggleCursorSize()
        })
        el.addEventListener('mouseout', () => {
          cursorEnlarged.current = false
          toggleCursorSize()
        })
      })
  }

  const handleHoverText = () => {
    document.querySelectorAll('.cursor-hover-text').forEach((el) => {
      el.addEventListener('mouseover', () => {
        const textToDisplay = el.getAttribute('data-cursor-text')
        const textRepeats = el.getAttribute('data-text-repeats')
        const textSize = el.getAttribute('data-text-size')
        const textColor = el.getAttribute('data-text-color')
        itemHasText.current = true
        setCursorText({
          text: `${textToDisplay?.repeat(Number(textRepeats))} `,
          textSize: Number(textSize),
          color: String(textColor)
        })
      })
      el.addEventListener('mouseout', () => {
        itemHasText.current = false
        setCursorText({ text: '', textSize: 0, color: '#15151550' })
      })
    })
  }

  /**  Animate Dot Outline
   * Animates cursor outline with trailing effect. */
  const animateDotOutline = (time: number | undefined) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8
      y += (endY - y) / 8
      cursorDotOutline.current!.style.top = `${y}px`
      cursorDotOutline.current!.style.left = `${x}px`
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animateDotOutline)
  }

  /** Hooks */
  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    window.addEventListener('resize', onResize)
    requestRef.current = requestAnimationFrame(animateDotOutline)

    // Handle Link Hovers
    handleLinkHovers()
    handleHoverText()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(requestRef.current as number)
    }
  }, [])

  return (
    <div className="hidden md:block">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[100] size-[12px] -translate-x-1/2 -translate-y-1/2 opacity-50 transition-transform"
        id="cursor-dot-outline"
        ref={cursorDotOutline}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[100] size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#ffffff] transition-opacity"
        id="cursor-dot"
        ref={cursorDot}
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[100] size-20 -translate-x-1/2 -translate-y-1/2 cursor-text rounded-2xl font-mono text-xs transition-all"
        id="cursor-text"
        ref={cursorTextRef}
      >
        <AnimatePresence>
          {cursorText.text !== '' && (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <svg
                id="cursor-text-svg"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
          M 10, 30
          a 20,20 0 1,1 40,0
          a 20,20 0 1,1 -40,0
        "
                  fill="none"
                  id="circlePath"
                  stroke="none"
                  strokeWidth="0"
                />
                <text
                  color="#ffffff"
                  fill="#ffffff"
                  fontFamily="monospace"
                  fontSize={cursorText.textSize}
                  fontWeight="normal"
                  id="text"
                >
                  <textPath href="#circlePath" id="textPath">
                    {cursorText.text}
                  </textPath>
                </text>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Cursor
