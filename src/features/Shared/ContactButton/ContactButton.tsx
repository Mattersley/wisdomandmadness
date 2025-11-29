import { motion } from 'motion/react'
import { Variants } from 'motion'
import { useContact } from '@/context/contactContext'

const marqueeVariants: Variants = {
  animate: {
    x: [0, -570],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        ease: 'linear'
      }
    }
  }
}

interface ContactButtonProps {
  transparent: boolean
  onClick?: () => void
}

const ContactButton = ({ transparent, onClick }: ContactButtonProps) => {
  const { openContact } = useContact()

  return (
    <button
      className={`right-[5%] z-20 hidden items-center rounded-[3rem] ${transparent ? 'border-[0.5px] border-white bg-transparent hover:border-[2px]' : 'wnm-gradient hover:bg-gradient-to-tr'} text-center text-white sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52`}
      onClick={onClick || openContact}
    >
      <div className="mt-6 relative size-full h-10 w-60 overflow-x-hidden sm:w-52 md:w-40 lg:w-52">
        <motion.div
          animate="animate"
          className="absolute size-full text-nowrap"
          variants={marqueeVariants}
        >
          <p className="my-auto uppercase font-mono tracking-widest text-xs ${transparent ? 'text-white' : 'text-neutral-950'}: ''}">
            Let&#39;s Work Together. Let&#39;s Work Together. Let&#39;s Work
            Together. Let&#39;s Work Together. Let&#39;s Work Together.
            Let&#39;s Work Together. Let&#39;s Work Together
          </p>
        </motion.div>
      </div>
    </button>
  )
}

export default ContactButton
