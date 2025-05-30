import localFont from 'next/font/local'
import FeatureList from '@/components/About/Values/FeatureList'
import { motion } from 'motion/react'
import { useContext } from 'react'
import { EggContext } from '@/context/eggContext'
import Egg from '@/components/Egg/Egg'
const vagraFont = localFont({
  src: '../../../public/fonts/vagra-pixel.woff2'
})

const containerVariants = {
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

const titleVariants = {
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

const contentVariants = {
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

const About = () => {
  const { eggs } = useContext(EggContext)
  return (
    <div className="relative flex w-screen snap-mandatory snap-start flex-col items-center bg-neutral-950 py-20 text-white select-none">
      <h2
        className={`${vagraFont.className} bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] bg-clip-text text-[6rem] text-transparent`}
      >
        About
      </h2>

      <div className="mb-20 flex w-full flex-col items-center gap-6 px-2 text-center">
        <p className="mb-2 rounded-3xl border border-indigo-500 px-4 py-0.5 tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white">
          VALUES
        </p>
        <FeatureList />
      </div>

      <p className="mb-5 rounded-3xl border border-indigo-500 px-4 py-0.5 tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white">
        TEAM
      </p>
      <div className="mb-10 flex flex-col items-center text-center md:grid md:w-[60rem] md:grid-cols-2 md:flex-row md:items-start md:gap-5 md:text-right lg:w-[90%]">
        <div className="relative mb-4 border-white/40 py-4 pr-5 md:border-r">
          <div className="absolute top-0 right-0 hidden w-5 border-t border-white/40 md:block" />
          <p className="text-xl text-white/50 md:text-lg">
            Design // Code // Science
          </p>
          <p className="text-5xl tracking-widest">
            MAT_AT
            {eggs.eggs !== 0 && !eggs.eggList[5].found ? (
              <>
                <span>🥚</span>
                <span className="absolute right-9 z-10 text-transparent">
                  <Egg id={5} />
                </span>
              </>
            ) : (
              '👁'
            )}
          </p>
          <div className="absolute top-[50%] -right-[1.27rem] hidden w-5 border-t border-white/40 md:block" />
          <p className="my-4 ml-auto w-80 self-end text-xs text-indigo-300 italic xl:text-right">
            Full stack developer, seasoned graphic designer, published
            scientist, and cocktail / coffee connoisseur
          </p>
          <a href="mailto:matt@wisdomandmadness.com">
            <div
              className="flex flex-row items-center justify-end text-xs text-rose-500 opacity-30 hover:opacity-100 transition-opacity">
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>

              <p className="ml-2">
                matt@wisdomandmadness.com
              </p>
            </div>
          </a>
          <div className="absolute right-0 bottom-0 hidden w-5 border-t border-white/40 md:block" />
        </div>

        <p className="mb-4 w-[90%] self-center sm:w-[60%] md:ml-6 md:text-left">
          Using his education in data wrangling, experience in design, and
          history of website building, Matt can translate your most complex of
          concepts and ideas into elegant, creative solutions.
        </p>
        <motion.div
          className="relative mx-auto mt-6 grid w-[60%] sm:w-[90%] md:w-[70%] gap-6 rounded-4xl border border-white px-3 py-4 text-center sm:col-span-2 sm:grid-cols-3 sm:rounded-[5rem] sm:px-8 xl:mt-0 xl:w-[60%]"
          initial={'hidden'}
          variants={containerVariants}
          whileHover={'visible'}
        >
          <motion.p
            className="col-span-3 text-[0.5rem] tracking-widest"
            layout
            variants={titleVariants}
          >
            NOT USEFUL PERSONAL INFORMATION PRESENTED TO ADHERE TO SOCIAL NORMS
            AND CREATE HUMAN CONNECTION
          </motion.p>
          <motion.div variants={contentVariants}>
            <span className="text-3xl">🍜</span>
            <p className="font-bold">
              <em>Favourite dish</em>
            </p>
            <p className="text-[0.65rem]">My grandma&#39;s Panthay Kaukswe</p>
          </motion.div>
          <motion.div variants={contentVariants}>
            <span className="text-3xl">📼</span>
            <p className="font-bold">
              <em>Favourite show(s)</em>
            </p>
            <p className="text-[0.65rem]">
              Scavenger&#39;s Reign / Dark Crystal AoR / Black Mirror
            </p>
          </motion.div>
          <motion.div variants={contentVariants}>
            <span className="text-3xl">🔊</span>
            <p className="font-bold">
              <em>Current listen</em>
            </p>
            <p className="text-[0.65rem]">
              <em>Technaturalism</em>
            </p>
            <p className="text-[0.65rem]">Immortal Onion</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
