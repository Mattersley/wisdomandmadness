import LavaLamp from '@/components/ui/LavaLamp/LavaLamp'
import Nav from '@/components/Header/Nav/Nav'
import HeroText from '@/components/Header/Hero/HeroText'
import TorusKnot from '@/components/ui/3dDonut/TorusKnot'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className="relative z-[1] flex size-full md:-mb-24">
      <div className="w-full flex-row px-4 sm:px-6 md:px-20">
        <Nav />
        <div className="relative flex h-[95%] w-full flex-col gap-x-6">
          <div className="3xl:pt-0 absolute z-20 -ml-[4vw] rounded-3xl bg-neutral-950 pb-3 text-center md:top-10 md:ml-10 lg:top-12 xl:left-20 xl:px-20">
            <HeroText />
            <div className="3xl:block absolute -right-36 -bottom-36 hidden size-60 rounded-4xl bg-gradient-to-tl from-[#3F5EFB]/50 to-[#FC466B]/50"></div>
          </div>
          <div className="md:relative absolute mt-[85vh] sm:mt-[78vh] z-50 h-72 w-full rounded-3xl bg-white sm:mb-6 sm:h-96 md:z-[1] md:-mt-14 md:mr-28 md:min-h-[120vh]">
            <div className="absolute top-0 right-0 z-[2] hidden h-18 w-[28rem] rounded-bl-3xl bg-neutral-950 md:block md:w-[24.5rem] lg:w-[28rem]" />
            <div className="absolute top-[4.5rem] right-0 z-10 hidden rotate-90 md:block">
              <Image
                alt="image"
                height={20}
                src={'/images/corner.png'}
                width={20}
              />
            </div>
            <div className="absolute top-0 right-[28rem] z-10 hidden rotate-90 md:right-[24.5rem] md:block lg:right-[28rem]">
              <Image
                alt="image"
                height={20}
                src={'/images/corner.png'}
                width={20}
              />
            </div>
            {/*<TorusKnot />*/}
            <LavaLamp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
