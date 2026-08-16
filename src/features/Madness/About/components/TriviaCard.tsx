import { motion, Variants } from 'motion/react'

// Ultra-smooth custom easing for high-end cinematic movement
const customEase = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {
    height: '48px', // Explicit pixel boundaries prevent layout engine bugs
    opacity: 0.6,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.00)',
    transition: {
      duration: 0.5,
      ease: customEase,
      when: 'afterChildren' // Let content disappear completely before shrinking
    }
  },
  visible: {
    height: '200px', // Uniform explicit height allows text blocks to breathe
    opacity: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    transition: {
      duration: 0.6,
      ease: customEase,
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

const titleVariants: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: customEase }
  },
  visible: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: customEase }
  }
}

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    filter: 'blur(10px)',
    transition: { duration: 0.4, ease: customEase }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: customEase }
  }
}

const TriviaCard = () => {
  return (
    <motion.div
      className="relative mx-auto mt-6 hidden w-[90%] cursor-help flex-col items-center justify-center overflow-hidden rounded-3xl border backdrop-blur-xs transition-colors duration-500 select-none sm:flex md:w-[70%] xl:w-[50%] 2xl:w-[30%]"
      initial="hidden"
      variants={containerVariants}
      whileHover="visible"
      whileTap="visible"
    >
      {/* 
        CRITICAL FIX 1: Title container is perfectly absolute-centered.
        It handles its own space safely without disrupting the domestic DOM flow.
      */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center p-4"
        variants={titleVariants}
      >
        <p className="text-center font-mono text-[0.55rem] leading-normal tracking-[0.3em] text-white/70">
          NOT USEFUL PERSONAL INFORMATION PRESENTED TO ADHERE TO SOCIAL NORMS
        </p>
      </motion.div>

      {/* 
        CRITICAL FIX 2: Content Container.
        Instead of running CSS Grid natively on the root container (which breaks animations), 
        we use an inner absolute grid wrapper that unlocks when parent animations pass variables down.
      */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 grid grid-cols-3 items-center justify-start px-4 sm:px-8">
        {/* Item 1 */}
        <motion.div
          className="pointer-events-auto flex flex-col items-center justify-start text-center"
          variants={contentVariants}
        >
          <span
            aria-label="Noodles"
            className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] filter"
            role="img"
          >
            🍜
          </span>
          <p className="mt-2 text-xs font-bold text-white sm:text-sm">
            <em>Food</em>
          </p>
          <div className="balance mt-1 max-w-[120px] text-[0.7rem] leading-normal text-white/60">
            <p className="balance mt-1 font-mono text-[0.7rem] tracking-wide text-indigo-400 italic">
              Panthay Kaukswe
            </p>
            <p className="balance font-mono text-[0.65rem] tracking-wide text-indigo-400">
              ပန်ထေးခေါက်ဆွဲ
            </p>
            <p className="mt-1 text-[0.65rem] leading-none text-white/40">
              Grandma&#39;s recipe
            </p>
            <p className="balance mt-3 font-mono text-[0.7rem] tracking-wide text-indigo-400 italic">
              Singapore Mei Fun
            </p>
            <p className="mt-1 text-[0.65rem] leading-none text-white/40">
              Ming Palace, Newcaslte, UK
            </p>
          </div>
        </motion.div>

        {/* Item 2 */}
        <motion.div
          className="pointer-events-auto flex flex-col items-center justify-start text-center"
          variants={contentVariants}
        >
          <span
            aria-label="Videocassette"
            className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] filter"
            role="img"
          >
            📼
          </span>
          <p className="mt-2 text-xs font-bold text-white sm:text-sm">
            <em>Show(s)</em>
          </p>
          <p className="balance mt-1 font-mono text-[0.65rem] tracking-wide text-indigo-400 italic">
            Scavenger&#39;s Reign
          </p>
          <p className="balance font-mono text-[0.65rem] tracking-wide text-indigo-400 italic">
            Dark Crystal AoR
          </p>
          <p className="balance font-mono text-[0.65rem] tracking-wide text-indigo-400 italic">
            Black Mirror
          </p>
        </motion.div>

        {/* Item 3 */}
        <motion.div
          className="pointer-events-auto flex flex-col items-center justify-center text-center"
          variants={contentVariants}
        >
          <span
            aria-label="Speaker"
            className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] filter"
            role="img"
          >
            🔊
          </span>
          <p className="mt-2 text-xs font-bold text-white sm:text-sm">
            <em>Listen</em>
          </p>
          <p className="balance mt-1 font-mono text-[0.65rem] tracking-wide text-indigo-400">
            <em>Technaturalism</em>
          </p>
          <p className="mt-0.5 text-[0.65rem] leading-none text-white/40">
            Immortal Onion
          </p>
          <p className="balance mt-2 font-mono text-[0.65rem] tracking-wide text-indigo-400">
            <em>French Ghetto (2025)</em>
          </p>
          <p className="mt-0.5 text-[0.65rem] leading-none text-white/40">
            Strawberry Girls
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TriviaCard
