import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import Link from 'next/link'
import Contact from '@/features/Madness/Contact/Contact'
import React, { useContext } from 'react'
import { WormContext } from '@/context/wormContext'
import Popover from '@/features/Shared/Popover/Popover'
import Blobover from '@/features/Shared/Popover/Blobover'

const Nav = () => {
  const { setWorm } = useContext(WormContext)

  return (
    <div className="relative flex w-full flex-col items-end justify-between gap-y-4 px-4 pt-6 sm:px-6 sm:pt-8 md:px-0">
      <div className="flex size-12 h-16 w-full flex-row items-center justify-between rounded-[3rem] bg-white px-6 sm:px-10">
        <div className="flex flex-row items-center">
          <div className="size-10 text-black">
            <WisdomAndMadnessLogo />
          </div>
          <p className="ml-2 hidden text-xs sm:block">
            Wisdom + Madness Design Co.
          </p>
        </div>
        <div className="z-50 ml-6 hidden flex-row items-center gap-4 sm:flex">
          <Link href="#work">
            <p className="text-xs tracking-widest">WORK</p>
          </Link>
          <Link href="#about">
            <p className="text-xs tracking-widest">ABOUT</p>
          </Link>
        </div>
      </div>
      {/*<div className="absolute top-36 left-24 z-50">*/}
      {/*  <div className="mr-4 flex flex-row items-center gap-2 rounded-full bg-white/10 p-2 backdrop-blur-sm">*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'default' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('default')}*/}
      {/*      title="Reset"*/}
      {/*    >*/}
      {/*      <RefreshCcw size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'spin' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('spin')}*/}
      {/*      title="Hyper Spin"*/}
      {/*    >*/}
      {/*      <RotateCw size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'float' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('float')}*/}
      {/*      title="Zero Gravity"*/}
      {/*    >*/}
      {/*      <Move size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'explode' ? 'bg-rose-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('explode')}*/}
      {/*      title="Explode"*/}
      {/*    >*/}
      {/*      <Bomb size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'ghost' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('ghost')}*/}
      {/*      title="Ghost Mode"*/}
      {/*    >*/}
      {/*      <Ghost size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'pulse' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('pulse')}*/}
      {/*      title="Heartbeat"*/}
      {/*    >*/}
      {/*      <Activity size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'jiggle' ? 'bg-indigo-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('jiggle')}*/}
      {/*      title="Jiggle"*/}
      {/*    >*/}
      {/*      <Drum size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'disco' ? 'bg-fuchsia-500 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('disco')}*/}
      {/*      title="Disco"*/}
      {/*    >*/}
      {/*      <Sparkles size={16} />*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      className={`rounded-lg p-2 transition-all duration-300 ${logoState === 'meltdown' ? 'bg-orange-600 text-white scale-110' : 'text-neutral-400 hover:bg-white/10'}`}*/}
      {/*      onClick={() => setLogoState('meltdown')}*/}
      {/*      title="Meltdown"*/}
      {/*    >*/}
      {/*      <Flame size={16} />*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="z-50 mx-auto flex flex-row gap-2 md:mx-0 md:ml-2">
        <div className="z-20 flex flex-row gap-2 self-end">
          <Blobover
            colour="rose"
            trigger={
              <button
                className="absolute top-8 right-[21vw] hidden size-12 items-center justify-center rounded-[50%] bg-rose-500 text-white hover:bg-gray-500 sm:relative sm:top-auto sm:right-auto sm:flex sm:size-16"
                onClick={() => setWorm('ID')}
                type="button"
              >
                <svg
                  className="mx-auto size-6 sm:size-8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>
                  <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>
                  <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"></path>
                  <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"></path>
                  <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"></path>
                  <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"></path>
                </svg>
              </button>
            }
          >[???]</Blobover>

          <Blobover
            colour="indigo"
            trigger={
              <button
                className="absolute top-8 right-[7vw] flex size-12 items-center justify-center rounded-[50%] bg-indigo-500 text-white hover:bg-gray-500 sm:relative sm:top-auto sm:right-auto sm:size-16"
                type="button"
              >
                <span className="size-full">
                  <svg
                    className="mx-auto mt-4 size-6 sm:size-8"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                    <path d="M15 6l3 3" />
                    <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                    <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                  </svg>
                </span>
              </button>
            }
          >
            INQUIRY WIZARD
          </Blobover>

          <Blobover
            colour="white"
            position="bottom"
            trigger={
              <a
                className="hidden size-12 items-center justify-center rounded-[50%] bg-white hover:bg-gray-500 hover:text-white sm:flex sm:size-16"
                href="mailto:webinquiry@wisdomandmadness.com?subject=Inquiry%20from%20Wisdom%20and%20Madness%20Website"
              >
                <svg
                  className="mr-0 ml-1 size-6 sm:size-9"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  viewBox="0 0 28 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5" />
                  <path d="M19 22v.01" />
                  <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </a>
            }
          >
            EMAIL US
          </Blobover>
        </div>
        <Contact />
        {/*<div className="right-[5%] z-20 hidden items-center rounded-[3rem] wnm-gradient text-center text-white hover:bg-gradient-to-tr sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52">*/}
        {/*  <p className="w-full text-xs font-bold tracking-widest">GET STARTED</p>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default Nav
