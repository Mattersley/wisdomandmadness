import React, { useRef, useEffect } from 'react'
import { Group } from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { Center, Text3D, useMatcapTexture } from '@react-three/drei'
import { sceneLoaderStore } from '@/hooks/sceneLoader'

const LogoTitle = () => {
  const textRef = useRef<Group | null>(null)

  // 1. Grab core rendering context immutably
  const { viewport, gl, scene, camera } = useThree()

  // 2. Fetch the Matcap textures inside the component
  const [matcapMadnessTexture] = useMatcapTexture(
    '7877EE_D87FC5_75D9C7_1C78C0',
    256
  )
  const [matcapWisdomTexture] = useMatcapTexture(
    '050505_747474_4C4C4C_333333',
    256
  )

  // 3. SYNCHRONOUS COMPILATION PIPELINE
  useEffect(() => {
    // We only execute when all engines, models, and texture buffers are present
    if (
      !gl ||
      !scene ||
      !camera ||
      !matcapMadnessTexture ||
      !matcapWisdomTexture
    )
      return

    // Pre-calculate all 3D layouts and geometry transforms
    scene.updateMatrixWorld(true)

    // Force upload texture images directly to VRAM
    gl.initTexture(matcapMadnessTexture)
    gl.initTexture(matcapWisdomTexture)

    // Crawl the scene graph and compile text paths + matcap shaders ahead of time
    gl.compile(scene, camera)

    // Everything is baked into GPU memory. Start the 2-second overlay fade out!
    sceneLoaderStore.complete(2000)
  }, [gl, scene, camera, matcapMadnessTexture, matcapWisdomTexture])

  useFrame((state, delta) => {
    if (textRef.current) {
      textRef.current.rotation.y += delta / 4
    }
  })

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
    if (viewport.width < 3) return viewport.width / 2.5
    if (viewport.width > 4) return viewport.width / 6
    return viewport.width / 6
  }

  // CRITICAL FIX: Removed <Suspense fallback={null}>.
  // Keeping suspense inside the component causes Three.js to hide meshes during gl.compile().
  return (
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
        <meshMatcapMaterial matcap={matcapWisdomTexture} />
        Wisdom
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
  )
}

export default LogoTitle
