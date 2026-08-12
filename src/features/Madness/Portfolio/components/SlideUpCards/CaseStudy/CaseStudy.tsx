import { AnimatePresence, motion } from 'motion/react'
import React, { SetStateAction } from 'react'
import { Variants } from 'motion'

interface CaseStudyProps {
  children: React.ReactNode;
  closing: boolean;
  containerNode?: HTMLDivElement | null;
  direction?: number;
  open: boolean;
  setClosing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  setDirection: React.Dispatch<SetStateAction<number>>;
}

const variants = {
  initial: (custom: number) => ({
    x: custom === 1 ? '100%' : custom === -1 ? '-100%' : 0,
    y: custom === 0 ? '100%' : 0
  }),
  animate: {
    x: 0,
    y: 0
  },
  exit: (custom: number) => ({
    x: custom === 1 ? '-100%' : custom === -1 ? '100%' : 0,
    y: custom === 0 ? '100%' : 0
  })
}

const marqueeVariants: Variants = {
  marquee: {
    x: [0, -570],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        ease: 'linear'
      }
    }
  },
  idle: {}
}

const marginTopVariants = {
  hovered: {
    marginTop: '80px'
  },
  idle: {
    marginTop: '0px'
  }
}

const CaseStudy = ({
  children,
  containerNode,
  closing,
  direction = 0,
  open,
  setClosing,
  setCurrent,
  setDirection
}: CaseStudyProps) => {
  const handleClose = () => {
    setClosing(true)
    setCurrent('')
    setDirection(0)
  }

  return (
    <AnimatePresence custom={direction}>
      {open && (
        <motion.div
          key="modal"
          animate="animate"
          className="no-scrollbar fixed top-0 left-0 z-50 h-screen w-screen bg-white"
          custom={direction}
          exit="exit"
          initial="initial"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          variants={variants}
        >
          <div className="relative h-full w-full">
            <motion.button
              className="absolute top-8 z-20 flex h-8 w-full flex-row items-center justify-center pt-2 font-bold tracking-widest text-red-600 opacity-50 sm:top-0 sm:justify-between sm:bg-red-900 sm:pb-2 sm:opacity-100"
              initial="idle"
              layout
              onClick={handleClose}
              whileHover="marquee"
            >
              <svg
                className="sm:hidden"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <motion.div
                className="mb-2 hidden size-full text-nowrap md:block"
                variants={marqueeVariants}
              >
                <span>EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
                <span className="ml-60">EXIT</span>
              </motion.div>
            </motion.button>
            <motion.div
              className="-z-10 -mt-8 flex h-full w-full flex-col items-center justify-center sm:mt-0"
              variants={marginTopVariants}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseStudy
