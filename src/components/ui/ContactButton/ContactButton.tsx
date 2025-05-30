import { motion } from 'motion/react'

const marqueeVariants = {
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

const ContactButton = ({ transparent }: { transparent: boolean }) => {
  return (
    <div
      className={`right-[5%] z-20 hidden items-center rounded-[3rem] ${transparent ? 'border-[0.5px] border-white bg-transparent hover:border-[2px]' : 'bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] hover:bg-gradient-to-tr'} text-center text-white sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52`}
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
    </div>
  )
}

export default ContactButton
