import { AnimatePresence, motion } from 'motion/react'
import React, { SetStateAction } from 'react'

interface CaseStudyProps {
  children: React.ReactNode;
  closing: boolean;
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

const CaseStudy = ({
  children,
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
          className="fixed top-0 left-0 z-50 h-screen w-screen bg-white"
          custom={direction}
          exit="exit"
          initial="initial"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          variants={variants}
        >
          <div className="relative h-full w-full">
            <button
              className="absolute top-0 flex h-8 w-full flex-row items-center justify-between md:rounded-t-xl bg-red-900 px-10 font-bold tracking-widest text-red-600"
              onClick={handleClose}
            >
              <span className="hidden md:block">EXIT</span>
              <span className="hidden md:block">EXIT</span>
              <span className="hidden md:block">EXIT</span>
              <span>EXIT</span>
              <span>EXIT</span>
              <span>EXIT</span>
              <span>EXIT</span>
            </button>
            <div className="flex h-full w-full flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default CaseStudy
