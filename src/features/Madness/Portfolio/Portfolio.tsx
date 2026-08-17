import React, { useContext } from 'react'
import Egg from '@/features/Madness/Eggs/Egg'
import Cards from '@/features/Madness/Portfolio/components/Cards/Cards'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'

const Portfolio = () => {
  const { eggs } = useContext(EggContext)

  return (
    <div
      className={
        'no-scrollbar -mb-7 flex h-auto min-h-[1300px] w-screen snap-mandatory snap-center flex-col items-center justify-start rounded-b-4xl bg-white px-10 py-20 shadow-xl sm:px-10 md:px-30 md:pt-32'
      }
      id="work"
    >
      <div className="absolute right-1/2 hidden xl:block">
        <div className="-mt-20 h-60 border-r border-gray-500/10" />
        <div className="-mt-6 -mr-[29vw] flex w-[58vw] flex-row items-center justify-between border-t border-gray-500/10">
          <div className="h-4 border-r border-gray-500/10" />
          <div className="h-4 border-r border-gray-500/10" />
        </div>
      </div>
      <div className="w-full">
        <Cards />
      </div>
      {!eggs.eggList[0].found && (
        <div className="mt-20 -mb-10 ml-auto h-8 opacity-20 md:mt-10 md:-mr-20 md:-mb-10 xl:mt-10 xl:-mb-10">
          <Egg id={0} />
        </div>
      )}
    </div>
  )
}

export default Portfolio
