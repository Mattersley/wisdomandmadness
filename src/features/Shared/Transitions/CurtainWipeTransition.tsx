'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Variants } from 'motion'

interface CurtainWipeTransitionProps {
  /** The unique state key. When this changes, the transition triggers. */
  stateKey: string | number;
  children: ReactNode;
  /** Number of vertical curtain columns. More panels = more complex wave. */
  panelCount?: number;
  /** Color theme for the wiping panels */
  curtainColor?: string;
}

const curtainVariants: Variants = {
  hidden: {
    scaleY: 0
  },
  cover: (index: number) => ({
    scaleY: 1,
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1], // Custom fluid cubic-bezier
      delay: index * 0.05 // Staggered drop entry
    }
  }),
  reveal: (index: number) => ({
    scaleY: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.06 // Slightly slower staggered lift
    }
  })
}

export const CurtainWipeTransition = ({
  stateKey,
  children,
  panelCount = 4,
  curtainColor = 'bg-neutral-950'
}: CurtainWipeTransitionProps) => {
  // Dual-state strategy to keep old content visible during the cover phase
  const [displayContent, setDisplayContent] = useState<ReactNode>(children)
  const [isWiping, setIsWiping] = useState(false)
  const isInitialRender = useRef(true)

  // Track the actual panels array for mapping layout
  const panels = Array.from({ length: panelCount })

  useEffect(() => {
    // Skip triggering on the first mount
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    // Trigger the curtain drop phase
    setIsWiping(true)
  }, [stateKey])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Dynamic Content Presenter Layer */}
      <div className="w-full">{displayContent}</div>

      {/* OVERLAY CURTAIN SYSTEM */}
      <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full">
        <AnimatePresence mode="popLayout">
          {isWiping && (
            <div className="flex h-full w-full">
              {panels.map((_, index) => (
                <motion.div
                  key={index}
                  animate="cover"
                  className={`h-full flex-1 ${curtainColor} will-change-transform`}
                  custom={index}
                  exit="reveal"
                  initial="hidden"
                  onAnimationComplete={() => {
                    // Only use the last panel to manage state switches
                    if (index === panelCount - 1) {
                      // 1. Swap data out while screen is hidden
                      setDisplayContent(children)
                      // 2. Trigger the reverse "reveal" lift sequence
                      setIsWiping(false)
                    }
                  }}
                  style={{ originY: 0 }} // Wipe down from top edge
                  variants={curtainVariants}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CurtainWipeTransition
