import React, { MouseEventHandler, SetStateAction, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import CaseStudy from '@/components/Portfolio/CaseStudy/CaseStudy'
import Pando from '@/components/Portfolio/Pando/Pando'

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

  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect()

    const currentMouseX = e.clientX - left
    const currentMouseY = e.clientY - top

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height
    }
  }

  const handleMouseMove: MouseEventHandler = (e) => {
    if (current === '') {
      const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
        getMousePosition(e)
      xPcnt.set(currentMouseX / containerWidth - 0.5)
      yPcnt.set(currentMouseY / containerHeight - 0.5)
      mouseX.set(currentMouseX)
      mouseY.set(currentMouseY)
    }
  }

  const handleMouseEnter: MouseEventHandler = (e) => {
    if (current === '') {
      const { currentMouseX, currentMouseY } = getMousePosition(e)
      scale.set(cardScale)
      mouseX.jump(currentMouseX)
      mouseY.jump(currentMouseY)
    }
  }

  const handleMouseLeave: MouseEventHandler = () => {
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
          `relative flex h-32 w-60 flex-col rounded-xl shadow-lg md:h-40 md:w-72 ${current === name && 'z-0'}`
        }
        layout
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
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
