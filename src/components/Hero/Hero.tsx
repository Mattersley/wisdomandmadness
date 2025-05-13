import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import LavaLamp from '@/components/ui/LavaLamp/LavaLamp'
import LogoText from '@/components/ui/LogoText/LogoText'
import HeaderFeatures from '@/components/ui/HeaderFeatures/HeaderFeatures'

const Hero = () => (
  <div className="relative flex flex-col size-full">
    <div className="flex flex-col md:flex-row w-full h-screen mt-8">
      <div className="flex flex-col items-center md:items-end h-full md:w-[30%] p-10">
        <div className="text-center md:text-right flex flex-col items-center md:items-end md:mb-10">
          <div className="relative">
            <div className="w-28 text-white">
              <WisdomAndMadnessLogo />
            </div>
            <div className="absolute bg-gradient-to-tl hover:bg-gradient-to-tr from-[#3F5EFB]/60 to-[#FC466B]/60 rounded-4xl top-10 left-7 size-12 mb-6" />
          </div>
          <h1 className="sm:w-96 mt-10 tracking-tight text-4xl sm:text-6xl font-gabarito text-wrap text-white">
            Small Business Web Design
          </h1>
          <div className="w-80 text-sm">
            <div className="mt-6 flex flex-row items-center justify-center lg:justify-end">
              <p className="text-white opacity-40">
                100% custom, human-coded, creative websites
              </p>
              <div className="hidden lg:block text-white my-auto ml-4 scale-105">
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
                  <path d="M11 11.5v-1a1.5 1.5 0 0 1 3 0v1.5"></path>
                  <path d="M17 12v-6.5a1.5 1.5 0 0 1 3 0v10.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
                  <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5"></path>
                  <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row items-center justify-center lg:justify-end">
              <p className="text-white opacity-40">
                Innovative pricing structures, 24/7 support, and a dedicated
                team
              </p>
              <div className="hidden lg:block text-white my-auto ml-4 scale-105">
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
                  <path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z"></path>
                  <path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592"></path>
                  <path d="M7 10h-.01"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row items-center justify-center lg:justify-end">
              <p className="text-white opacity-40">
                No design, no fee
              </p>
              <div className="hidden lg:block text-white my-auto ml-4 scale-105">
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
                  <path d="M5 21v-16m2 -2h10a2 2 0 0 1 2 2v10m0 4.01v1.99l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
                  <path d="M11 7l4 0"></path>
                  <path d="M9 11l2 0"></path>
                  <path d="M13 15l2 0"></path>
                  <path d="M15 11l0 .01"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row items-center justify-center lg:justify-end">
              <p className="text-white opacity-40">
                From single page websites, to enterprise app development
              </p>
              <div className="hidden lg:block text-white my-auto ml-4 scale-105">
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
                  <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M14 7l6 0"></path>
                  <path d="M17 4l0 6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white -mt-[17rem] sm:-mt-64 md:mt-0 rounded-3xl ml-[5%] h-32 sm:h-40 w-[90%] md:h-[96%] md:w-[62%] md:ml-8">
        <LavaLamp />
        <div className="absolute top-10 w-full left-20">
          <HeaderFeatures />
        </div>
      </div>
    </div>
    <div className="text-white top-64 -left-36 sm:-left-28 md:left-0 absolute sm:bottom-[50rem] md:bottom-[45rem] -rotate-90 self-end sm:scale-200">
      <LogoText sizeM={1.75} sizeW={1} />
    </div>

    {/*<div className="absolute -bottom-15 sm:-bottom-24 bg-white rounded-3xl h-20 w-[80%] sm:h-40 sm:w-96 mb-6">*/}
    {/*  <LavaLamp />*/}
    {/*</div>*/}
  </div>
)

export default Hero
