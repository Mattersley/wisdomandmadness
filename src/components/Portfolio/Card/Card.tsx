import React, { DragEventHandler, MouseEventHandler, SetStateAction, TouchEventHandler, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import CaseStudy from '@/components/Portfolio/CaseStudy/CaseStudy'
import Pando from '@/components/Portfolio/Pando/Pando'

// ... other imports remain the same

interface PointerPosition {
  currentX: number;
  currentY: number;
  containerWidth: number;
  containerHeight: number;
}

const cardRotation = 30
const cardScale = 1.1

const Card = ({
  current,
  name,
  setCurrent,
  z
}: {
  current: string;
  name: string;
  setCurrent: React.Dispatch<SetStateAction<string>>;
  z: number;
}) => {
  const [closing, setClosing] = useState(false)
  const xPcnt = useSpring(0, { bounce: 0 })
  const yPcnt = useSpring(0, { bounce: 0 })
  const scale = useSpring(1, { bounce: 0 })
  const mouseX = useSpring(0, { bounce: 0 })
  const mouseY = useSpring(0, { bounce: 0 })

  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  )
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  )

  const handleClick = () => {
    if (current === '') {
      setCurrent(name)
    }
    setClosing(false)
  }

  const getPointerPosition = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent | MouseEvent
  ): PointerPosition => {
    const rect = (e.currentTarget as Element).getBoundingClientRect()
    const { width, height, left, top } = rect

    // Handle both mouse and touch events
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY

    const currentX = clientX - left
    const currentY = clientY - top

    return {
      currentX,
      currentY,
      containerWidth: width,
      containerHeight: height
    }
  }

  const updatePointerPosition = (position: PointerPosition) => {
    if (current === '') {
      const { currentX, currentY, containerWidth, containerHeight } = position
      xPcnt.set(currentX / containerWidth - 0.5)
      yPcnt.set(currentY / containerHeight - 0.5)
      mouseX.set(currentX)
      mouseY.set(currentY)
    }
  }

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const position = getPointerPosition(e)
    updatePointerPosition(position)
  }

  const handlePointerEnter = (e: React.MouseEvent | React.TouchEvent) => {
    if (current === '') {
      const { currentX, currentY } = getPointerPosition(e)
      scale.set(cardScale)
      mouseX.jump(currentX)
      mouseY.jump(currentY)
    }
  }

  const handlePointerLeave = () => {
    scale.set(1)
    xPcnt.set(0)
    yPcnt.set(0)
  }

  return (
    <div className={`relative ${current !== '' && 'overflow-y-clip'}`}>
      <CaseStudy
        closing={closing}
        open={current === name}
        setClosing={setClosing}
        setCurrent={setCurrent}
      >
        {current === 'Pando' && (<Pando />)}
      </CaseStudy>
      <motion.div
        className={
          `relative flex h-40 w-72 sm:h-32 sm:w-60 flex-col rounded-xl shadow-lg md:h-40 md:w-72 ${current === name && 'z-0'}`
        }
        layout
        onClick={handleClick}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onMouseMove={handlePointerMove}
        onTouchEnd={handlePointerLeave}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerEnter}
        style={{ transformStyle: 'preserve-3d', rotateX, rotateY, scale }}
        whileHover={current === name ? { scale: 1 } : { scale: 1.05 }}
        whileTap={current === name ? { scale: 1 } : { scale: 0.8 }}
      >
        <Image
          alt="image"
          className="rounded-xl"
          fill
          sizes="(max-width: 768px) 288px, 240px"
          src={`/images/Portfolio/Cards/${name}BG.png`}
        />
        <div
          className="absolute inset-0 grid place-content-center rounded-xl"
          style={{
            transform: `translateZ(${z}px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Image
            alt="image"
            fill
            sizes="(max-width: 768px) 288px, 240px"
            src={`/images/Portfolio/Cards/${name}FG.png`}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Card