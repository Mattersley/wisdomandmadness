'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'

interface TransparentXYProps {
  pixelSize?: number;
  colorRGB?: string; // Format: "0, 255, 170"
  maxRatio?: number;
}

const Oscilloscope: React.FC<TransparentXYProps> = ({
  pixelSize = 4,
  colorRGB = '255, 0, 102',
  maxRatio = 10
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [randomX, setRandomX] = useState(() => Math.random())
  const [randomY, setRandomY] = useState(() => Math.random())

  const newRandoms = () => {
    return () => {
      setRandomX(Math.random())
      setRandomY(Math.random())
    }
  }

  // Generate stable random frequencies on mount
  const { freqX, freqY } = useMemo(
    () => ({
      freqX: Math.floor(randomX * maxRatio) + 1,
      freqY: Math.floor(randomY * maxRatio) + 1
    }),
    [maxRatio, randomX, randomY]
  )

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animationFrameId: number
    let time = 0

    const tailLength = 300 // How many "ghost" points form the trail
    const trailStep = 0.01 // Precision of the trail line

    const render = () => {
      // 1. Clear everything for true transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const radius = Math.min(cx, cy) * 0.8

      // 2. Draw the path segments
      // We iterate backwards from the current time to create the trail
      for (let i = 0; i < tailLength; i++) {
        const t = time - i * trailStep

        // Lissajous Parametric Equations
        const x = cx + radius * Math.sin(freqX * t)
        const y = cy + radius * Math.sin(freqY * t)

        // Grid snapping
        const px = Math.floor(x / pixelSize) * pixelSize
        const py = Math.floor(y / pixelSize) * pixelSize

        // 3. Alpha Gradient (1.0 at head, 0.0 at tail)
        const alpha = 1 - i / tailLength
        ctx.fillStyle = `rgba(${colorRGB}, ${alpha})`

        // Optional: Make the "head" slightly larger/brighter
        if (i === 0) {
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(${colorRGB}, 1)`
          ctx.fillRect(px, py, pixelSize, pixelSize)
        } else {
          ctx.shadowBlur = 0
          ctx.fillRect(px, py, pixelSize - 1, pixelSize - 1)
        }
      }

      time += 0.02 // Speed of the beam
      animationFrameId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [freqX, freqY, colorRGB, pixelSize])

  return (
    <button className={'cursor-crosshair flex flex-col items-start w-60 h-72 border-5 border-[#ff0066]/50 p-2'}
      onClick={newRandoms()}
    >
      <canvas
        height={300}
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '500px'
        }}
        width={300}
      />
      <div
        className='text-shadow-crt w-full text-center text-2xl font-bold'
        style={{ color: `rgba(${colorRGB}, 0.5)` }}
      >
        XY_: {freqX}Hz / {freqY}Hz
      </div>
    </button>
  )
}

export default Oscilloscope
