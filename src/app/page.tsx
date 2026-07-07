'use client'

import { useContext } from 'react'
import EggCounter from '@/features/Madness/Egg/EggCounter'
import { useRef } from 'react'
import { useContact } from '@/context/contactContext'
import { WormContext } from '@/context/wormContext'
import Wisdom from '@/features/Wisdom'
import Madness from '@/features/Madness'
import LoadingScreen from '@/features/Shared/LoadingScreen/LoadingScreen'
import { preloadSceneAssets } from '@/hooks/sceneLoader'

preloadSceneAssets()

const Home = () => {
  const containerRef = useRef(null)
  const { worm, currentProject } = useContext(WormContext)
  const { isOpen } = useContact()

  return (
    <>
      <LoadingScreen />
        <div className="fixed right-8 bottom-6 z-50">
          <EggCounter />
        </div>
        <main
          className={`no-scrollbar h-screen w-screen overflow-x-clip ${isOpen ? 'overflow-hidden' : 'overflow-auto'} ${currentProject ? 'overflow-hidden' : 'overflow-auto'}`}
          ref={containerRef}
        >
          {worm === 'madness' && (
            <Madness containerRef={containerRef} />
          )}
          {worm === 'wisdom' && <Wisdom />}
        </main>
    </>
  )
}

export default Home
