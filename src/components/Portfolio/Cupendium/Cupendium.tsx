import React from 'react'
import Image from 'next/image'

const Cupendium = () => (
  <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
    <div className="mt-10 relative flex">
      <Image alt="cupendium logo" height={200} src={'/images/Portfolio/CaseStudies/CupendiumLogo.png'} width={600} />
    </div>
  </div>
)

export default Cupendium
