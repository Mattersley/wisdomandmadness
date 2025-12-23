import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import React from 'react'

const PortfolioNavBar = () => {
  
  return (
    <div className="relative flex h-16 w-full flex-row items-center justify-between gap-2 border-y border-b-2 border-gray-200 border-b-black px-2">
      {/*<div className="hidden flex-row items-center gap-2 text-xs md:flex">*/}
      {/*  <p>Web App</p>*/}
      {/*  <p>UI/UX</p>*/}
      {/*  <p>F&B</p>*/}
      {/*  <p>Branding</p>*/}
      {/*  <p>Packaging</p>*/}
      {/*</div>*/}
      <div className="absolute bottom-2.5 flex h-12 w-30 flex-row justify-center text-gray-500 md:left-[47%]">
        <WisdomAndMadnessLogo />
        <p className="mt-5 ml-2 text-xs tracking-widest">WORK</p>
      </div>
      {/*<div className="flex flex-row">*/}
      {/*  <svg*/}
      {/*    fill="none"*/}
      {/*    height="16"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    strokeWidth="1"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    width="16"*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*  >*/}
      {/*    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>*/}
      {/*    <path d="M21 21l-6 -6"></path>*/}
      {/*  </svg>*/}
      {/*  <svg*/}
      {/*    fill="none"*/}
      {/*    height="16"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    strokeWidth="1"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    width="16"*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*  >*/}
      {/*    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>*/}
      {/*    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>*/}
      {/*    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>*/}
      {/*  </svg>*/}
      {/*</div>*/}
    </div>
  )
}

export default PortfolioNavBar