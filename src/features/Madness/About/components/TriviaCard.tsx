import { motion } from 'motion/react'
import ProfileCard from '@/features/Madness/About/components/ProfileCard'
import { Variants } from 'motion'

const containerVariants: Variants = {
  hidden: {
    height: '3rem',
    opacity: 0.5,
    transition: {
      delay: 0.4,
      ease: 'easeInOut'
    }
  },
  visible: {
    height: '8rem',
    opacity: 1,
    transition: {
      ease: 'easeInOut'
    }
  }
}

const titleVariants: Variants = {
  visible: {
    display: 'none',
    x: '20%',
    opacity: 0
  },
  hidden: {
    display: 'block',
    opacity: 1
  }
}

const contentVariants: Variants = {
  hidden: {
    display: 'none',
    height: '0%',
    y: '-10px',
    opacity: 0,
    transition: {
      ease: 'easeInOut'
    }
  },
  visible: {
    display: 'block',
    height: '100%',
    opacity: 1,
    y: '0',
    transition: {
      delay: 0.3,
      ease: 'easeInOut'
    }
  }
}

const TriviaCard = () => {
  return (
    <motion.div
      className="relative mx-auto mt-6 hidden w-[60%] flex-col gap-6 rounded-4xl border border-white px-3 py-4 text-center sm:col-span-2 sm:grid sm:w-[90%] sm:grid-cols-3 sm:rounded-[5rem] sm:px-8 md:w-[70%] xl:mt-0 xl:w-[60%]"
      initial={'hidden'}
      variants={containerVariants}
      whileHover={'visible'}
      whileTap={'visible'} // Adds basic touch support
    >
      <motion.p
        className="col-span-3 text-[0.5rem] tracking-widest"
        layout
        variants={titleVariants}
      >
        NOT USEFUL PERSONAL INFORMATION PRESENTED TO ADHERE TO SOCIAL NORMS
      </motion.p>
      <motion.div variants={contentVariants}>
        <span aria-label="Noodles" className="text-3xl" role="img">
          🍜
        </span>
        <p className="font-bold">
          <em>Favourite dish</em>
        </p>
        <p className="text-[0.65rem]">My grandma&#39;s Panthay Kaukswe</p>
      </motion.div>
      <motion.div variants={contentVariants}>
        <span aria-label="Videocassette" className="text-3xl" role="img">
          📼
        </span>
        <p className="font-bold">
          <em>Favourite show(s)</em>
        </p>
        <p className="text-[0.65rem]">
          Scavenger&#39;s Reign / Dark Crystal AoR / Black Mirror
        </p>
      </motion.div>
      <motion.div variants={contentVariants}>
        <span aria-label="Speaker" className="text-3xl" role="img">
          🔊
        </span>
        <p className="font-bold">
          <em>Current listen</em>
        </p>
        <p className="text-[0.65rem]">
          <em>Technaturalism</em>
        </p>
        <p className="text-[0.65rem]">Immortal Onion</p>
      </motion.div>
    </motion.div>
  )
}

export default TriviaCard