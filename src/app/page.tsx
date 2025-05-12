import Hero from '@/components/Hero/Hero'
import Portfolio from '@/components/Portfolio/Portfolio'
import Nav from '@/components/Nav/Nav'

const Home = () => {
  return (
    <div>
      <main>
        <div className="bg-neutral-950 h-screen w-screen">
          <Nav />
          <Hero />
        </div>
        <Portfolio  />
      </main>
      {/*<div className={`absolute flex flex-col items-center pt-10 text-5xl text-white top-10 bg-gradient-to-bl from-green-700 to-lime-900 h-[90vh] rounded-r-2xl w-[30vw] ${instrumentFont.className}`}>Wisdom</div>*/}
      {/*<div className={`absolute flex flex-col items-center pt-10 text-6xl font-semibold text-white top-10 bg-gradient-to-bl from-fuchsia-900 to-indigo-700 h-[90vh] rounded-l-2xl w-[30vw] right-0 ${vagraFont.className}`}>Madness</div>*/}
      <footer className="grid grid-cols-4 items-start justify-center"></footer>
    </div>
  )
}

export default Home
