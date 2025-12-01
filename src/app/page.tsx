'use client'

import Portfolio from '@/features/Portfolio/Portfolio'
import { SetStateAction, useState } from 'react'
import Footer from '@/features/Footer/Footer'
import Parallax from '@/features/Parallax/Parallax'
import Cursor from '@/features/Shared/Cursor/components/Cursor'
import About from '@/features/About/About'
import Header from '@/features/Header/Header'
import EggCounter from '@/features/Egg/EggCounter'
import { useRef } from 'react'

const Home = () => {
  const containerRef = useRef(null)
  const [currentProject, setCurrentProject] = useState<string>('')

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <EggCounter />
      </div>
      <Cursor helpMode />
      <main
        className={`h-screen w-screen snap-y overflow-x-clip scroll-smooth ${currentProject ? 'overflow-hidden' : 'overflow-auto'}`}
        ref={containerRef}
      >
        <section className="w-full snap-none">
          <Header />
        </section>
        <section className="w-full snap-start">
          <Portfolio
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
        </section>
        <section className="w-full snap-none">
          <Parallax container={containerRef} />
        </section>
        <section className="w-full snap-none">
          <About />
        </section>
        <section className="w-full snap-none">
          <Footer />
        </section>
      </main>
    </>
  )
}

export default Home
