import React, { useRef } from 'react'
import * as THREE from 'three'
import {
  MeshTransmissionMaterial,
  useGLTF,
  Text,
  OrbitControls,
  Billboard
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

const Model = () => {
  const { nodes } = useGLTF('/models/torrus.glb')
  const { viewport } = useThree()
  const torus = useRef<THREE.Mesh>(null)



  useFrame(() => {
      torus.current!.rotation.z += 0.002
      torus.current!.rotation.x += 0.004
  })

  return (
    <>
      <OrbitControls enableZoom={false} />
      <group scale={viewport.width / 4}>
        <mesh ref={torus} {...nodes.Torus002} renderOrder={2}>
          <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />
          <MeshTransmissionMaterial
            backside={true}
            blending={THREE.AdditiveBlending}
            chromaticAberration={0.1}
            clearcoat={0.1}
            clearcoatRoughness={0.1}
            color="#FFFFFF"
            distortion={1}
            ior={1.2}
            opacity={0.1}
            roughness={0}
            thickness={0.2}
            transmission={1}
            transparent={true}
          />
        </mesh>
        {/*<mesh>*/}
        {/*  <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />*/}
        {/*  <MeshTransmissionMaterial*/}
        {/*    {...materialProps}*/}
        {/*    blending={THREE.AdditiveBlending}*/}
        {/*    opacity={0.5}*/}
        {/*    transparent={true}*/}
        {/*  />*/}
        {/*</mesh>*/}
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