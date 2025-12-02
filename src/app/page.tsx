'use client'

import Portfolio from '@/features/Portfolio/Portfolio'
import { useState } from 'react'
import Footer from '@/features/Footer/Footer'
import Parallax from '@/features/Parallax/Parallax'
import Cursor from '@/features/Shared/Cursor/components/Cursor'
import About from '@/features/About/About'
import Header from '@/features/Header/Header'
import EggCounter from '@/features/Egg/EggCounter'
import { useRef } from 'react'
import { useContact } from '@/context/contactContext'

const Home = () => {
  const containerRef = useRef(null)
  const [currentProject, setCurrentProject] = useState<string>('')
  const { isOpen } = useContact()
  
  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 mr-20">
        <EggCounter />
      </div>
      <Cursor helpMode />
      <main
        className={`no-scrollbar h-screen w-screen sm:snap-y overflow-x-clip ${isOpen ? 'overflow-hidden' : 'overflow-auto'} ${currentProject ? 'overflow-hidden' : 'overflow-auto'}`}
        ref={containerRef}
      >
        <section className="w-full snap-start ">
          <Header />
        </section>
        <section className="w-full snap-start snap-mandatory">
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
