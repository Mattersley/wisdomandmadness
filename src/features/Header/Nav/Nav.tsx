import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import Link from 'next/link'
import Contact from '@/features/Contact/Contact'

const Nav = () => (
  <div className="relative px-4 sm:px-6 md:px-0 flex w-full flex-col items-end justify-between gap-y-4 pt-6 sm:pt-8">
    <div className="flex size-12 h-16 w-full flex-row items-center justify-between rounded-[3rem] bg-white px-6 sm:px-10">
      <div className="flex flex-row items-center">
        <div className="size-10 text-black">
          <WisdomAndMadnessLogo />
        </div>
        <p className="ml-2 hidden text-xs sm:block">
          Wisdom + Madness Design Co.
        </p>
      </div>
      <div className="ml-6 hidden z-50 flex-row items-center gap-4 sm:flex">
        <Link href="#work">
          <p className="text-xs tracking-widest">WORK</p>
        </Link>
        <Link href="#about">
          <p className="text-xs tracking-widest">ABOUT</p>
        </Link>
      </div>
    </div>
    <div className="mx-auto md:mx-0 flex flex-row gap-2 md:ml-2 z-50">
      <div className="z-20 flex flex-row gap-2 self-end">
        <Link href="/wisdom">
          <div className="hidden absolute top-8 right-[21vw] sm:flex size-12 items-center justify-center rounded-[50%] bg-rose-500 text-white hover:bg-gray-500 sm:relative sm:top-auto sm:right-auto sm:size-16">
            <svg
              className="mx-auto size-6 sm:size-[32px]"
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
          </div>
        </Link>
        <div className="absolute top-8 right-[7vw] flex size-12 items-center justify-center rounded-[50%] bg-indigo-500 text-white hover:bg-gray-500 sm:relative sm:top-auto sm:right-auto sm:size-16">
          <span className="size-full">
            <svg
              className="mx-auto mt-3 size-6 sm:mt-4 sm:size-[32px]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
              <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
            </svg>
          </span>
        </div>
        <a
          className="hidden size-12 items-center justify-center rounded-[50%] bg-white hover:bg-gray-500 hover:text-white sm:flex sm:size-16"
          href="mailto:webinquiry@wisdomandmadness.com?subject=Inquiry%20from%20Wisdom%20and%20Madness%20Website"
        >
          <svg
            className="mx-auto size-6 sm:size-[32px]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
            viewBox="0 0 28 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
          </svg>
        </a>
      </div>
      <Contact />
      {/*<div className="right-[5%] z-20 hidden items-center rounded-[3rem] wnm-gradient text-center text-white hover:bg-gradient-to-tr sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52">*/}
      {/*  <p className="w-full text-xs font-bold tracking-widest">GET STARTED</p>*/}
      {/*</div>*/}
    </div>
  </div>
)

export default Nav
