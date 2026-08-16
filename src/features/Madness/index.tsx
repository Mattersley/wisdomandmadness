import Hero from '@/features/Madness/Hero'
import Parallax from '@/features/Madness/Parallax/Parallax'
import About from '@/features/Madness/About/About'
import Footer from '@/features/Madness/Footer/Footer'
import Portfolio from '@/features/Madness/Portfolio/Portfolio'

const Madness = ({
  containerRef
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <>
      <section className="w-full">
        <Hero />
      </section>
      <section className="w-full z-100">
        <Portfolio />
      </section>
      <section className="relative w-full -z-100">
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
