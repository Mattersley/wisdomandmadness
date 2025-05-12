import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import LavaLamp from '@/components/ui/LavaLamp/LavaLamp'
import LogoText from '@/components/ui/LogoText/LogoText'
import HeaderFeatures from '@/components/ui/HeaderFeatures/HeaderFeatures'

const Hero = () => (
  <div className="relative flex flex-col size-full">
    <div className="flex flex-row w-full h-full mt-8">
      <div className="flex flex-col items-end h-full w-[30%] p-10">
        <div className="text-right flex flex-col items-end mb-10">
          <div className="relative">
            <div className="w-28 text-white">
              <WisdomAndMadnessLogo />
            </div>
            <div
              className="absolute bg-gradient-to-tl hover:bg-gradient-to-tr from-[#3F5EFB]/60 to-[#FC466B]/60 rounded-4xl top-10 left-7 size-12 mb-6" />
          </div>
          <h1
            className="sm:w-96 mt-10 tracking-tight text-4xl sm:text-6xl font-gabarito text-wrap text-white">
            Small Business Web Design
          </h1>
          <p className="sm:w-96 mt-6 text-white opacity-40 sm:text-xl">
            100% custom, human-coded, creative websites.
          </p>
        </div>
        {/*<button*/}
        {/*  className="mb-10 hover:bg-green-900 rounded-l-3xl text-white flex flex-row items-center justify-center p-4 sm:p-3 sm:px-5 mt-6 bg-gradient-to-tl hover:bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B]">*/}
        {/*  <p className="text-xs font-light">Get in touch</p>*/}
        {/*  <div className="ml-2">*/}
        {/*    <svg*/}
        {/*      fill="none"*/}
        {/*      height="16"*/}
        {/*      stroke="currentColor"*/}
        {/*      strokeLinecap="round"*/}
        {/*      strokeLinejoin="round"*/}
        {/*      strokeWidth="1.3"*/}
        {/*      viewBox="0 0 24 24"*/}
        {/*      width="16"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*    >*/}
        {/*      <path d="M10 14l11 -11"></path>*/}
        {/*      <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*</button>*/}
      </div>
      <div className="relative bg-white rounded-3xl h-[96%] w-[62%] ml-8">
        <LavaLamp />
        <div className="absolute top-10 w-full left-20"><HeaderFeatures /></div>
      </div>
    </div>
    <div className="text-white -left-10 absolute bottom-[40rem] -rotate-90 self-end scale-200">
      <LogoText />
    </div>
    {/*<div className="absolute -bottom-15 sm:-bottom-24 bg-white rounded-3xl h-20 w-[80%] sm:h-40 sm:w-96 mb-6">*/}
    {/*  <LavaLamp />*/}
    {/*</div>*/}
  </div>
)

export default Hero
