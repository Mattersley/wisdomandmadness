import { MotionValue, wrap } from 'motion'
import { useEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'motion/react'
import Image from 'next/image'
import styles from '../parallax.module.scss'

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

export default ParallaxColumn
