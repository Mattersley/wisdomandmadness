import { useContext } from 'react'
import { EggContext } from '@/context/eggContext'
import { motion } from 'motion/react'
import Egg from '@/features/Madness/Egg/Egg'

const ProfileCard = () => {
  const { eggs } = useContext(EggContext)
  const showHiddenEgg = eggs.eggs !== 0 && !eggs.eggList[5].found

  return (
    <div className="relative mb-4 flex flex-col items-center border-white/50 py-4 pr-5 transition-colors duration-500 md:items-end md:border-r">
      {/* Decorative Animated Accents */}
      <div className="absolute top-0 right-0 hidden w-5 border-t border-white/50 transition-all duration-500 group-hover:w-10 md:block" />

      <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase md:text-right">
        Design <span className="text-rose-500/80">&#47;&#47;</span> Code
      </p>

      {/* Glitch/Hover Interactive Title */}
      <motion.p
        className="font-vt323 relative my-2 cursor-default text-7xl font-thin select-none"
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.02 }}
      >
        MAT_AT
        {showHiddenEgg ? (
          <span className="relative ml-2 inline-block">
            🥚
            <span className="absolute w-14 h-19 -top-2 right-2 z-20 text-transparent opacity-0 transition-opacity hover:opacity-100">
              <Egg id={6} />
            </span>
          </span>
        ) : (
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            className="ml-2 inline-block text-6xl text-indigo-400"
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            👁
          </motion.span>
        )}
      </motion.p>

      <div className="absolute top-[50%] -right-[1.27rem] hidden w-5 border-t border-white/50 md:block" />

      <p className="text-xl font-light tracking-wide text-white/70 md:text-lg">
        Matt Hattersley
      </p>

      <p className="my-4 ml-auto w-80 self-end font-mono text-xs leading-relaxed tracking-widest text-indigo-400/80 uppercase xl:text-right">
        Creative Director
        <br />
        <span className="font-sans text-white/40 lowercase italic">
          and
        </span>{' '}
        Developer
      </p>

      {/* Premium Magnetic Loop Link */}
      <motion.a
        className="group/link relative flex flex-row items-center overflow-hidden py-1 font-mono text-xs tracking-wider text-rose-400"
        href="mailto:matt@wisdomandmadness.com"
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ x: -4 }}
      >
        <svg
          className="transform transition-transform duration-500 group-hover/link:rotate-12 group-hover/link:text-rose-300"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
          <path d="M3 7l9 6l9 -6" />
        </svg>
        <p className="relative ml-2 overflow-hidden">
          <span className="inline-block transition-transform duration-500 group-hover/link:-translate-y-full">
            matt@wisdomandmadness.com
          </span>
          <span className="absolute top-0 left-0 inline-block translate-y-full font-bold text-white transition-transform duration-500 group-hover/link:translate-y-0">
            Send transmission →
          </span>
        </p>
      </motion.a>

      <div className="absolute right-0 bottom-0 hidden w-5 border-t border-white/50 md:block" />
    </div>
  )
}

export default ProfileCard
