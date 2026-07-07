import Portfolio from '@/features/Madness/Portfolio/Portfolio'
import Parallax from '@/features/Madness/Parallax/Parallax'
import About from '@/features/Madness/About/About'
import Footer from '@/features/Madness/Footer/Footer'
import { useContext } from 'react'
import { WormContext } from '@/context/wormContext'
import Hero from '@/features/Madness/Hero'

const Madness = ({containerRef}: {containerRef: React.RefObject<HTMLDivElement | null>}) => {
  const { setCurrentProject, currentProject } = useContext(WormContext)

  return (
    <>
      <section className="w-full">
        <Hero />
      </section>
      <section className="w-full">
        <Portfolio
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      </section>
      <section className="w-full">
        <Parallax container={containerRef} />
      </section>
      <section className="w-full">
        <About />
      </section>
      <section className="w-full">
        <Footer />
      </section>
    </>
  ) 
}

export default Madness