import LavaLamp from '@/features/Shared/LavaLamp/LavaLamp'
import Nav from '@/features/Header/Nav/Nav'
import ThreeD from '@/features/Shared/3dDonut/ThreeD'
import Image from 'next/image'
import React from 'react'
import HeroText from '@/features/Header/Hero/HeroText'

const Hero = () => {
  return (
    <div className="relative flex size-full md:-mb-24">
      <div className="w-full flex-row md:px-20">
        <Nav />
        <ThreeD />
        <div className="relative flex h-[95%] w-full flex-col md:gap-x-6">
          <div className="relative -mb-6 min-h-[70vh] z-30 w-[98%] md:w-full rounded-3xl bg-white sm:mt-4 md:z-[1] md:-mt-14 md:mr-28 md:min-h-[90vh]">
            {/*Header Buttons BG*/}
            <div className="absolute top-0 right-0 z-[2] hidden h-18 w-[28rem] rounded-bl-3xl bg-neutral-950 md:block md:w-[24.5rem] lg:w-[28rem]" />
            {/*Corners of LavaLamp*/}
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
            <HeroText />
            <LavaLamp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
