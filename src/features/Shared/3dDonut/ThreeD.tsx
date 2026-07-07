'use client'

import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { OrbitControls, Preload } from '@react-three/drei'
import LogoTitle from '@/features/Madness/Hero/features/LogoTitle'

const ThreeD = () => {
  const ref = useRef(null)

  return (
    <div
      className="absolute -top-6 left-0 z-40 mt-16 h-1/2 w-screen sm:mt-0 sm:h-screen"
      ref={ref}
    >
      <Canvas
        camera={{
          fov: 40,
          near: 0.1,
          far: 20
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance'
        }}
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
        <Preload all />
      </Canvas>
    </div>
  )
}

export default React.memo(ThreeD)
