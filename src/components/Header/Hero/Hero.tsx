import LavaLamp from '@/components/ui/LavaLamp/LavaLamp'
import Nav from '@/components/Header/Nav/Nav'
import HeroText from '@/components/Header/Hero/HeroText'
import TorusKnot from '@/components/ui/3dDonut/TorusKnot'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="relative z-[1] flex size-full">
      <div className="h-screen w-full flex-row px-20">
        <Nav />
        <div className="relative flex h-[95%] w-full flex-col gap-x-6">
          <div className="3xl:pt-12 absolute top-20 left-20 z-20 -mt-14 rounded-3xl bg-neutral-950 px-20 pb-3">
            <HeroText />
            <div className="3xl:block absolute -right-28 -bottom-28 hidden size-60 rounded-4xl bg-gradient-to-tl from-[#3F5EFB]/50 to-[#FC466B]/50"></div>
          </div>
          <div className="relative z-[1] -mt-14 mr-28 size-full rounded-3xl bg-white">
            <div className="absolute top-0 right-0 z-[2] h-18 w-[28rem] rounded-bl-3xl bg-neutral-950" />
            <div className="absolute top-[4.5rem] right-0 rotate-90 z-10">
              <Image
                alt="image"
                height={20}
                src={'/images/corner.png'}
                width={20}
              />
            </div>
            <div className="absolute top-0 right-[28rem] rotate-90 z-10">
              <Image
                alt="image"
                height={20}
                src={'/images/corner.png'}
                width={20}
              />
            </div>
            <TorusKnot />
            <LavaLamp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
