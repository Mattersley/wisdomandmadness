import * as THREE from 'three'
import {
  Cylinder,
  Float,
  MeshTransmissionMaterial,
  Sphere,
  useGLTF
} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { JSX, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Brain_Model001: THREE.Mesh;
  };
  materials: {};
};

const Bubbles = ({ count, radius, height }: { count: number, radius: number, height: number }) => {
  const points = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * radius * 1.5,
          (Math.random() - 0.5) * height,
          (Math.random() - 0.5) * radius * 1.5
        ),
        speed: 0.2 + Math.random() * 0.5
      })),
    [count, radius, height]
  )

  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    groupRef.current?.children.forEach((child, i) => {
      child.position.y += points[i].speed * delta * 2
      if (child.position.y > height / 2) child.position.y = -height / 2
    })
  })

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <Sphere key={i} args={[0.05, 8, 8]} position={p.pos.toArray()}>
          <meshPhysicalMaterial
            color="white"
            opacity={0.4}
            thickness={0.1}
            transmission={1}
            transparent
          />
        </Sphere>
      ))}
    </group>
  )
}


const BrainModel = (props: JSX.IntrinsicElements['group']) => {
  const { nodes } = useGLTF('/models/Brain.glb') as unknown as GLTFResult
  const brainRef = useRef<THREE.Mesh>(null)

  // Floating Brain Animation
  useFrame((state, delta) => {
    if (brainRef.current) {
      brainRef.current.rotation.z += delta * 0.1
      brainRef.current.scale.setScalar(
        4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      )
    }
  })

  return (
    <group {...props}>
      {/* --- LIGHTS --- */}
      <pointLight color="#00ffaa" intensity={4} position={[0, 3, 0]} />{' '}
      {/* Top Glow */}
      <spotLight
        angle={0.3}
        color="#ffffff"
        intensity={1}
        position={[0, -5, 2]}
      />
      {/* --- THE SPECIMEN --- */}
      <Float floatIntensity={2} scale={0.8} speed={1}>
        <mesh
          geometry={nodes.Brain_Model001.geometry}
          position={[-0.2, -0.6, 0]}
          ref={brainRef}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color="#ffb400"
            emissive="#ff8800"
            emissiveIntensity={0.3}
            opacity={0.1}
          />
        </mesh>
      </Float>
      {/* --- CYLINDRICAL GLASS TANK --- */}
      <Cylinder args={[3, 3, 8, 64]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial
          backside
          chromaticAberration={0.08} // Stronger sci-fi "fringe"
          color="#d1f2f2" // Preservative fluid tint
          distortion={0.4}
          ior={1.45} // Between water and glass
          samples={16}
          temporalDistortion={0.2} // Liquid movement
          thickness={1.2}
          transparent
        />
      </Cylinder>
      {/* --- REINFORCED METAL CAPS (Alien: Earth Aesthetic) --- */}
      <Cylinder args={[3.2, 3.2, 0.5, 32]} position={[0, 4, 0]}>
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[3.2, 3.2, 0.5, 32]} position={[0, -4, 0]}>
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </Cylinder>
      {/* --- BUBBLES --- */}
      <Bubbles count={40} height={7} radius={2.5} />
    </group>
  )
}


// const BrainModel = (props: JSX.IntrinsicElements['group']) => {
//   const { nodes } = useGLTF('/models/Brain.glb') as unknown as GLTFResult
//   const brainRef = useRef<THREE.Mesh>(null)
//
//   useFrame((state, delta) => {
//     if (brainRef.current) brainRef.current.rotation.z += delta * 0.1
//   })
//
//   return (
//     <Float floatIntensity={2} speed={1}>
//       <group
//         {...props}
//         dispose={null}
//         position={[0, -0.6, 0]}
//         ref={brainRef}
//         rotation={[Math.PI / 2, 0, 0]}
//       >
//         <mesh geometry={nodes.Brain_Model001.geometry} scale={4}>
//           <meshBasicMaterial
//             color="#ffb400"
//             opacity={0.1}
//             transparent
//             wireframe
//           />
//         </mesh>
//       </group>
//     </Float>
//   )
// }

useGLTF.preload('/models/Brain.glb')

export default BrainModel
