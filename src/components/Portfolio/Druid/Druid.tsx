import React from 'react'
import Image from 'next/image'

const Druid = () => (
  <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
    <div className="mt-10 relative flex">
      <Image alt="druid logo" height={100} src={'/images/Portfolio/CaseStudies/DruidLogo.png'} width={150} />
    </div>
  </div>
)

export default Druid
