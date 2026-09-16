import React, { useRef, useEffect, useState } from 'react'
import { Group } from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { Center, Text3D, useMatcapTexture, Html } from '@react-three/drei'
import { sceneLoaderStore } from '@/hooks/sceneLoader'
import * as THREE from 'three'

const LogoTitle = () => {
  const textRef = useRef<Group | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  // Track reset animation state separately
  const [isResetting, setIsResetting] = useState(false)

  const { viewport, gl, scene, camera } = useThree()

  const [matcapMadnessTexture] = useMatcapTexture(
    '7877EE_D87FC5_75D9C7_1C78C0',
    256
  )
  const [matcapWisdomTexture] = useMatcapTexture(
    '050505_747474_4C4C4C_333333',
    256
  )

  useEffect(() => {
    if (
      !gl ||
      !scene ||
      !camera ||
      !matcapMadnessTexture ||
      !matcapWisdomTexture
    )
      return
    scene.updateMatrixWorld(true)
    gl.initTexture(matcapMadnessTexture)
    gl.initTexture(matcapWisdomTexture)
    gl.compile(scene, camera)
    sceneLoaderStore.complete(2000)
  }, [gl, scene, camera, matcapMadnessTexture, matcapWisdomTexture])

  useFrame((state, delta) => {
    if (!textRef.current) return

    // 1. Smoothly animate back to default values if resetting
    if (isResetting) {
      // Hard reset the Three.js internal clock timer back to zero instantly
      // This ensures the wave animation math initializes back at exactly 0
      state.clock.start()

      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        -0.3,
        0.15
      )
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        0.4,
        0.15
      )
      textRef.current.rotation.z = THREE.MathUtils.lerp(
        textRef.current.rotation.z,
        0,
        0.15
      )

      textRef.current.position.x = THREE.MathUtils.lerp(
        textRef.current.position.x,
        0,
        0.15
      )
      textRef.current.position.y = THREE.MathUtils.lerp(
        textRef.current.position.y,
        0,
        0.15
      )
      textRef.current.position.z = THREE.MathUtils.lerp(
        textRef.current.position.z,
        0,
        0.15
      )

      // Bring scale back to base sizing smoothly
      const targetScale = scaleFactor()
      textRef.current.scale.x = THREE.MathUtils.lerp(
        textRef.current.scale.x,
        targetScale,
        0.15
      )
      textRef.current.scale.y = THREE.MathUtils.lerp(
        textRef.current.scale.y,
        targetScale,
        0.15
      )
      textRef.current.scale.z = THREE.MathUtils.lerp(
        textRef.current.scale.z,
        targetScale,
        0.15
      )

      // Check if values have fully homed in
      if (Math.abs(textRef.current.rotation.y - 0.4) < 0.001) {
        setIsResetting(false)
      }
      return
    }

    // Early exit if the animation is paused
    if (isPaused) return

    // 2. Normal running animation
    textRef.current.rotation.y += delta / 10
    textRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.01
  })

  // Trigger smooth reset without changing the pause state
  const handleReset = () => {
    setIsResetting(true)
  }

  const commonTextProps = {
    bevelEnabled: true,
    bevelOffset: 0,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
    castShadow: true,
    curveSegments: 12
  }

  const scaleFactor = () => {
    if (viewport.width < 2) return viewport.width / 3
    if (viewport.width < 3) return viewport.width / 4
    if (viewport.width < 4) return viewport.width / 5
    if (viewport.width > 4) return viewport.width / 7
    return viewport.width / 6
  }

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    left: '20px',
    pointerEvents: 'auto',
    padding: '10px 20px',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    zIndex: 10
  }

  return (
    <>
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <button
          disabled={isResetting}
          onClick={() => setIsPaused(!isPaused)}
          style={{ ...buttonStyle}}
        >
          {isPaused ? '▶' : '⏸'}
        </button>
        <button
          disabled={isResetting}
          onClick={handleReset}
          style={{ ...buttonStyle, top: '25px', fontSize: '19px' }}
        >
          ↺
        </button>
      </Html>

      <Center
        position={[0, 0.5, 0]}
        ref={textRef}
        rotation={[-0.3, 0.4, 0]}
        scale={scaleFactor()}
      >
        <Text3D
          {...commonTextProps}
          font="/fonts/Instrument.json"
          height={0.2}
          position={[0.3, 0.2, 0.2]}
          size={0.75}
        >
          <meshMatcapMaterial matcap={matcapWisdomTexture} /> Wisdom
        </Text3D>
        <Text3D
          {...commonTextProps}
          font="/fonts/Instrument.json"
          height={0.1}
          position={[1.7, -0.1, 0.3]}
          size={0.3}
        >
          <meshMatcapMaterial matcap={matcapWisdomTexture} />+
        </Text3D>
        <Text3D
          {...commonTextProps}
          font="/fonts/VagraReg.json"
          height={0.2}
          position={[0, -0.6, 0]}
          size={0.8}
        >
          Madness
          <meshMatcapMaterial matcap={matcapMadnessTexture} />
        </Text3D>
      </Center>
    </>
  )
}

export default LogoTitle
