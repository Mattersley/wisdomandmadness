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
  }

  return (
    <motion.div
      className={`flex-col bg-gradient-to-tl from-[#3F5EFB]/20 to-[#FC466B]/20 ${closing && 'backdrop-opacity-15 backdrop-blur-xl'} ${(open || closing) ? 'md:p-3 fixed left-0 z-50 w-screen h-screen' : 'absolute left-0 right-0 h-screen w-screen -z-50'} ${open && !closing ? 'top-0 shadow-2xl' : 'top-[100vh]'}`}
      layout
      onLayoutAnimationComplete={() => {
        if (closing) {
          setCurrent('')
          setClosing(false)
        }
      }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div
        className={'relative flex size-full flex-col items-center rounded-xl bg-white'}
      >
        {open && (
          <>

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
      </div>
    </motion.div>
  )
}

export default CaseStudy
