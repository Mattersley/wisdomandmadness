import React, { useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

const Slider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
}> = ({ value, onChange, min, max, step, label }) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="flex w-full flex-col gap-2">
      {/*<div className="flex items-center justify-between">*/}
      {/*  <span className="font-mono text-xs font-bold tracking-wider text-cyan-400">*/}
      {/*    {label}*/}
      {/*  </span>*/}
      {/*  <span className="rounded border border-gray-700 bg-gray-900 px-2 py-0.5 font-mono text-xs text-cyan-300">*/}
      {/*    {value.toFixed(2)}*/}
      {/*  </span>*/}
      {/*</div>*/}
      <div className="relative h-2 rounded-full border border-gray-700 bg-gray-900 shadow-inner">
        {/* Track fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-cyan-500 to-cyan-400 transition-all"
          style={{
            width: `${percentage}%`,
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
          }}
        />
        {/* Slider thumb */}
        <input
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          max={max}
          min={min}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          type="range"
          value={value}
        />
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rounded-full border-2 border-white bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-lg"
          style={{
            left: `calc(${percentage}% - 8px)`,
            boxShadow:
              '0 0 15px rgba(0, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5)'
          }}
        />
      </div>
    </div>
  )
}

const WaveLayer = ({
  index,
  total,
  frequency,
  amplitude,
  phase,
  waveType,
  time
}: {
  index: number;
  total: number;
  frequency: number;
  amplitude: number;
  phase: number;
  waveType: string;
  time: number;
}) => {
  const segments = 150
  const zOffset = -index * 0.2
  const xOffset = index * 0.1
  const yOffset = -index * 0.035
  const opacity = 1 - (index / total) * 0.75
  const brightness = 1 - (index / total) * 0.6
  const color = useMemo(
    () => new THREE.Color(0x00ffff).multiplyScalar(brightness),
    [brightness]
  )

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 7 - 4 + xOffset
      const t =
        (i / segments) * Math.PI * 2 * frequency + phase + time - index * 0.15
      let y = 0

      switch (waveType) {
        case '∿':
          y = Math.sin(t) * amplitude + yOffset
          break
        case '⨅':
          y = (Math.sin(t) >= 0 ? 1 : -1) * amplitude + yOffset
          break
        case '▲':
          y = (2 / Math.PI) * Math.asin(Math.sin(t)) * amplitude + yOffset
          break
        case '∧':
          y =
            (2 / Math.PI) * ((t % (Math.PI * 2)) - Math.PI) * amplitude +
            yOffset
          break
      }
      pts.push(new THREE.Vector3(x, y, zOffset))
    }
    return pts
  }, [
    frequency,
    amplitude,
    phase,
    waveType,
    time,
    index,
    xOffset,
    yOffset,
    zOffset
  ])

  const lineGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  )

  return (
    <group>
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          linewidth={2}
          opacity={opacity}
          transparent
        />
      </line>
      {index < 3 && (
        <line geometry={lineGeometry}>
          <lineBasicMaterial
            color={0x00ffff}
            linewidth={4}
            opacity={opacity * 0.3}
            transparent
          />
        </line>
      )}
      {index === 0 && (
        <mesh>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3(points),
              segments,
              0.02,
              8,
              false
            ]}
          />
          <meshBasicMaterial color={0x00ffff} opacity={0.8} transparent />
        </mesh>
      )}
    </group>
  )
}

const WaveScene = ({ frequency, amplitude, phase, waveType }: any) => {
  const [time, setTime] = React.useState(0)
  useFrame((state, delta) => setTime((t) => t + delta))

  return (
    <>
      <PerspectiveCamera
        fov={40}
        makeDefault
        onUpdate={(c) => c.lookAt(0.5, 0, -1)}
        position={[4, 1, 8]}
        rotation={[0, 0, 0]}
      />
      <ambientLight color={0x00ffff} intensity={0.3} />
      <pointLight color={0x00ffff} intensity={1} position={[0, 5, 5]} />

      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <WaveLayer
            key={i}
            amplitude={amplitude}
            frequency={frequency}
            index={i}
            phase={phase}
            time={time}
            total={20}
            waveType={waveType}
          />
        ))}

        {/* Vertical Grid */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = -4 + i * 0.35
          return (
            <line key={`v-${i}`}>
              <bufferGeometry
                attach="geometry"
                onUpdate={(g) =>
                  g.setFromPoints([
                    new THREE.Vector3(x, -1.8, -4.2),
                    new THREE.Vector3(x + 0.7, 1.8, -4.2)
                  ])
                }
              />
              <lineBasicMaterial color={0x003344} opacity={0.4} transparent />
            </line>
          )
        })}
      </group>
    </>
  )
}

const WaveformGenerator: React.FC = () => {
  const [frequency, setFrequency] = React.useState(2)
  const [amplitude, setAmplitude] = React.useState(1)
  const [phase, setPhase] = React.useState(0)
  const [waveType, setWaveType] = React.useState<'∿' | '⨅' | '▲' | '∧'>('∿')

  return (
    <div className="flex items-center justify-center overflow-clip">
      <div className="relative shadow-2xl">
        <div className="relative mb-2 h-72 w-60 overflow-hidden border-4 border-gray-800 bg-black shadow-inner">
          <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <WaveScene
              amplitude={amplitude}
              frequency={frequency}
              phase={phase}
              waveType={waveType}
            />
          </Canvas>
        </div>

        <div className="flex w-60 flex-col gap-4 border border-gray-700 bg-linear-to-b from-gray-800 to-gray-900 p-6">
          <div className="grid grid-rows-3 gap-6">
            <Slider
              label="FREQ"
              max={8}
              min={0.5}
              onChange={setFrequency}
              step={0.1}
              value={frequency}
            />

            <Slider
              label="AMP"
              max={2}
              min={0}
              onChange={setAmplitude}
              step={0.1}
              value={amplitude}
            />

            <Slider
              label="PHASE"
              max={Math.PI * 2}
              min={0}
              onChange={setPhase}
              step={0.1}
              value={phase}
            />
          </div>
          {/* Wave Type Selector */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {(['∿', '⨅', '▲', '∧'] as const).map((type) => (
              <button
                key={type}
                className={`w-12 rounded border-2 px-4 py-2 font-mono text-xs font-bold shadow-lg transition-all ${
                  waveType === type
                    ? 'border-cyan-300 bg-linear-to-br from-cyan-400 to-cyan-600 text-black shadow-cyan-500/50'
                    : 'border-gray-600 bg-linear-to-br from-gray-800 to-gray-900 text-cyan-400 hover:border-cyan-500 hover:shadow-cyan-500/30'
                }`}
                onClick={() => setWaveType(type)}
                style={{
                  boxShadow:
                    waveType === type
                      ? '0 0 12px rgba(0,255,255,0.5), inset 0 1px 2px rgba(255,255,255,0.3)'
                      : '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                }}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaveformGenerator
