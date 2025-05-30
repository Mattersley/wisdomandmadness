import { motion } from 'motion/react'
import React, { useRef } from 'react'

const Section = ({children}: {children: React.ReactNode}) => {

    return (
      <motion.section className="snap-always relative h-screen overflow-hidden snap-center">
          {children}
      </motion.section>
    )
}

export default Section