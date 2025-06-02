import use3DCard from '@/hooks/use3DCard'
import { motion } from 'motion/react'
import { SetStateAction } from 'react'

interface CardContainerProps {
  children: React.ReactNode;
  closing: boolean;
  current: string;
  name: string;
  setClosing: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<string>>;
}

const CardContainer = ({
  children,
  closing,
  current,
  name,
  setClosing,
  setCurrent
}: CardContainerProps) => {
  const {
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    rotateX,
    rotateY,
    scale
  } = use3DCard({ cardRotation: 30, cardScale: 1.1, off: current !== '' })

  const handleClick = () => {
    if (current === '') {
      setCurrent(name)
    }
    setClosing(false)
  }

  return (
    <motion.div
      className={`relative flex h-40 w-72 flex-col rounded-xl shadow-lg sm:h-32 sm:w-60 md:h-40 md:w-72 ${current === name && 'z-0'}`}
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
      {children}
    </motion.div>
  )
}

export default CardContainer
