'use client'

import Hero from '@/components/Hero/Hero'
import Portfolio from '@/components/Portfolio/Portfolio'
import Nav from '@/components/ui/Nav/Nav'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Footer from '@/components/ui/Footer/Footer'
import Parallax from '@/components/ui/Parallax/Parallax'

const Home = () => {
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
      <main>
        <div className="bg-neutral-950 h-screen w-screen">
          <Nav />
          <Hero />
        </div>
        <Portfolio />
        <div className="relative -mb-[25vh]">
          <Parallax />
        </div>

      </main>
      {/*<div className={`absolute flex flex-col items-center pt-10 text-5xl text-white top-10 bg-gradient-to-bl from-green-700 to-lime-900 h-[90vh] rounded-r-2xl w-[30vw] ${instrumentFont.className}`}>Wisdom</div>*/}
      {/*<div className={`absolute flex flex-col items-center pt-10 text-6xl font-semibold text-white top-10 bg-gradient-to-bl from-fuchsia-900 to-indigo-700 h-[90vh] rounded-l-2xl w-[30vw] right-0 ${vagraFont.className}`}>Madness</div>*/}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home
