import LavaLamp from '@/features/Madness/Hero/features/LavaLamp/LavaLamp'
import Nav from '@/features/Madness/Hero/features/Nav/Nav'
import ThreeD from '@/features/Madness/Hero/features/ThreeDText/ThreeDText'
import Image from 'next/image'
import React, { useContext } from 'react'
import HeroText from '@/features/Madness/Hero/features/HeroText/HeroText'
import { WormContext } from '@/context/wormContext'

export interface RefProps {
  refs: {
    workRef: React.RefObject<HTMLDivElement | null>;
    aboutRef: React.RefObject<HTMLDivElement | null>;
    footerRef: React.RefObject<HTMLDivElement | null>;
  };
}

const Hero = ({ refs }: RefProps) => {
  const { observerNumber } = useContext(WormContext)

  return (
    <div className="w-screen snap-start bg-neutral-950 sm:pt-6 md:h-screen">
      <div className="relative z-10 flex size-full md:-mb-24">
        <button className="font-vt323 absolute -top-2 left-1/2 z-40 -ml-16 hidden rounded-2xl border px-3 text-neutral-700 select-none hover:border-indigo-500 hover:bg-indigo-500 hover:text-white sm:block">
          OBS#{observerNumber}-MADNESS
        </button>
        <div className="w-full flex-row md:px-20">
          <Nav refs={refs} />
          <div className="pointer-events-none absolute inset-0">
            <ThreeD />
          </div>

          <div className="relative flex h-[95%] w-full flex-col md:gap-x-6">
            <div className="relative z-1 mx-auto -mb-12 min-h-[120vh] w-[98%] rounded-3xl bg-white sm:mt-4 sm:min-h-[90vh] md:-mt-14 md:min-h-[95vh] md:w-full">
              <div className="absolute top-0 right-0 z-2 hidden h-18 w-md rounded-bl-3xl bg-neutral-950 md:block md:w-98 lg:w-md" />
              <div className="absolute top-18 right-0 z-10 hidden rotate-90 md:block">
                <Image
                  alt="image"
                  height={20}
                  src={'/images/corner.png'}
                  width={20}
                />
              </div>
              <div className="absolute top-0 right-112 z-10 hidden rotate-90 md:right-98 md:block lg:right-112">
                <Image
                  alt="image"
                  height={20}
                  src={'/images/corner.png'}
                  width={20}
                />
              </div>
              <div className="absolute top-26 right-6 z-2 hidden flex-col gap-3 text-right text-xs lg:flex">
                <p>linear-gradient()</p>
                <div className="flex flex-row justify-end gap-2">
                  <div className="size-4 rounded-[50%] bg-[#FC466B]" />
                  <p className="text-[#FC466B]">#FC466B</p>
                </div>
                <div className="flex flex-row justify-end gap-2">
                  <div className="size-4 rounded-[50%] bg-[#3F5EFB]" />
                  <p className="text-[#3F5EFB]">#3F5EFB</p>
                </div>
              </div>
              <HeroText />
              <LavaLamp />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
