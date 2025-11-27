import React, { useRef } from 'react'
import * as THREE from 'three'
import {
  MeshTransmissionMaterial,
  Text,
  OrbitControls,
  Billboard
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

const Model = () => {
  const { viewport } = useThree()
  const torus = useRef<THREE.Mesh>(null)

  useFrame(() => {
      torus.current!.rotation.z += 0.002
      torus.current!.rotation.x += 0.004
  })

  return (
    <>
      <OrbitControls enableZoom={false} />
      <group scale={viewport.width / 5}>
        <mesh ref={torus}>
          <torusKnotGeometry args={[1, 0.25, 90, 24, 1, 3]} />
          <MeshTransmissionMaterial
            blending={THREE.AdditiveBlending}
            chromaticAberration={0.1}
            clearcoat={0.5}
            distortion={1}
            ior={2}
            opacity={0.5}
            roughness={0}
            thickness={0.1}
            transmission={1}
            transparent={true}
          />
        </mesh>
      </group>
      <Billboard
        castShadow={false}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        receiveShadow={false}
      >
        <Text
          anchorX="center"
          anchorY="middle"
          castShadow={false}
          color="#ffffff"
          fillOpacity={0.1}
          font={'/fonts/vagra-pixel-large.woff'}
          fontSize={viewport.width / 5}
          fontWeight="bold"
          position={[0, 0, -2]}
          receiveShadow={false}
        >
          Madness
        </Text>
      </Billboard>
    </>
  )
}

export default Model