'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './parallax.module.scss'
import Image from 'next/image'
import type { MotionValue } from 'motion'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

const images = [
  '6.png',
  '5.png',
  '3.png',

  '13.png',
  '1.png',
  '9.png',

  '10.png',
  '7.png',
  '11.png',

  '12.png',
  '8.png',
  '14.png'
]

const columns = [
  [images[0], images[1], images[2], images[3], images[4], images[5]],
  [images[6], images[7], images[8], images[9], images[10], images[11]],
  [images[2], images[5], images[8], images[11], images[1], images[4]],
  [images[9], images[10], images[0], images[3], images[6], images[7]]
]

const wrap = (min: number, max: number, value: number) => {
  const range = max - min

  return ((((value - min) % range) + range) % range) + min
}

const Parallax = ({
  container
}: {
  container: React.RefObject<HTMLElement | null>;
}) => {
  const gallery = useRef(null)
  const [dim, setDim] = useState({ height: 0 })

  /* Track viewport height */
  useEffect(() => {
    const resize = () => setDim({ height: window.innerHeight })
    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  /* Scroll progress (relative to gallery section) */
  const { scrollYProgress } = useScroll({
    target: gallery,
    container,
    offset: ['start end', 'end start']
  })

  /* SMOOTH physics — cinematic motion */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 30 // lower = softer
    // damping: 22,     // controls wobble
    // mass: 0.3       // slightly floaty
  })

  /* Parallax depths — tuned for cinematic feel */
  const y1 = useTransform(smooth, (v) => v * dim.height * 1.8)
  const y2 = useTransform(smooth, (v) => v * dim.height * 3.2)
  const y3 = useTransform(smooth, (v) => v * dim.height * 1.1)
  const y4 = useTransform(smooth, (v) => v * dim.height * 2.4)
  const columnMotion = [
    { y: y1, direction: 1 },
    { y: y2, direction: -1 },
    { y: y3, direction: 1 },
    { y: y4, direction: -1 }
  ] as const

  return (
    <section className="relative w-full snap-none">
      <div className={styles.spacer} />

      <div className={styles.gallery} ref={gallery}>
        {columns.map((columnImages, index) => (
          <ParallaxColumn
            key={index}
            direction={columnMotion[index].direction}
            images={columnImages}
            y={columnMotion[index].y}
          />
        ))}
      </div>
    </section>
  )
}

const ParallaxColumn = ({
  direction,
  images,
  y
}: {
  direction: 1 | -1;
  images: string[];
  y: MotionValue<number>;
}) => {
  const loopRef = useRef<HTMLDivElement>(null)
  const [loopHeight, setLoopHeight] = useState(0)
  const wrappedY = useTransform(y, (latest) => {
    if (loopHeight === 0) {
      return 0
    }

    const offset = wrap(0, loopHeight, latest)

    return direction === 1 ? -offset : -loopHeight + offset
  })
  const repeatedImages = [images, images, images]

  useEffect(() => {
    const loop = loopRef.current

    if (!loop) {
      return
    }

    const updateLoopHeight = () => setLoopHeight(loop.offsetHeight)
    const observer = new ResizeObserver(updateLoopHeight)

    updateLoopHeight()
    observer.observe(loop)

    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.column}>
      <motion.div className={styles.track} style={{ y: wrappedY }}>
        {repeatedImages.map((imageSet, setIndex) => (
          <div
            key={setIndex}
            aria-hidden={setIndex > 0}
            className={styles.loop}
            ref={setIndex === 0 ? loopRef : undefined}
          >
            {imageSet.map((src, imageIndex) => {
              return (
                <div
                  key={`${setIndex}-${src}-${imageIndex}`}
                  className={styles.imageContainer}
                >
                  <Image
                    alt=""
                    fill
                    sizes="min-width: 250px"
                    src={`/images/Parallax/${src}`}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Parallax