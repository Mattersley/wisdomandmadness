'use client'

import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import LogoTitle from '@/features/Madness/Header/Hero/LogoTitle'

const ThreeD = () => {
  const ref = useRef(null)

  return (
    <div
      className="absolute h-1/2 top-0 left-0 z-40 mt-16 sm:mt-0 sm:h-screen w-screen"
      ref={ref}
    >
      <Canvas
        camera={{
          fov: 40,
          near: 0.01,
          far: 10
        }}
        dpr={[1, 2]}
      >
        <OrbitControls
          dampingFactor={0.25}
          enableDamping={true}
          enablePan={false}
          enableZoom={false}
        />
        <group>
          <directionalLight castShadow intensity={100} position={[0, -1, 6]} />
          <LogoTitle />
        </group>
      </Canvas>
    </div>
  )
}

export default ThreeD
