'use client'

import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { OrbitControls, ScrollControls } from '@react-three/drei'
import LogoTitle from '@/features/Madness/Hero/features/LogoTitle'

const ThreeD = () => {
  const ref = useRef(null)

  return (
    <div
      className="absolute h-1/2 -top-6 left-0 z-40 mt-16 sm:mt-0 sm:h-screen w-screen"
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
        {/*<OrbitControls*/}
        {/*  dampingFactor={0.25}*/}
        {/*  enableDamping={true}*/}
        {/*  enablePan={false}*/}
        {/*  enableZoom={false}*/}
        {/*/>*/}
        <group>
          <directionalLight castShadow intensity={100} position={[0, -1, 6]} />
          <ScrollControls pages={1}>
            <LogoTitle />
          </ScrollControls>
        </group>
      </Canvas>
    </div>
  )
}

export default React.memo(ThreeD)
