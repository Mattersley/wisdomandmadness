import { motion } from 'motion/react'
import { useRef } from 'react'

const Section = ({children}: {children: React.ReactNode}) => {
    const ref = useRef(null)

    return (
      <motion.section className="snap-always relative h-screen overflow-hidden snap-center">
          {children}
      </motion.section>
    )
}

export default Section