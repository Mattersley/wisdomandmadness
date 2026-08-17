'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './parallax.module.scss'
import { useScroll, useSpring, useTransform } from 'motion/react'
import ParallaxColumn from '@/features/Madness/Parallax/components/ParallaxColumn'

const images = [
  '1.png',
  '3.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',
  '11.png',
  '12.png',
  '13.png',
  '14.png'
]

const columns = [
  [images[0], images[2], images[6], images[8], images[7], images[10]],
  [images[4], images[5], images[5], images[5], images[4], images[0]],
  [images[10], images[5], images[3], images[6], images[1], images[3]],
  [images[4], images[5], images[6], images[7], images[8], images[9]]
]

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
    <section className="relative w-full snap-none bg-white">
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
  );
}

export default Parallax
