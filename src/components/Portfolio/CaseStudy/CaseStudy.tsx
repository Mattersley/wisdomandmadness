import { motion } from 'motion/react'
import React, { SetStateAction } from 'react'

const CaseStudy = ({
  children,
  closing,
  open,
  setClosing,
  setCurrent
}: {
  children: React.ReactNode;
  closing: boolean;
  open: boolean;
  setClosing: React.Dispatch<SetStateAction<boolean>>;
  setCurrent: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleClose = () => {
    setClosing(true)
    setCurrent('')
  }

  return (
    <motion.div
      className={`flex-col bg-transparent ${!closing && 'backdrop-blur-xl'} ${open ? 'md:p-3 fixed top-0 left-0 z-50 w-screen h-screen overflow-y-hidden' : 'absolute h-32 w-60 md:h-40 md:w-72'}`}
      layout
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <motion.div
        className={'relative flex size-full flex-col items-center rounded-xl bg-white p-10 pt-16'}
        layout
      >
        {!closing && open && (
          <>
            <p className="my-4 rounded-3xl border border-indigo-500 px-4 py-0.5 tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white">
              CASE STUDY
            </p>
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
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CaseStudy
