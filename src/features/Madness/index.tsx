import Header from '@/features/Madness/Header/Header'
import Portfolio from '@/features/Madness/Portfolio/Portfolio'
import Parallax from '@/features/Madness/Parallax/Parallax'
import About from '@/features/Madness/About/About'
import Footer from '@/features/Madness/Footer/Footer'
import { useContext } from 'react'
import { WormContext } from '@/context/wormContext'

const Madness = ({containerRef}: {containerRef: React.RefObject<HTMLDivElement | null>}) => {
  const { setCurrentProject, currentProject } = useContext(WormContext)

  return (
    <>
      <section className="w-full snap-start">
        <Header />
      </section>
      <section className="w-full snap-mandatory snap-start">
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
    </>
  ) 
}

export default Madness