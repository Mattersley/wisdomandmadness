'use client'

import Portfolio from '@/components/Portfolio/Portfolio'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Footer from '@/components/Footer/Footer'
import Parallax from '@/components/Parallax/Parallax'
import Cursor from '@/components/ui/Cursor/Cursor'
import About from '@/components/About/About'
import Header from '@/components/Header/Header'
import EggCounter from '@/components/Egg/EggCounter'

const Home = () => {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <div>
      <div className="right-6 z-50 bottom-6 fixed">
        <EggCounter />
      </div>
      <Cursor helpMode />
      <main className={`snap-y snap-mandatory h-full ${current !== '' && 'overflow-hidden'}`}>
        <Header />
        <Portfolio current={current} setCurrent={setCurrent} />
        <Parallax />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default Home
