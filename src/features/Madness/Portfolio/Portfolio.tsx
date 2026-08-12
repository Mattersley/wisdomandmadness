import React, { useContext } from 'react'
import Egg from '@/features/Madness/Egg/Egg'
import Cards from '@/features/Madness/Portfolio/components/Cards/Cards'
import { EggContext } from '@/context/eggContext'

const Portfolio = () => {
  const { eggs } = useContext(EggContext)

  return (
    <div
      className={
        'no-scrollbar flex h-auto min-h-screen w-screen snap-mandatory snap-center flex-col items-center justify-start bg-white px-10 py-20 sm:px-10 md:px-30 md:pt-32'
      }
      id="work"
    >
      <div className="w-full">
        <Cards />
      </div>
      {!eggs.eggList[0].found && (
        <div className="mt-40 -mr-20 -mb-40 ml-auto h-8">
          <Egg id={1} />
        </div>
      )}
    </div>
  )
}

export default Portfolio
