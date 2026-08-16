'use client'

import React, {
  useState,
  useRef,
  ReactNode,
  MouseEvent as ReactMouseEvent
} from 'react'
import {
  motion,
  AnimatePresence,
  Variants,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react'

export type BloboverPosition = 'top' | 'bottom' | 'left' | 'right';
export type BloboverColour =
  | 'black'
  | 'white'
  | 'electric-blue'
  | 'rose'
  | 'indigo';

interface BloboverProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: BloboverPosition;
  colour?: BloboverColour;
  /** Controls the bounce resistance. Lower values increase the springiness. */
  damping?: number;
}

const getVariants = (position: BloboverPosition): Variants => {
  const offsets = {
    top: { y: 0, x: '-50%', scaleY: 0.1, scaleX: 0.3 },
    bottom: { y: 0, x: '-50%', scaleY: 0.1, scaleX: 0.3 },
    left: { x: 0, y: '-50%', scaleX: 0.1, scaleY: 0.3 },
    right: { x: 0, y: '-50%', scaleX: 0.1, scaleY: 0.3 }
  }

  return {
    hidden: { opacity: 0, ...offsets[position] },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      x: position === 'left' || position === 'right' ? '0%' : '-50%',
      y: position === 'top' || position === 'bottom' ? '0%' : '-50%',
      transition: { type: 'spring', damping: 14, stiffness: 220, mass: 0.8 }
    },
    exit: {
      opacity: 0,
      scaleY: position === 'top' || position === 'bottom' ? 0.2 : 0.8,
      scaleX: position === 'left' || position === 'right' ? 0.2 : 0.8,
      transition: { duration: 0.2, ease: 'backIn' }
    }
  }
}

export const Blobover = ({
  trigger,
  children,
  position = 'bottom',
  colour = 'black',
  damping = 15
}: BloboverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const bloboverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping, stiffness: 150, mass: 0.6 }
  const magneticX = useSpring(mouseX, springConfig)
  const magneticY = useSpring(mouseY, springConfig)

  // const rawProgress = useTransform(magneticX, (val) => Math.abs(val) * 0.1)
  // const safeBlur = useTransform(
  //   rawProgress,
  //   (v) => `blur(${Math.max(0, v)}px)`
  // )

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!triggerRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } =
      triggerRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    mouseX.set((clientX - centerX) * 0.35)
    mouseY.set((clientY - centerY) * 0.35)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    bloboverTimeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }

  const handleMouseEnter = () => {
    if (bloboverTimeoutRef.current) clearTimeout(bloboverTimeoutRef.current)
    setIsOpen(true)
  }

  // Locates the underlying child node inside the trigger wrapper and simulates a matching click event
  const handlePopoverClick = (e: ReactMouseEvent) => {
    if (!triggerRef.current) return

    // Finds any nested native button, anchor link, or interactive node inside your trigger prop
    const actionableElement = triggerRef.current
      .firstElementChild as HTMLElement | null

    if (actionableElement) {
      actionableElement.click()
    } else {
      // Fallback: fires directly on the trigger wrapper container if no inner element is found
      triggerRef.current.click()
    }
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 mb-1 origin-bottom',
    bottom: 'top-full left-1/2 mt-1 origin-top',
    left: 'right-full top-1/2 mr-1 origin-right',
    right: 'left-full top-1/2 ml-1 origin-left'
  }

  const themeClasses = {
    black: 'bg-neutral-950 text-neutral-200 border-neutral-800',
    white: 'bg-white text-neutral-950 border-neutral-100',
    'electric-blue':
      'bg-blue-500 text-white border-blue-500 selection:bg-white selection:text-blue-500',
    rose: 'bg-rose-500 text-white border-rose-500 selection:bg-white selection:text-rose-500',
    indigo:
      'bg-indigo-500 text-white border-indigo-500 selection:bg-white selection:text-indigo-500'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ filter: 'url(#awwwards-gooey-pipeline)' }}
    >
      <motion.div
        className="inline-flex cursor-pointer"
        ref={triggerRef}
        style={{ x: magneticX, y: magneticY }}
      >
        {trigger}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="visible"
            className={`absolute z-50 w-max max-w-xs cursor-pointer rounded-4xl border p-5 text-xs font-medium shadow-2xl backdrop-blur-md ${positionClasses[position]} ${themeClasses[colour]}`}
            exit="exit"
            initial="hidden"
            onClick={handlePopoverClick}
            variants={getVariants(position)}
          >
            <div className="relative z-10 font-mono leading-relaxed tracking-widest uppercase">
              {children}
            </div>

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute size-0"
            >
              <defs>
                <filter id="awwwards-gooey-pipeline">
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="6"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    result="goo"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blobover
