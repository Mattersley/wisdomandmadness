import React from 'react'
import Image from 'next/image'

const Pando = () => (
  <div className="flex h-full w-full flex-col items-center overflow-y-scroll">
    <div className="w-[50%] h-96 border relative flex">
      <Image alt="pando logo" fill src={'/images/Portfolio/PandoFG.png'} />
    </div>
  </div>
)

export default Pando
