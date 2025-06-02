import { useSpring, useTransform } from 'motion/react'
import React from 'react'

interface PointerPosition {
  currentX: number;
  currentY: number;
  containerWidth: number;
  containerHeight: number;
}

const use3DCard = ({ cardRotation = 30, cardScale = 1.1, off = false }: { cardRotation: number, cardScale: number, off: boolean }) => {
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

  const getPointerPosition = (
    e: React.MouseEvent | React.TouchEvent | TouchEvent | MouseEvent
  ): PointerPosition => {
    e.preventDefault()
    const rect = (e.currentTarget as Element).getBoundingClientRect()
    const { width, height, left, top } = rect

    // Handle both mouse and touch events
    const clientX =
      'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
    const clientY =
      'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY

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
    if (!off) {
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
    if (!off) {
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

  return {
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    rotateX,
    rotateY,
    scale,
    mouseX,
    mouseY
  }
}

export default use3DCard