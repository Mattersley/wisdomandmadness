import WisdomAndMadnessLogo from '@/assets/WisdomLogo'

const Nav = () => (
  <div className="flex flex-row justify-between w-[90%] mx-auto pt-10">
    <div
      className="flex flex-row items-center rounded-[3rem] w-[70%] h-16 bg-white">
      <div className="size-10 ml-10">
        <WisdomAndMadnessLogo />
      </div>
      <p className="ml-2 text-xs">Wisdom + Madness Design Co.</p>
    </div>
    <div
      className="flex bg-gradient-to-tl hover:bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] text-center items-center right-[5%] rounded-[3rem] w-[8%] h-16 text-white">
      <p className="text-xs w-full tracking-widest">GET STARTED</p>
    </div>
  </div>
)

export default Nav