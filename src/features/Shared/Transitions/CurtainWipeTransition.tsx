'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Variants } from 'motion'

interface CurtainWipeTransitionProps {
  children: ReactNode;
  panelCount?: number;
  curtainColor?: string;
  triggerKey?: string | number;
}

const curtainVariants: Variants = {
  hidden: {
    scaleY: 0
  },
  cover: (index: number) => ({
    scaleY: 1,
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.05 // Staggered drop down entry
    }
  }),
  reveal: (index: number) => ({
    scaleY: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.06 // Staggered wipe up exit (Guaranteed to fire now!)
    }
  })
}

export const CurtainWipeTransition = ({
  children,
  panelCount = 4,
  curtainColor = 'bg-neutral-950',
  triggerKey = ''
}: CurtainWipeTransitionProps) => {
  const pathname = usePathname()

  const [displayContent, setDisplayContent] = useState<ReactNode>(children)
  const [isCovered, setIsCovered] = useState(false)

  const isInitialRender = useRef(true)
  const pendingContent = useRef<ReactNode>(children)

  useEffect(() => {
    pendingContent.current = children
  }, [children])

  // Watch for route or key updates to trigger the drop
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    setIsCovered(true)
  }, [pathname, triggerKey])

  const panels = Array.from({ length: panelCount })

  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-full">{displayContent}</div>

      <div className="pointer-events-none absolute inset-0 z-50 flex h-full w-full">
        <AnimatePresence>
          {isCovered && (
            <div className="flex h-full w-full">
              {panels.map((_, index) => (
                <motion.div
                  key={index}
                  animate="cover"
                  className={`h-full flex-1 ${curtainColor} will-change-transform`}
                  custom={index}
                  exit="reveal"
                  initial="hidden"
                  onAnimationComplete={(definition) => {
                    // Only process on the absolute last panel
                    if (index === panelCount - 1) {
                      // If it just finished the "cover" animation
                      if (definition === 'cover') {
                        // 1. Swap the underlying content safely while screen is hidden
                        setDisplayContent(pendingContent.current)
                        // 2. Unmount the curtain completely to force the exit "reveal" stagger
                        setIsCovered(false)
                      }
                    }
                  }}
                  style={{ originY: 0 }} // Wipe down from top on enter
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
