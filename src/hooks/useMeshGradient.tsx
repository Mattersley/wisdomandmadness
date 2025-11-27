import { LayerMaterial, Gradient, Noise } from 'lamina'
import * as THREE from 'three'
import React, { useMemo } from 'react'

const useMeshGradient = (color1: string, color2: string) => {
  return useMemo(() => (
    <LayerMaterial color="#ffffff" lighting="physical">
      <Gradient
        axes="x"
        colorA={color1}
        colorB={color2}
        end={1}
        start={-1}
      />
      <Gradient
        alpha={0.5}
        axes="y"
        blending={THREE.AdditiveBlending}
        colorA={color2}
        colorB={color1}
        end={1}
        start={-1}
      />
      <Noise alpha={0.1} scale={100} />
    </LayerMaterial>
  ), [color1, color2])
}

export default useMeshGradient
