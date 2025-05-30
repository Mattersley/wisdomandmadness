import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import Card from '@/components/Portfolio/Card/Card'
import React, { SetStateAction } from 'react'
import Egg from '@/components/Egg/Egg'

const images = [
  { name: 'Pando', z: 20 },
  { name: 'Cupendium', z: 60 },
  { name: 'Druid', z: 60 },
  { name: 'Naturalist', z: 20 },
  { name: 'Hattersleys', z: 20 },
  { name: 'SpiritFish', z: 20 },
  { name: 'GlassRoots', z: 40 },
  { name: 'LI', z: 40 },
  { name: 'CIMS', z: 40 }
]

const Portfolio = ({current, setCurrent}: {current: string, setCurrent: React.Dispatch<SetStateAction<string>>}) => {

  return (
    <div className={'relative flex h-auto min-h-screen w-screen snap-mandatory snap-center flex-col items-center justify-start bg-white px-2 pt-40 sm:px-10 md:px-30'}>
      <div className="relative flex h-16 w-full flex-row items-center justify-between gap-2 border-y border-b-2 border-gray-200 border-b-black px-2">
        <div className="hidden flex-row items-center gap-2 text-xs sm:flex">
          <p>Web App</p>
          <p>UI/UX</p>
          <p>F&B</p>
          <p>Branding</p>
          <p>Packaging</p>
        </div>
        <p>{current}</p>
        <div className="absolute bottom-2.5 flex h-12 w-30 flex-row justify-center text-gray-500 sm:left-[65%] md:left-[47%]">
          <WisdomAndMadnessLogo />
          <p className="mt-5 ml-2 text-xs tracking-widest">WORK</p>
        </div>
        <div className="flex flex-row">
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          </svg>
        </div>
      </div>

      <div className="3xl:grid-cols-5 my-10 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {images.map((item, i) => (
          <Card
            key={i}
            current={current}
            name={item.name}
            setCurrent={setCurrent}
            z={item.z}
          />
        ))}
      </div>
      <div className="absolute right-10 bottom-10">
        <Egg id={0} />
      </div>
    </div>
  )
}

export default Portfolio
