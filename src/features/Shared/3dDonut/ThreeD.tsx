'use client'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { OrbitControls, Preload } from '@react-three/drei'
import LogoTitle from '@/features/Madness/Hero/features/LogoTitle'

const ThreeD = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hitboxRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="h-full pointer-events-none absolute left-0 z-1 w-screen overflow-visible sm:-top-6 sm:z-10 sm:mt-0"
      ref={containerRef}
    >
      <div
        className="h-1/2 pointer-events-auto absolute top-0 left-0 z-20 lg:h-2/3 w-full"
        ref={hitboxRef}
      />

      <Canvas
        camera={{ fov: 40, near: 0.1, far: 20 }}
        className="pointer-events-none"
        dpr={[1, 2]}
        eventSource={hitboxRef as React.RefObject<HTMLElement>}
        gl={{ antialias: true, powerPreference: 'low-power' }}
      >
        <OrbitControls
          dampingFactor={0.25}
          enableDamping={true}
          enablePan={false}
          enableZoom={false}
        />
        <group position={[0, 0.5, 0]}>
          <directionalLight castShadow intensity={100} position={[0, -1, 6]} />
          <LogoTitle />
        </group>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default React.memo(ThreeD)
