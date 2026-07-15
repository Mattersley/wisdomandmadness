import { motion } from 'motion/react'
import ProfileCard from '@/features/Madness/About/components/ProfileCard'
import TriviaCard from '@/features/Madness/About/components/TriviaCard'

const About = () => {
  return (
    <div
      className="relative flex w-screen flex-col items-center bg-neutral-950 py-20 text-white select-none"
      id="about"
    >
      <h2
        className={
          'font-vagra bg-linear-to-tr from-[#3F5EFB] to-[#FC466B] bg-clip-text text-[7rem] text-transparent'
        }
      >
        About
      </h2>
      <motion.p
        className="mt-4 mb-12 rounded-full border border-indigo-500 px-6 py-1 font-mono text-xs tracking-[0.25em] text-indigo-500 uppercase transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        CORE TEAM
      </motion.p>
      <div className="mb-10 flex flex-col items-center text-center xl:mr-20 md:grid md:w-240 md:grid-cols-2 md:flex-row md:items-start md:gap-5 md:text-right lg:w-[90%]">
        <ProfileCard />
        <p className="px-4 sm:px-0 mb-4 w-[90%] self-center text-white/80 sm:w-[60%] md:ml-6 md:text-left">
          Using his education in data wrangling, experience in design, and
          history in web technologies, Matt can translate your most complex of
          concepts and ideas into elegant, creative solutions.
        </p>
      </div>
      <TriviaCard />
    </div>
  )
}

export default About
