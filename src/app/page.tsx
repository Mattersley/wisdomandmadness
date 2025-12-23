'use client'

import { useContext } from 'react'
import Cursor from '@/features/Shared/Cursor/components/Cursor'
import EggCounter from '@/features/Madness/Egg/EggCounter'
import { useRef } from 'react'
import { useContact } from '@/context/contactContext'
import Splash from '@/features/Splash/Splash'
import { WormContext } from '@/context/wormContext'
import Wisdom from '@/features/Wisdom'
import Madness from '@/features/Madness'

const Home = () => {
  const containerRef = useRef(null)
  const { worm, currentProject, seenSplash} = useContext(WormContext)
  const { isOpen } = useContact()

  return (
    <>
      {!seenSplash ? (
        <Splash />
      ) : (
        <>
          <div className="fixed right-6 bottom-6 z-50 mr-20">
            <EggCounter />
          </div>
          <Cursor helpMode />
          <main
            className={`no-scrollbar h-screen w-screen overflow-x-clip sm:snap-y ${isOpen ? 'overflow-hidden' : 'overflow-auto'} ${currentProject ? 'overflow-hidden' : 'overflow-auto'}`}
            ref={containerRef}
          >
            {worm === 'madness' && <Madness containerRef={containerRef} />}
            {worm === 'wisdom' && <Wisdom />}
          </main>
        </>
      )}
    </>
  )
}

export default Home
