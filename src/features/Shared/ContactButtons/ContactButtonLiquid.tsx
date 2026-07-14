'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface ContactButtonProps {
  openContact: () => void;
}

const ContactButtonLiquid = ({ openContact }: ContactButtonProps) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // 1. Frictionless Magnetic Physics Setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Fluid spring configurations designed for elegant cushioning
  const springConfig = { damping: 22, stiffness: 120, mass: 0.5 }
  const magneticX = useSpring(mouseX, springConfig)
  const magneticY = useSpring(mouseY, springConfig)

  // Decoupled Background Liquid Pull: Causes the background glow to float independently
  const backdropX = useTransform(magneticX, (x) => x * 0.45)
  const backdropY = useTransform(magneticY, (y) => y * 0.45)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!triggerRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } =
      triggerRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    // Calculates comfortable magnetic absorption vector offsets (scaled down by 0.35x)
    mouseX.set((clientX - centerX) * 0.35)
    mouseY.set((clientY - centerY) * 0.35)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Typographic split-mask text roller variants
  const textRollVariants = {
    initial: { y: '0%' },
    hover: { y: '-110%' }
  }

  return (
    <>
      <motion.button
        className="wnm-gradient group absolute top-8 right-[6vw] z-20 h-12 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-950 font-mono text-xs tracking-widest text-white uppercase transition-colors duration-500 will-change-transform select-none sm:relative sm:top-0 sm:right-0 sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52"
        onClick={openContact}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={triggerRef}
        style={{
          x: magneticX,
          y: magneticY,
          filter: 'url(#contact-liquid-gooey-pipeline)'
        }}
      >
        {/* THE LIQUID GOOEY GROW BUBBLE (Core wnm-gradient background asset) */}
        {/* Sits at scale-0 at rest, then balloons outward using organic spring scales on hover */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 0 }}
          className="pointer-events-none absolute z-0 size-full origin-center rounded-full bg-neutral-950"
          transition={{ type: 'spring', damping: 14, stiffness: 80, mass: 0.8 }}
        />

        {/* COMPANION FLOATING BACKDROP GLOW CHASSIS */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-neutral-950 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30"
          style={{ x: backdropX, y: backdropY }}
        />

        {/* TYPOGRAPHY RAMP: Rolling dual-text reveal running inside an overflow crop mask */}
        <div className="pointer-events-none relative z-10 flex h-5 flex-col items-center overflow-hidden">
          <motion.div
            animate={isHovered ? 'hover' : 'initial'}
            className="flex h-full flex-col items-center text-center text-nowrap whitespace-nowrap"
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            variants={textRollVariants}
          >
            {/* Slide Alpha (Default State) */}
            <span className="mt-1 block h-4 font-mono text-sm leading-none tracking-widest text-white">
              CONTACT
            </span>
            {/* Slide Beta (Hover Reveal State) */}
            <span className="mt-0.5 gap-2 flex flex-row items-center justify-center h-7 font-mono leading-none tracking-widest text-white">
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2h-1a4 4 0 0 1 -3.995 -3.8l-.005 -.2v-8a4 4 0 0 1 4 -4zm-2.8 9.286a1 1 0 0 0 -1.414 .014a2.5 2.5 0 0 1 -3.572 0a1 1 0 0 0 -1.428 1.4a4.5 4.5 0 0 0 6.428 0a1 1 0 0 0 -.014 -1.414m-5.69 -4.286h-.01a1 1 0 1 0 0 2h.01a1 1 0 0 0 0 -2m5 0h-.01a1 1 0 0 0 0 2h.01a1 1 0 0 0 0 -2" />
              </svg>
              LET&#39;S TALK
            </span>
          </motion.div>
        </div>
      </motion.button>

      {/* GLOBAL SVG COMPOSITE MULTIPLY MATRIX PIPELINE */}
      <svg aria-hidden="true" className="pointer-events-none absolute size-0">
        <defs>
          <filter id="contact-liquid-gooey-pipeline">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="6" />
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
    </>
  )
}

export default ContactButtonLiquid
