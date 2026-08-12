import use3DCard from '@/features/Madness/Portfolio/components/SlideUpCards/Card/hooks/use3DCard'
import React, { useContext } from 'react'
import WisdomLogo from '@/assets/WisdomLogo'
import Image from 'next/image'
import { WormContext } from '@/context/wormContext'
import useCardGestures from '@/features/Madness/Portfolio/components/SlideUpCards/Card/hooks/useCardGestures'
import { motion, useAnimation } from 'motion/react'

const IDCard = () => {
  const controls = useAnimation()
  const [isAnimating, setIsAnimating] = React.useState(false)
  const {
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    rotateX,
    rotateY,
    scale
  } = use3DCard({ cardRotation: 40, cardScale: 1.1, off: isAnimating })
  const { observerNumber, setSeenSplash } = useContext(WormContext)
  const [rando, setRando] = React.useState(() => Math.random())
  const today = new Date()

  const handleClick = async () => {
    if (isAnimating) return
    setIsAnimating(true)

    // 1. Insert: Slide down using 'y' (transform) for performance
    await controls.start({
      y: 400,
      rotateX: 0, // Flatten during animation
      rotateY: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: 'circIn' }
    })

    // 2. Stay: Mechanical feedback
    await controls.start({
      x: [0, -1, 1, -1, 0],
      transition: { duration: 0.2, repeat: 2 }
    })

    await new Promise((resolve) => setTimeout(resolve, 600))

    // 3. Eject
    await controls.start({
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'backOut' }
    })

    setIsAnimating(false)
  }

  const {
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    pullDistance,
    pullThreshold
  } = useCardGestures(true, {
    onClick: handleClick,
    onClose: handleClick,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerMove: handlePointerMove
  })

  return (
    <motion.div
      animate={controls}
      className="relative flex h-[700px] w-[400px] flex-col items-center overflow-clip rounded-3xl bg-[url('/images/CardBG.png')] bg-cover shadow-xl select-none"
      layout={false} // Disable layout prop to prevent parent layout recalculations
      onClick={handleClick}
      onMouseEnter={!isAnimating ? handlePointerEnter : undefined}
      onMouseLeave={!isAnimating ? handlePointerLeave : undefined}
      onMouseMove={!isAnimating ? handlePointerMove : undefined}
      onTouchEnd={!isAnimating ? handleTouchEnd : undefined}
      onTouchMove={!isAnimating ? handleTouchMove : undefined}
      onTouchStart={!isAnimating ? handleTouchStart : undefined}
      style={{
        transformStyle: 'preserve-3d',
        // Only apply 3D hook values if NOT animating
        rotateX: isAnimating ? undefined : rotateX,
        rotateY: isAnimating ? undefined : rotateY,
        scale: isAnimating ? undefined : scale,
        y: 0, // Initial y for motion to take over
        ...{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance ? 'none' : 'transform 0.3s ease'
        }
      }}
      whileHover={isAnimating ? {} : { scale: 0.95 }}
      whileTap={isAnimating ? {} : { scale: 1.1 }}
    >
      <div className="mt-4 mb-20 h-10 w-20 rounded-full bg-transparent shadow-inner" />
      <div className="absolute top-8 right-8 w-10 text-gray-300">
        <WisdomLogo />
      </div>
      <p className="font-inter mt-2 rounded-4xl border-2 p-2 px-6 text-2xl">
        Observer
      </p>
      <p className="font-vt323 pt-2 text-5xl text-rose-700">{observerNumber}</p>
      <p className="font-vt323 -mt-2 text-xl text-rose-700">
        {today.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </p>
      <p className="font-vt323 absolute top-24 -left-[21vw] h-2 -rotate-90 p-2 px-6 text-xs text-gray-500 sm:-left-20">
        {rando * 10} SYNO-TRANSMUTE EVENT
      </p>
      <div className="absolute top-36 left-6 h-24 w-2 bg-gray-200" />
      <div className="absolute -top-1 left-6 h-42 w-px bg-gray-200" />
      <div className="emboss absolute top-1/2 w-52 text-gray-100 opacity-40">
        <WisdomLogo />
      </div>
      <div className="flex h-full w-full flex-row items-end justify-end p-10">
        <div className="flex w-auto flex-row items-center justify-between">
          <div>
            <Image
              alt={'Gradient Circle Image'}
              height={35}
              src={'/images/web-app-manifest-192x192.png'}
              width={35}
            />
          </div>
          <p className="ml-3 w-20 text-sm leading-4">
            Wisdom & Madness Design Co.
          </p>
        </div>
      </div>
      <div className="h-12 w-full rounded-b-3xl bg-linear-to-r from-[#3F5EFB] to-[#FC466B]" />
    </motion.div>
  )
}

export default IDCard
