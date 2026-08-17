'use client'

import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'
import { Variants } from 'motion/react'

interface EggCounterProps {
  orientation?: 'horizontal' | 'vertical';
}

const EggCounter = ({ orientation = 'horizontal' }: EggCounterProps) => {
  const { eggs, resetEggCount } = useContext(EggContext)
  const [isPulsing, setIsPulsing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Keep track of the previous egg count to detect increments safely
  const prevCountRef = useRef(eggs.eggs)

  useEffect(() => {
    // Only trigger the pulse animation if the count actually increased
    if (eggs.eggs > prevCountRef.current && eggs.eggs > 0) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 1000)

      // Update ref to current count
      prevCountRef.current = eggs.eggs
      return () => clearTimeout(timer)
    }

    // Sync ref if count decreases or resets
    prevCountRef.current = eggs.eggs
  }, [eggs.eggs])

  const foundCount = eggs.eggList.filter((e) => e.found).length
  const isHorizontal = orientation === 'horizontal'

  const blobVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleY: isHorizontal ? 0.3 : 0.1,
      scaleX: isHorizontal ? 0.1 : 0.3
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: { type: 'spring', damping: 14, stiffness: 220, mass: 0.8 }
    },
    exit: {
      opacity: 0,
      scaleY: isHorizontal ? 0.8 : 0.2,
      scaleX: isHorizontal ? 0.2 : 0.8,
      transition: { duration: 0.2, ease: 'backIn' }
    }
  }

  return (
    <div
      className={`fixed z-50 flex items-end ${isHorizontal ? 'right-0 bottom-0' : 'right-6 bottom-6 flex-col'}`}
    >
      <AnimatePresence>
        {eggs.eggs > 0 && (
          <motion.div
            animate="visible"
            className={`relative flex items-center rounded-tl-3xl bg-yellow-500 p-4 text-white shadow-2xl select-none ${isHorizontal ? 'flex-row' : 'flex-col-reverse'} ${isPulsing ? 'animate-pulse' : ''}`}
            exit="exit"
            initial="hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={blobVariants}
          >
            {/* Collapsed Metric indicator or Expanded view */}
            <motion.div
              animate={{
                width: isHorizontal ? (isHovered ? 'auto' : '42px') : 'auto',
                height: isHorizontal ? 'auto' : isHovered ? 'auto' : '42px'
              }}
              className={`relative z-10 flex items-center overflow-hidden ${isHorizontal ? 'flex-row' : 'flex-col'}`}
              transition={{
                type: 'spring',
                damping: 14,
                stiffness: 220,
                mass: 0.8
              }}
            >
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase ${isHovered ? 'mr-4' : 'mr-0'} ${
                  isHorizontal ? 'flex-row pr-1' : 'flex-col pb-1'
                }`}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isHovered && (
                  <div className="group">
                    <div className="absolute top-2 left-10 z-10 mb-2 hidden w-74 rounded bg-yellow-800 px-2 py-1 text-center text-xs text-white shadow-lg transition-all group-hover:block">
                      BREAK ALL THE EGGS
                    </div>
                    <button
                      aria-label="Reset eggs"
                      className="relative z-20 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-red-500 transition-colors hover:text-white"
                      data-tip="RESET"
                      onClick={(e) => {
                        e.stopPropagation()
                        resetEggCount()
                      }}
                    >
                      <svg
                        fill="none"
                        height="32"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.927 17.934c-1.211 1.858 -3.351 2.953 -5.927 3.066c-4.2 0 -7 -2.763 -7 -6.917c0 -2.568 .753 -5.14 1.91 -7.158" />
                        <path d="M8.642 4.628c1.034 -1.02 2.196 -1.63 3.358 -1.628c3.5 .007 7 5.545 7 11.083c0 .298 -.015 .587 -.045 .868" />
                        <path d="M3 3l18 18" />
                      </svg>
                    </button>
                  </div>
                )}
                {isHovered &&
                  eggs.eggList.map((egg) => (
                    <div key={egg.name} className="flex items-center">
                      {egg.found ? (
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-600/40 text-white">
                          <svg
                            fill="currentColor"
                            height="28"
                            viewBox="0 0 24 24"
                            width="28"
                            xmlns="http://w3.org"
                          >
                            <path d="M19 14.083c0 4.154-2.966 6.74-7 6.917-4.2 0-7-2.763-7-6.917c0-5.538 3.5-11.09 7-11.083c3.5.007 7 5.545 7 11.083z" />
                          </svg>
                          <p className="absolute font-mono text-[10px] font-black text-yellow-600">
                            {egg.id + 1}
                          </p>
                        </div>
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-yellow-600/10 bg-yellow-600/20 font-mono text-base font-bold text-yellow-700/60">
                          ?
                        </div>
                      )}
                    </div>
                  ))}
              </motion.div>

              {/* Base Tracker Badge - Acts as anchor core */}
              <div className="-ml-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-600/30 font-mono text-sm font-black text-white">
                🥚{foundCount}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EggCounter
