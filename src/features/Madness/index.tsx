import Hero from '@/features/Madness/Hero'
import Parallax from '@/features/Madness/Parallax/Parallax'
import About from '@/features/Madness/About/About'
import Footer from '@/features/Madness/Footer/Footer'
import Portfolio from '@/features/Madness/Portfolio/Portfolio'
import { useContext, useRef } from 'react'
import Egg from '@/features/Madness/Eggs/Egg'
import { EggContext } from '@/features/Madness/Eggs/context/eggContext'

const Madness = ({
  containerRef
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { eggs } = useContext(EggContext)

  const workRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <section className="w-full">
        <Hero refs={{ workRef, aboutRef, footerRef }} />
      </section>
      <section className="z-100 w-full" ref={workRef}>
        <Portfolio />
        <div className="relative hidden xl:block">
          <div className="absolute right-1/2 -bottom-12">
            <div className="-mr-[29vw] flex w-[58vw] flex-row items-center justify-between border-b border-gray-500/10">
              <div className="h-4 border-r border-gray-500/10" />
              <div className="h-4 border-r border-gray-500/10" />
            </div>
            <div className="-mt-4 h-40 border-r border-gray-500/10" />
          </div>
        </div>
      </section>
      {!eggs.eggList[2].found && (
        <div className="pointer-events-auto absolute bottom-1/4 left-1/2 z-50 -mb-53 -ml-3 opacity-40">
          <Egg id={2} />
        </div>
      )}
      <section className="relative -z-100 w-full">
        <Parallax container={containerRef} />
      </section>
      <section className="w-full" ref={aboutRef}>
        <About />
      </section>
      <section className="w-full" ref={footerRef}>
        <Footer />
      </section>
    </>
  );
}

export default Madness
