'use client'

import { Canvas } from '@react-three/fiber'
import Model from './Model'
import React, { useRef } from 'react'
import { Environment } from '@react-three/drei'
import { useInView } from 'motion/react'

const TorusKnot = () => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div className="z-[1] absolute size-full" ref={ref}>
      {isInView && (
        <Canvas
          performance={{ min: 0.5 }} // Allow frame drops
        >
          <Model />
          <directionalLight intensity={2} position={[0, 2, 3]} />
          <Environment preset="forest" />
        </Canvas>
      )}
    </div>
  )
}

export default TorusKnot