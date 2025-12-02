'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './parallax.module.scss'
import Image from 'next/image'
import { useScroll, motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { MotionValue } from 'motion'
import Egg from '@/features/Egg/Egg'

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

const Parallax = ({ container }: { container: React.RefObject<HTMLElement | null> }) => {
  const gallery = useRef(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    container: container,
    offset: ['start end', 'end start']
  })
  const { height } = dimension

  const y = useMotionValue(0)
  const y2 = useMotionValue(0)
  const y3 = useMotionValue(0)
  const y4 = useMotionValue(0)

  useAnimationFrame(() => {
    const lenisProgress = scrollYProgress.get()

    const targetY = lenisProgress * (height * 2)
    const targetY2 = lenisProgress * (height * 4)
    const targetY3 = lenisProgress * (height * 1.25)
    const targetY4 = lenisProgress * (height * 2)

    const lerp = 0.1

    y.set(y.get() + (targetY - y.get()) * lerp)
    y2.set(y2.get() + (targetY2 - y2.get()) * lerp)
    y3.set(y3.get() + (targetY3 - y3.get()) * lerp)
    y4.set(y4.get() + (targetY4 - y4.get()) * lerp)
  })

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', resize)
    resize()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
      <div className="relative -mb-[3.4rem] snap-none">
        <div className="relative">
          <div className={styles.spacer}></div>
          <div className={styles.gallery} ref={gallery}>
            <Column images={[images[0], images[1], images[2], images[3]]} y={y} />
            <Column images={[images[10], images[4], images[5], images[6]]} y={y2} />
            <Column images={[images[6], images[7], images[8], images[9]]} y={y3} />
            <Column images={[images[9], images[10], images[11], images[0]]} y={y4} />
          </div>
          <div className="absolute left-[40%] bottom-20"><Egg id={2} /></div>
          <div className={styles.spacer}></div>
        </div>
      </div>
  )
}

const Column = ({ images, y }: {images: string[], y: MotionValue}) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image alt="image" fill sizes="min-width: 250px" src={`/images/Parallax/${src}`} />
          </div>
        )
      })}
    </motion.div>
  )
}

export default Parallax
