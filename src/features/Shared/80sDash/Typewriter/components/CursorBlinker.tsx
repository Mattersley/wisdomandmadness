import { motion } from 'motion/react'
import { Variants } from 'motion'

const cursorVariants: Variants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: 'linear',
      times: [0, 0.5, 0.5, 1]
    }
  }
}

const sizes = {
  3: 'h-3',
  4: 'h-4',
  5: 'h-5',
  6: 'h-6',
  7: 'h-7'
}

const CursorBlinker = ({size}: {size: number})=> {
  return (
    <motion.div
      animate="blinking"
      className={`inline-block h-${size} w-1 translate-y-1 bg-[#3ea34b]`}
      variants={cursorVariants}
    />
  )
}

export default CursorBlinker