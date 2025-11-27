import React from 'react'
import Image from 'next/image'

const Pando = () => (
  <div className="flex h-full w-full flex-col items-center">
    <div className="mt-10 relative flex">
      <Image alt="pando logo" height={100} src={'/images/Portfolio/CaseStudies/PandoLogo.png'} width={200} />
    </div>
  </div>
)

export default Pando
