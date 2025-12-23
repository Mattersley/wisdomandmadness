import Hero from '@/features/Madness/Header/Hero/Hero'
import { useContext } from 'react'
import { WormContext } from '@/context/wormContext'

const Header = () => {
  const { observerNumber } = useContext(WormContext)

  return (
    <div className="w-screen snap-start bg-neutral-950 sm:pt-6 md:h-screen">
      <button
        className='font-vt323 absolute top-4 left-[48vw] z-50 hidden rounded-2xl border px-3 text-neutral-700 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white sm:block'
      >
        OBS#{observerNumber}-MADNESS
      </button>
      <Hero />
    </div>
  )
}

export default Header
