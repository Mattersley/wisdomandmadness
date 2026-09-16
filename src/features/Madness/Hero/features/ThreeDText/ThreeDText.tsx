'use client'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { OrbitControls, Preload } from '@react-three/drei'
import LogoTitle from '@/features/Madness/Hero/features/ThreeDText/components/LogoTitle'
import { useTailwindBreakpoint } from '@/features/Madness/Hero/features/HeroText/hooks/useTailwindBreakpoints'

const ThreeDText = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hitboxRef = useRef<HTMLDivElement>(null)
  const currentSize = useTailwindBreakpoint()

  // Define 3D height scale values mapped to Tailwind breakpoints
  const heightMapping = {
    base: 0.8, // Mobile
    sm: 0.4, // Small screens
    md: 0.4, // Tablets
    lg: 0.3, // Laptops
    xl: 0.1, // Desktops
    '2xl': 0.2 // Wide Desktops
  }

  const dynamicHeight = heightMapping[currentSize]
  return (
    <div
      className="pointer-events-none absolute left-0 z-10 h-full w-screen overflow-visible sm:-top-6 sm:mt-0"
      ref={containerRef}
    >
      <div
        className="pointer-events-auto absolute top-20 left-0 z-20 h-[65vh] w-full sm:top-50 sm:h-[53vh] md:h-[52vh] lg:h-[58vh] xl:h-[60vh]"
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
        <group position={[0, dynamicHeight, 0]}>
          <directionalLight castShadow intensity={100} position={[0, -1, 6]} />
          <LogoTitle />
        </group>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default React.memo(ThreeDText)
