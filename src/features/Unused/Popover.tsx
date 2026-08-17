'use client'

import React, { useState, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverColour = 'neutral' | 'white' | 'fuchsia' | 'amber' | 'blue';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
  colour?: PopoverColour;
}

const getVariants = (position: PopoverPosition): Variants => {
  const offsets = {
    top: { y: -8, x: '-50%' },
    bottom: { y: 8, x: '-50%' },
    left: { x: '-50%', y: '-50%' },
    right: { x: '50%', y: '-50%' }
  }

  return {
    hidden: { opacity: 0, scale: 0.95, ...offsets[position] },
    visible: {
      opacity: 1,
      scale: 1,
      x: position === 'left' || position === 'right' ? '0%' : '-50%',
      y: position === 'top' || position === 'bottom' ? '0%' : '-50%',
      transition: { type: 'spring', damping: 18, stiffness: 350 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x:
        position === 'left' || position === 'right'
          ? position === 'left'
            ? '-4px'
            : '4px'
          : '-50%',
      y:
        position === 'top' || position === 'bottom'
          ? position === 'top'
            ? '-4px'
            : '4px'
          : '-50%',
      transition: { duration: 0.12, ease: 'easeOut' }
    }
  }
}

const Popover = ({
  trigger,
  children,
  position = 'bottom',
  colour = 'neutral'
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 mb-3 origin-bottom',
    bottom: 'top-full left-1/2 mt-3 origin-top',
    left: 'right-full top-1/2 mr-3 origin-right',
    right: 'left-full top-1/2 ml-3 origin-left'
  }

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 rotate-45 border-r border-b',
    bottom: '-top-1.5 left-1/2 -translate-x-1/2 rotate-45 border-l border-t',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 rotate-45 border-r border-t',
    right: '-left-1.5 top-1/2 -translate-y-1/2 rotate-45 border-l border-b'
  }

  // 1. Updated structural theme mappings with the white layout configuration option
  const themeClasses = {
    neutral: 'bg-neutral-900 border-neutral-800 text-white',
    white: 'bg-white border-neutral-200 text-neutral-900',
    fuchsia: 'bg-fuchsia-950 border-fuchsia-700 text-fuchsia-100',
    amber: 'bg-amber-950 border-amber-700 text-amber-100',
    blue: 'bg-blue-950 border-blue-700 text-blue-100'
  }

  const arrowThemeClasses = {
    neutral: 'bg-neutral-900 border-neutral-800',
    white: 'bg-white border-neutral-200',
    fuchsia: 'bg-fuchsia-950 border-fuchsia-700',
    amber: 'bg-amber-950 border-amber-700',
    blue: 'bg-blue-950 border-blue-700'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="inline-flex cursor-pointer">{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="visible"
            className={`absolute z-50 w-max max-w-sm rounded-xl border p-3 text-sm shadow-2xl shadow-black/40 ${positionClasses[position]} ${themeClasses[colour]}`}
            exit="exit"
            initial="hidden"
            variants={getVariants(position)}
          >
            <div
              aria-hidden="true"
              className={`absolute size-3 ${arrowClasses[position]} ${arrowThemeClasses[colour]}`}
            />

            <div className="relative z-10 font-sans tracking-wide">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Popover
