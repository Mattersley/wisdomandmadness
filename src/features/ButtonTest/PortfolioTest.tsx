import React, { useContext } from 'react'
import Egg from '@/features/Madness/Egg/Egg'
import ButtonTest from '@/features/ButtonTest/ButtonTest'
import { EggContext } from '@/context/eggContext'

const PortfolioTest = () => {
  const { eggs } = useContext(EggContext)

  return (
    <div
      className={
        'no-scrollbar relative flex h-auto min-h-screen w-screen snap-mandatory snap-center flex-col items-center justify-start bg-white px-10 py-20 sm:px-10 md:px-30 md:pt-32'
      }
      id="work"
    >
      <div>
        <ButtonTest />
      </div>
      {!eggs.eggList[0].found && (
        <div className="absolute right-3 bottom-3 sm:right-10 sm:bottom-10">
          <Egg id={1} />
        </div>
      )}
    </div>
  )
}

export default PortfolioTest
