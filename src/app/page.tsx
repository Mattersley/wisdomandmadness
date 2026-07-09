'use client'

import { useContext } from 'react'
import EggCounter from '@/features/Madness/Egg/EggCounter'
import { useRef } from 'react'
import { useContact } from '@/context/contactContext'
import { WormContext } from '@/context/wormContext'
import ID from '@/features/ID'
import Madness from '@/features/Madness'
import LoadingScreen from '@/features/Shared/LoadingScreen/LoadingScreen'
import { preloadSceneAssets } from '@/hooks/sceneLoader'
import CurtainWipeTransition from '@/features/Shared/Transitions/CurtainWipeTransition'
import Inquire from '@/features/Inquire/Inquire'

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
        className={`no-scrollbar relative h-screen w-screen overflow-x-clip ${isOpen ? 'overflow-hidden' : 'overflow-auto'} ${currentProject ? 'overflow-hidden' : 'overflow-auto'}`}
        ref={containerRef}
      >
        <CurtainWipeTransition
          curtainColor={
            worm === 'ID'
              ? 'bg-rose-500'
              : worm === 'inquire'
                ? 'bg-indigo-500'
                : 'bg-neutral-950'
          }
          panelCount={6}
          triggerKey={worm}
        >
          {worm === 'madness' && <Madness containerRef={containerRef} />}
          {worm === 'ID' && <ID />}
          {worm === 'inquire' && <Inquire />}
        </CurtainWipeTransition>
      </main>
    </>
  )
}

export default Home
