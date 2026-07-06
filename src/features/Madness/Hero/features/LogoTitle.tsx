import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Center, Text3D, useMatcapTexture, useScroll } from '@react-three/drei'
import { Group } from 'three'

const LogoTitle = () => {
  const textRef = useRef<Group | null>(null)
  const { viewport } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    if (!textRef.current) return
    textRef.current.rotation.y = 0.4 + scroll.offset * Math.PI * 2
  })


  // useFrame((state, delta) => {
  //   if (textRef.current) {
  //     textRef.current.rotation.y += delta / 4
  //   }
  // })

  const [matcapMadnessTexture] = useMatcapTexture(
    '7877EE_D87FC5_75D9C7_1C78C0',
    256
  )
  const [matcapWisdomTexture] = useMatcapTexture(
    '050505_747474_4C4C4C_333333',
    256
  )

  // Refactoring: Extracted common props to reduce duplication
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
    if (viewport.width < 2) {
      return viewport.width / 3
    } else if (viewport.width < 3) {
      return viewport.width / 2.5
    } else if (viewport.width > 4) {
      return viewport.width / 6
    }
    return viewport.width / 5
  }

  return (
    <>
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
    </>
  )
}

export default LogoTitle

// import React, { useRef, useMemo, useContext, useState, useEffect } from 'react'
// import * as THREE from 'three'
// import { Group, MathUtils, Vector3 } from 'three'
// import { useFrame, useThree, extend, ThreeElement } from '@react-three/fiber'
// import {
//   Center,
//   Text3D,
//   useMatcapTexture,
//   shaderMaterial
// } from '@react-three/drei'
// import { WormContext } from '@/context/wormContext'
//
// declare global {
//   namespace React {
//     namespace JSX {
//       interface IntrinsicElements {
//         meltdownMaterial: ThreeElement<typeof MeltdownMaterial>;
//       }
//     }
//   }
// }
//
// const FONT_INSTRUMENT = '/fonts/Instrument.json'
// const FONT_VAGRA = '/fonts/VagraReg.json'
// const ROTATION_SPEED_DIVISOR = 4
//
// const getResponsiveScale = (width: number) => {
//   if (width < 2) return width / 3
//   if (width < 3) return width / 2.5
//   if (width > 4) return width / 6
//   return width / 5
// }
//
// const MeltdownMaterial = shaderMaterial(
//   { uTime: 0, uMatcap: null, uMeltAmount: 0 },
//   // Vertex Shader
//   `
//   varying vec2 vUv;
//   varying vec3 vNormal;
//   varying vec3 vViewPosition;
//   uniform float uTime;
//   uniform float uMeltAmount;
//
//   void main() {
//     vUv = uv;
//     vec3 pos = position;
//
//     // Melting warp: push vertices down based on their height and time
//     float warp = sin(pos.x * 10.0 + uTime * 2.0) * 0.1 * uMeltAmount;
//     pos.y -= (pos.y + 1.0) * uMeltAmount * 0.5; // Slump down
//     pos.x += warp;
//     pos.z += cos(pos.y * 10.0 + uTime) * 0.1 * uMeltAmount;
//
//     vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
//     vNormal = normalMatrix * normal;
//     vViewPosition = -mvPosition.xyz;
//     gl_Position = projectionMatrix * mvPosition;
//   }
//   `,
//   // Fragment Shader (Simple Matcap implementation for the melt)
//   `
//   uniform sampler2D uMatcap;
//   varying vec3 vNormal;
//   varying vec3 vViewPosition;
//
//   void main() {
//     vec3 normal = normalize(vNormal);
//     vec3 viewDir = normalize(vViewPosition);
//     vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
//     vec3 y = cross(viewDir, x);
//     vec2 uv = vec2(dot(x, normal), dot(y, normal)) * 0.495 + 0.5;
//     vec3 matcapColor = texture2D(uMatcap, uv).rgb;
//     gl_FragColor = vec4(matcapColor, 1.0);
//   }
//   `
// )
//
// extend({ MeltdownMaterial })
//
// const COMMON_TEXT_PROPS = {
//   bevelEnabled: true,
//   bevelOffset: 0,
//   bevelSegments: 5,
//   bevelSize: 0.02,
//   bevelThickness: 0.02,
//   castShadow: true,
//   curveSegments: 12
// }
//
// const LogoTitle = () => {
//   const textRef = useRef<Group>(null)
//   const wisdomRef = useRef<Group>(null)
//   const madnessRef = useRef<Group>(null)
//   const plusRef = useRef<Group>(null)
//   const wisdomMeltRef = useRef<any>(null)
//   const madnessMeltRef = useRef<any>(null)
//   const plusMeltRef = useRef<any>(null)
//
//   const { viewport } = useThree()
//   const { logoState } = useContext(WormContext)
//
//   const [matcapMadness] = useMatcapTexture('7877EE_D87FC5_75D9C7_1C78C0', 256)
//   const [matcapWisdom] = useMatcapTexture('050505_747474_4C4C4C_333333', 256)
//
//   const physicsObjects = useMemo(
//     () => [
//       {
//         ref: wisdomRef,
//         pos: new Vector3(0.3, 0.2, 0.2),
//         vel: new Vector3(),
//         rotVel: new Vector3()
//       },
//       {
//         ref: plusRef,
//         pos: new Vector3(1.7, -0.1, 0.3),
//         vel: new Vector3(),
//         rotVel: new Vector3()
//       },
//       {
//         ref: madnessRef,
//         pos: new Vector3(0, -0.6, 0),
//         vel: new Vector3(),
//         rotVel: new Vector3()
//       }
//     ],
//     []
//   )
//
//   useEffect(() => {
//     if (logoState === 'explode') {
//       physicsObjects.forEach((obj) => {
//         obj.vel.set(
//           (Math.random() - 0.5) * 15,
//           Math.random() * 10 + 5,
//           (Math.random() - 0.5) * 15
//         )
//         obj.rotVel.set(
//           Math.random() * 10,
//           Math.random() * 10,
//           Math.random() * 10
//         )
//       })
//     }
//   }, [logoState, physicsObjects])
//
//   const scale = useMemo(
//     () => getResponsiveScale(viewport.width),
//     [viewport.width]
//   )
//
//   useFrame((state, delta) => {
//     if (!textRef.current) return
//     const t = state.clock.elapsedTime
//     const lerpSpeed = 0.1
//     const isMeltdown = logoState === 'meltdown'
//     const isExplode = logoState === 'explode'
//     const isFloat = logoState === 'float'
//     const isPulse = logoState === 'pulse'
//     const isJiggle = logoState === 'jiggle'
//
//     // Update Meltdown Uniforms
//     const meltRefs = [wisdomMeltRef, madnessMeltRef, plusMeltRef]
//     meltRefs.forEach((ref) => {
//       if (ref.current) {
//         ref.current.uTime = t
//         ref.current.uMeltAmount = MathUtils.lerp(
//           ref.current.uMeltAmount,
//           isMeltdown ? 1 : 0,
//           0.05
//         )
//       }
//     })
//
//     // Handle Global Motion (Rotation)
//     if (logoState === 'spin') {
//       textRef.current.rotation.y += delta * 12
//     } else if (isExplode) {
//       // STOP ALL global rotation on explode
//       textRef.current.rotation.set(-0.3, 0, 0)
//     } else {
//       textRef.current.rotation.y = MathUtils.lerp(
//         textRef.current.rotation.y,
//         t / ROTATION_SPEED_DIVISOR,
//         lerpSpeed
//       )
//     }
//
//     // Jiggle (Drum) Animation
//     if (isJiggle) {
//       textRef.current.rotation.x = -0.3 + Math.sin(t * 30) * 0.1
//       textRef.current.rotation.z = Math.cos(t * 30) * 0.1
//     } else {
//       textRef.current.rotation.z = MathUtils.lerp(
//         textRef.current.rotation.z,
//         0,
//         lerpSpeed
//       )
//     }
//
//     // Zero Gravity (Float) Animation
//     const targetY = isFloat ? 0.5 + Math.sin(t * 2) * 1.0 : 0.5
//     const targetX = isFloat ? Math.cos(t * 1.5) * 0.5 : 0
//     textRef.current.position.y = MathUtils.lerp(
//       textRef.current.position.y,
//       targetY,
//       lerpSpeed
//     )
//     textRef.current.position.x = MathUtils.lerp(
//       textRef.current.position.x,
//       targetX,
//       lerpSpeed
//     )
//
//     // Heartbeat (Pulse) Animation
//     const pulseScale = isPulse ? scale * (1 + Math.sin(t * 15) * 0.15) : scale
//     textRef.current.scale.setScalar(
//       MathUtils.lerp(textRef.current.scale.x, pulseScale, lerpSpeed)
//     )
//
//     // Physics Simulation (Ground at Y=0)
//     physicsObjects.forEach((obj, i) => {
//       if (!obj.ref.current) return
//
//       if (logoState === 'explode') {
//         obj.vel.y -= 30 * delta
//         obj.pos.add(obj.vel.clone().multiplyScalar(delta))
//
//         // Ground Collision (centered at middle of viewport)
//         if (obj.pos.y < 0) {
//           obj.pos.y = 0
//           obj.vel.y *= -0.4
//           obj.vel.multiplyScalar(0.9) // Friction
//         }
//         obj.ref.current.position.copy(obj.pos)
//         // REMOVED individual rotation here to stop tumbling
//         obj.ref.current.rotation.set(0, 0, 0)
//       } else {
//         const targetPositions = [
//           new Vector3(0.3, 0.2, 0.2),
//           new Vector3(1.7, -0.1, 0.3),
//           new Vector3(0, -0.6, 0)
//         ]
//         obj.pos.lerp(targetPositions[i], lerpSpeed)
//         obj.ref.current.position.copy(obj.pos)
//         obj.ref.current.rotation.set(0, 0, 0)
//       }
//     })
//   })
//
//   const renderMaterial = (isMadness: boolean, meltRef: any) => {
//     const isDisco = logoState === 'disco'
//     const isGhost = logoState === 'ghost'
//
//     if (logoState === 'meltdown') {
//       return (
//         <meltdownMaterial
//           ref={meltRef}
//           transparent
//           uMatcap={isMadness ? matcapMadness : matcapWisdom}
//         />
//       )
//     }
//
//     if (isDisco) {
//       const discoColor = new THREE.Color().setHSL(
//         (Date.now() % 400) / 400,
//         1,
//         0.5
//       )
//       return (
//         <meshStandardMaterial
//           color={discoColor}
//           emissive={discoColor}
//           emissiveIntensity={15}
//         />
//       )
//     }
//
//     if (isGhost) {
//       return (
//         <meshPhysicalMaterial
//           color="white"
//           ior={1.2}
//           opacity={0.15}
//           transmission={1}
//           transparent
//         />
//       )
//     }
//
//     return (
//       <meshMatcapMaterial
//         matcap={isMadness ? matcapMadness : matcapWisdom}
//         wireframe={logoState === 'wireframe'}
//       />
//     )
//   }
//
//   return (
//     <Center
//       position={[0, 0.5, 0]}
//       ref={textRef}
//       rotation={[-0.3, 0, 0]}
//       scale={scale}
//     >
//       <group ref={wisdomRef}>
//         <Text3D
//           {...COMMON_TEXT_PROPS}
//           font={FONT_INSTRUMENT}
//           height={0.2}
//           size={0.75}
//         >
//           Wisdom
//           {renderMaterial(false, wisdomMeltRef)}
//         </Text3D>
//       </group>
//
//       <group ref={plusRef}>
//         <Text3D
//           {...COMMON_TEXT_PROPS}
//           font={FONT_INSTRUMENT}
//           height={0.1}
//           size={0.3}
//         >
//           +{renderMaterial(false, plusMeltRef)}
//         </Text3D>
//       </group>
//
//       <group ref={madnessRef}>
//         <Text3D
//           {...COMMON_TEXT_PROPS}
//           font={FONT_VAGRA}
//           height={0.2}
//           size={0.8}
//         >
//           Madness
//           {renderMaterial(true, madnessMeltRef)}
//         </Text3D>
//       </group>
//     </Center>
//   )
// }
//
// export default LogoTitle
