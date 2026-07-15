'use client'

import React, { useRef, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Variants } from 'motion'

const svgLineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0.3 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.8,
      bounce: 0,
      ease: 'easeOut'
    }
  }
}

const timeStore = {
  listeners: new Set<() => void>(),
  subscribe(callback: () => void) {
    this.listeners.add(callback)
    const interval = setInterval(() => {
      this.listeners.forEach((listener) => listener())
    }, 1000)
    return () => {
      clearInterval(interval)
      this.listeners.delete(callback)
    }
  },
  getSnapshot() {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Vancouver',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    return new Intl.DateTimeFormat('en-CA', options).format(new Date())
  },
  getServerSnapshot() {
    return ''
  }
}

export const VanIsle = () => {
  // Bound to the global container so mouse vectors have a large interactive runway area
  const runwayRef = useRef<HTMLDivElement | null>(null)
  const [redrawKey, setRedrawKey] = useState<number>(0)

  const localTime = useSyncExternalStore(
    timeStore.subscribe.bind(timeStore),
    timeStore.getSnapshot.bind(timeStore),
    timeStore.getServerSnapshot.bind(timeStore)
  )

  // Real-Time Interaction Pointers
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 }
  const magneticX = useSpring(mouseX, springConfig)
  const magneticY = useSpring(mouseY, springConfig)

  // Amplified Orb Multiplier: Multiplies spring values to create a fast loose break-away glide under the pointer
  const orbX = useTransform(magneticX, (x) => x * 1.65)
  const orbY = useTransform(magneticY, (y) => y * 1.65)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!runwayRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } =
      runwayRef.current.getBoundingClientRect()

    // Absolute central origin calculations matching the parent viewport
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Applies your exact structural multiplier scale directly to coordinate feeds
    mouseX.set((clientX - centerX) * 0.1)
    mouseY.set((clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      className="pointer-events-auto relative flex w-60 flex-col items-center justify-center select-none"
      initial="hidden"
      onClick={() => setRedrawKey((prev) => prev + 1)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onViewportEnter={() => setRedrawKey((prev) => prev + 1)}
      ref={runwayRef}
      viewport={{ once: false, amount: 0.2 }}
      whileInView="visible"
    >
      <motion.div
        className="group pointer-events-none relative mb-6 size-24 transform-gpu will-change-transform"
        style={{ x: magneticX, y: magneticY }}
      >
        <svg
          className="relative z-0 size-full"
          fill="none"
          stroke="white"
          strokeWidth={5}
          viewBox="0 0 700.33 537.94"
        >
          <motion.polygon
            key={`polygon-${redrawKey}`}
            animate={{ pathLength: 1, opacity: 1 }}
            initial={{ pathLength: 0, opacity: 0.1 }}
            points=".5 20.46 9.77 14.04 17.61 14.04 28.3 4.78 37.57 4.78 44.7 .5 55.39 .5 67.51 .5 73.93 .5 86.04 .5 93.17 10.48 103.87 10.48 116.7 20.46 127.39 20.46 127.39 29.73 138.08 36.86 145.21 41.85 156.62 46.12 165.17 51.83 175.87 56.1 187.27 61.09 202.24 61.09 217.21 68.22 230.04 73.21 240.74 78.2 251.43 82.48 258.56 82.48 268.54 82.48 288.5 82.48 307.03 87.47 320.58 87.47 336.89 102.44 352.66 102.44 363.35 109.57 373.33 109.57 387.59 109.57 401.85 115.98 411.11 128.82 411.11 142.36 415.39 155.19 418.95 163.75 433.21 175.15 433.21 187.27 443.91 205.81 454.6 218.64 454.6 218.64 467.43 230.76 476.7 240.02 485.96 248.58 479.55 255.71 469.57 252.14 469.57 259.27 476.7 262.84 480.97 275.58 489.53 290.64 495.94 300.62 503.07 300.62 513.05 305.61 523.75 314.88 533.73 318.44 546.56 318.44 554.4 322.72 565.09 328.42 571.51 334.12 578.64 334.12 585.77 338.4 579.35 342.68 595.03 342.68 604.3 348.38 612.14 352.66 612.14 364.06 624.97 367.63 630.68 378.32 635.67 387.59 635.67 394.72 622.84 394.72 635.67 404.7 642.08 412.54 654.2 427.51 658.48 434.64 658.48 442.48 652.06 446.76 665.61 457.45 665.61 468.86 665.61 480.97 665.61 495.94 673.45 485.25 673.45 474.56 673.45 460.3 684.14 459.59 684.14 470.28 688.42 483.11 688.42 492.38 695.55 500.93 699.83 510.2 699.83 518.04 686.28 518.04 677.01 511.63 673.45 518.04 667.03 526.6 667.03 533.73 659.19 537.29 655.63 530.88 651.35 537.29 641.37 532.3 642.08 523.75 632.1 525.89 619.98 525.89 605.01 520.89 597.17 515.19 577.21 508.06 564.38 503.79 543.71 495.23 547.27 486.68 534.44 488.82 508.78 482.4 497.37 474.56 487.39 464.58 470.99 458.88 456.02 454.6 449.61 438.91 440.34 441.05 443.19 433.21 454.6 420.38 461.73 418.95 464.58 408.97 471.71 403.98 483.83 399.71 487.39 385.45 493.81 369.77 491.67 349.09 484.54 344.82 489.53 360.5 485.96 376.9 480.97 391.87 472.42 396.86 463.15 396.86 453.17 400.42 444.62 382.6 444.62 396.14 438.2 395.43 436.78 408.26 426.8 405.41 424.66 391.87 416.82 388.3 411.11 400.42 397.57 413.25 385.45 405.41 375.47 395.43 366.92 383.31 350.16 381.89 342.68 371.19 341.96 363.35 350.16 371.91 356.93 371.19 369.05 369.05 378.32 360.5 378.32 353.37 368.34 361.93 360.5 364.06 361.21 356.22 366.2 344.1 357.65 346.24 357.65 324.86 350.16 340.54 343.39 339.83 336.89 348.38 326.99 346.24 325.57 336.26 333.41 331.98 336.89 323.43 336.89 312.74 330.56 324.86 323.43 328.42 320.58 320.58 321.29 306.32 312.02 307.75 299.19 312.74 292.78 305.61 294.2 320.58 280.66 315.59 272.82 308.46 273.53 297.77 265.69 299.19 262.84 307.03 266.4 313.45 256.42 318.44 250.72 308.46 253.57 300.62 253.57 290.64 252.14 275.58 260.7 268.9 264.97 262.84 279.94 262.84 292.06 262.84 309.17 259.27 319.87 257.13 301.33 254.28 284.94 256.42 275.67 255.71 264.97 254.99 272.1 235.75 264.97 227.19 264.26 238.6 257.13 247.87 247.87 250.72 243.59 233.61 239.31 218.64 242.16 201.53 232.18 214.36 222.2 210.08 221.49 195.83 215.07 210.8 206.52 212.94 201.53 188.7 200.1 213.65 193.69 215.79 185.85 197.96 187.27 217.21 175.15 215.07 166.6 210.8 160.18 195.11 168.02 185.13 168.02 173.73 176.58 172.3 178 164.46 181.57 156.62 167.31 163.75 152.34 150.92 154.48 166.6 150.2 177.29 140.22 180.86 131.67 174.44 125.97 165.17 125.25 155.91 131.67 147.35 114.56 159.47 105.29 158.76 108.86 145.93 94.6 159.47 85.33 167.31 68.22 163.03 71.07 155.19 81.05 145.93 93.89 135.23 83.19 130.96 76.78 124.54 92.46 121.69 83.19 116.7 71.07 113.85 61.81 118.12 56.82 106.72 63.23 93.17 76.06 88.18 88.18 84.62 98.16 83.19 110.99 82.48 125.25 101.73 133.09 106 113.85 76.06 115.98 67.51 133.81 63.95 135.23 56.1 115.98 60.38 94.6 54.68 82.48 54.68 53.97 47.55 90.32 61.81 107.43 63.23 104.58 71.79 78.92 81.05 54.68 83.19 61.09 69.65 46.12 85.33 34 74.64 24.02 68.94 23.31 58.24 14.04 53.97 19.03 40.42 7.63 39.71 .5 27.59 .5 20.46"
            transition={{
              type: 'spring',
              duration: 4,
              bounce: 0,
              ease: 'easeOut'
            }}
          />
        </svg>

        <motion.div
          className="absolute -right-2 bottom-0 z-20 size-9 rounded-full bg-linear-to-tl from-[#3F5EFB]/90 to-[#FC466B]/90 transition-colors duration-300 will-change-transform group-hover:from-[#3F5EFB] group-hover:to-[#FC466B]"
          style={{ x: orbX, y: orbY }}
        />
      </motion.div>

      <div className="pointer-events-none w-full text-center md:text-right font-mono text-xs text-white select-none">
        <p className="leading-relaxed">
          Proudly serving the world, from our base on{' '}
          <strong>Vancouver Island</strong> in BC, Canada
        </p>

        {localTime && (
          <p className="mt-2 text-[10px] font-bold tracking-widest text-neutral-400 uppercase tabular-nums">
            {localTime} PST
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default VanIsle
