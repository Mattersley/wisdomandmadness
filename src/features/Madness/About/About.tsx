import ProfileCard from '@/features/Madness/About/components/ProfileCard'
import TriviaCard from '@/features/Madness/About/components/TriviaCard'

const About = () => {
  return (
    <div
      className="drop-shadow-2xl relative flex w-screen flex-col items-center -mt-7 rounded-t-4xl bg-neutral-950 py-20 text-white select-none"
      id="about"
    >
      <div className="-mt-20 h-20 border-r border-white/20" />
      <div className="w-5 border-b border-white/20" />
      <h2
        className={
          'font-vagra mb-8 bg-linear-to-tr from-[#3F5EFB] to-[#FC466B] bg-clip-text text-[4rem] text-transparent sm:text-[5rem] xl:text-[7rem]'
        }
      >
        About
      </h2>
      {/*<motion.p*/}
      {/*  className="mt-4 mb-12 rounded-full border border-indigo-500 px-6 py-1 font-mono text-xs tracking-[0.25em] text-indigo-500 uppercase transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"*/}
      {/*  whileHover={{ scale: 1.05 }}*/}
      {/*  whileTap={{ scale: 0.98 }}*/}
      {/*>*/}
      {/*  CORE TEAM*/}
      {/*</motion.p>*/}
      <div className="mb-10 flex flex-col items-center text-center md:grid md:w-240 md:grid-cols-2 md:flex-row md:items-start md:gap-5 md:text-right lg:w-[90%] xl:mr-20">
        <ProfileCard />
        <p className="mb-4 w-[90%] self-center px-4 text-white/80 sm:w-[60%] sm:px-0 md:ml-6 md:text-left">
          Using his education in data wrangling, experience in design, and
          history in web technologies, Matt can translate your most complex of
          concepts and ideas into elegant, creative solutions.
        </p>
      </div>
      <TriviaCard />
      <div className="mt-10 w-20 border-b border-white/20" />
      <div className="-mb-20 h-20 border-r border-white/20" />
    </div>
  )
}

export default About
