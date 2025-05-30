import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import Link from 'next/link'

const Nav = () => (
  <div className="z-10 flex w-full flex-col items-end justify-end gap-y-4 pt-6 sm:justify-between sm:pt-8">
    <div className="flex size-12 flex-row items-center justify-center rounded-[3rem] bg-white px-3 sm:h-16 sm:w-full sm:justify-between sm:px-10">
      <div className="flex flex-row items-center">
        <div className="size-10">
          <WisdomAndMadnessLogo />
        </div>
        <p className="ml-2 hidden text-xs sm:block">
          Wisdom + Madness Design Co.
        </p>
      </div>
      <div className="ml-6 hidden flex-row items-center gap-4 sm:flex">
        <p className="text-xs tracking-widest">WORK</p>
        <p className="text-xs tracking-widest">TEAM</p>
        <p className="text-xs tracking-widest">PRICING</p>
        <p className="text-xs tracking-widest">CONTACT</p>
      </div>
    </div>
    <div className="flex flex-row gap-2 md:ml-2">
      <div className="z-20 flex flex-row gap-2 self-end">
        <Link href="/wisdom">
          <div className="flex size-12 items-center justify-center rounded-[50%] bg-rose-500 text-white hover:bg-gray-500 sm:size-16">
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
        <div className="flex size-12 items-center justify-center rounded-[50%] bg-indigo-500 text-white hover:bg-gray-500 sm:size-16">
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
        <div className="hidden size-12 items-center justify-center rounded-[50%] bg-white sm:flex sm:size-16">
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
        </div>
      </div>
      <div className="z-20 right-[5%] hidden items-center rounded-[3rem] bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] text-center text-white hover:bg-gradient-to-tr sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52">
        <p className="w-full text-xs font-bold tracking-widest">GET STARTED</p>
      </div>
    </div>
  </div>
)

export default Nav
