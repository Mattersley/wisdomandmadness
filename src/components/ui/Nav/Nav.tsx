import WisdomAndMadnessLogo from '@/assets/WisdomLogo'

const Nav = () => (
  <div className="flex gap-y-2 flex-col md:flex-row items-end md:justify-between w-[90%] mx-auto pt-10">
    <div
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-between px-10 rounded-[3rem] w-full md:w-[70%] h-20 sm:h-16 bg-white">
      <div className="flex flex-row items-center">
        <div className="size-10">
          <WisdomAndMadnessLogo />
        </div>
        <p className="ml-2 text-xs">Wisdom + Madness Design Co.</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <p className="text-xs tracking-widest">WORK</p>
        <p className="text-xs tracking-widest">TEAM</p>
        <p className="text-xs tracking-widest">PRICING</p>
        <p className="text-xs tracking-widest">CONTACT</p>
      </div>
    </div>
    <div className="md:ml-2 flex flex-row gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex w-16 h-16 bg-white items-center justify-center rounded-[50%]">
          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="1"
               viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
            <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
          </svg>
        </div>
        <div className="flex w-16 h-16 bg-white items-center justify-center rounded-[50%]">
          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
               strokeWidth="1"
               viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14l11 -11"></path>
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
          </svg>
        </div>
      </div>
      <div
        className="flex bg-gradient-to-tl hover:bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] text-center items-center right-[5%] rounded-[3rem] w-52 h-16 text-white">
        <p className="text-xs w-full tracking-widest">GET STARTED</p>
      </div>
    </div>
  </div>
)

export default Nav