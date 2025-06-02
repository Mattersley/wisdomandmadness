'use client'

import Portfolio from '@/components/Portfolio/Portfolio'
import { useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Parallax from '@/components/Parallax/Parallax'
import Cursor from '@/components/ui/Cursor/Cursor'
import About from '@/components/About/About'
import Header from '@/components/Header/Header'
import EggCounter from '@/components/Egg/EggCounter'
import { useLenis } from '@/hooks/useLenis'

const Home = () => {
  const [current, setCurrent] = useState('')

  useLenis()

  return (
    <div className={`${current !== '' ? 'fixed inset-0' : ''}`}>
      <div className="right-6 z-50 bottom-6 fixed">
        <EggCounter />
      </div>
      <Cursor helpMode />
      <main className={'snap-y snap-mandatory h-full'}>
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