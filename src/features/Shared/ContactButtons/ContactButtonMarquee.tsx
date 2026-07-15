'use client'

import React, { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  Variants
} from 'motion/react'
import { useContact } from '@/context/contactContext'

// Hardcoded layout values are eliminated.
// A -50% translation combined with duplicated text guarantees a pixel-perfect, seamless infinite loop.
const marqueeVariants: Variants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 16,
        ease: 'linear'
      }
    }
  }
}

interface ContactButtonProps {
  transparent: boolean;
  onClick?: () => void;
}

const ContactButtonMarquee = ({ transparent, onClick }: ContactButtonProps) => {
  const { openContact } = useContact()
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  // Magnetic physics properties
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 }
  const magneticX = useSpring(mouseX, springConfig)
  const magneticY = useSpring(mouseY, springConfig)

  // Controls text scroll velocity acceleration state
  const timeScale = useMotionValue(1)
  const animatedTimeScale = useSpring(timeScale, {
    damping: 15,
    stiffness: 80
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!triggerRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } =
      triggerRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    // Calculates elastic gravity pull vector
    mouseX.set((clientX - centerX) * 0.35)
    mouseY.set((clientY - centerY) * 0.35)
  }

  const handleMouseEnter = () => {
    timeScale.set(2.5) // Speeds up the text wheel on hover
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    timeScale.set(1) // Returns back to standard tempo
  }

  return (
    <motion.button
      className={`group relative z-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 font-mono text-xs tracking-widest text-white uppercase backdrop-blur-md transition-all duration-300 ease-out will-change-transform select-none flex h-16 w-40 md:w-44 lg:w-52 ${
        transparent
          ? 'bg-white/5 hover:border-white hover:bg-white'
          : 'border-neutral-800 bg-neutral-950 hover:bg-neutral-900'
      } `}
      onClick={onClick || openContact}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={triggerRef}
      style={{ x: magneticX, y: magneticY }}
    >
      {/* GLOWING HOVER OVERLAY BACKDROP */}
      <div className="absolute inset-0 z-0 bg-linear-to-tr from-indigo-500 via-purple-500 to-rose-500 opacity-0 blur-md transition-opacity duration-500 ease-out group-hover:opacity-15" />

      {/* MARQUEE RUNWAY PANEL */}
      <div className="mask-image-[linear-gradient(to_right,transparent_0%,white_15%,white_85%,transparent_100%)] relative z-10 w-full overflow-hidden">
        <motion.div
          animate="animate"
          className="flex w-max text-nowrap whitespace-nowrap"
          style={{
            // Injects dynamic, smooth velocity updates into the animation loop runtime
            animationDuration: useTransform(
              animatedTimeScale,
              (ts) => `${16 / ts}s`
            )
          }}
          variants={marqueeVariants}
        >
          {/* Duplicating the string block provides a seamless visual loop cycle */}
          <span
            className={`px-2 transition-colors duration-300 ${transparent ? 'text-white group-hover:text-neutral-950' : 'text-neutral-200'}`}
          >
            LET&#39;S WORK TOGETHER • LET&#39;S WORK TOGETHER •&nbsp;
          </span>
          <span
            className={`px-2 transition-colors duration-300 ${transparent ? 'text-white group-hover:text-neutral-950' : 'text-neutral-200'}`}
          >
            LET&#39;S WORK TOGETHER • LET&#39;S WORK TOGETHER •&nbsp;
          </span>
        </motion.div>
      </div>
    </motion.button>
  )
}

export default ContactButtonMarquee
