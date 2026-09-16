'use client'

import React, { useRef, useEffect, useMemo } from 'react'

// Dithering patterns
const DITHER_PATTERNS = {
   '2x2': [
      [0, 2],
      [3, 1]
   ],
   '4x4': [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5]
   ],
   '8x8': [
      [0, 32, 8, 40, 2, 34, 10, 42],
      [48, 16, 56, 24, 50, 18, 58, 26],
      [12, 44, 4, 36, 14, 46, 6, 38],
      [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41],
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21]
   ],
   random: null // Random dithering
}

type DitheringPattern = keyof typeof DITHER_PATTERNS
type ShapeType =
   | 'simplex'
   | 'warp'
   | 'dots'
   | 'wave'
   | 'ripple'
   | 'swirl'
   | 'sphere'

interface DitheringShaderProps {
   shape?: ShapeType
   type?: DitheringPattern
   colorBack?: string
   colorFront?: string
   pxSize?: number
   speed?: number
   className?: string
}

// Simplex noise functions
function simplexNoise2D(x: number, y: number): number {
   const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
   const G2 = (3.0 - Math.sqrt(3.0)) / 6.0

   const s = (x + y) * F2
   const i = Math.floor(x + s)
   const j = Math.floor(y + s)

   const t = (i + j) * G2
   const X0 = i - t
   const Y0 = j - t
   const x0 = x - X0
   const y0 = y - Y0

   const i1 = x0 > y0 ? 1 : 0
   const j1 = x0 > y0 ? 0 : 1

   const x1 = x0 - i1 + G2
   const y1 = y0 - j1 + G2
   const x2 = x0 - 1.0 + 2.0 * G2
   const y2 = y0 - 1.0 + 2.0 * G2

   const ii = i & 255
   const jj = j & 255

   const hash = (i: number, j: number) => {
      return ((i * 374761393 + j * 668265263) & 0x7fffffff) / 0x7fffffff
   }

   const grad = (hash: number, x: number, y: number) => {
      const h = hash & 7
      const u = h < 4 ? x : y
      const v = h < 4 ? y : x
      return (h & 1 ? -u : u) + (h & 2 ? -2.0 * v : 2.0 * v)
   }

   let n0, n1, n2

   let t0 = 0.5 - x0 * x0 - y0 * y0
   if (t0 < 0) n0 = 0.0
   else {
      t0 *= t0
      n0 = t0 * t0 * grad(hash(ii, jj), x0, y0)
   }

   let t1 = 0.5 - x1 * x1 - y1 * y1
   if (t1 < 0) n1 = 0.0
   else {
      t1 *= t1
      n1 = t1 * t1 * grad(hash(ii + i1, jj + j1), x1, y1)
   }

   let t2 = 0.5 - x2 * x2 - y2 * y2
   if (t2 < 0) n2 = 0.0
   else {
      t2 *= t2
      n2 = t2 * t2 * grad(hash(ii + 1, jj + 1), x2, y2)
   }

   return 70.0 * (n0 + n1 + n2)
}

// Shape generation functions
const shapeGenerators: Record<
   ShapeType,
   (x: number, y: number, time: number, w: number, h: number) => number
> = {
   simplex: (x, y, time) => {
      const scale = 0.005
      return (simplexNoise2D(x * scale, y * scale + time) + 1) * 0.5
   },
   warp: (x, y, time, w, h) => {
      const cx = w / 2
      const cy = h / 2
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const warp = Math.sin(dist * 0.02 - time * 2) * 0.5 + 0.5
      const rotation = Math.sin(angle * 3 + time) * 0.5 + 0.5
      return (warp + rotation) * 0.5
   },
   dots: (x, y, time) => {
      const scale = 40
      const sx = Math.sin((x / scale + time) * Math.PI * 2) * 0.5 + 0.5
      const sy = Math.sin((y / scale + time) * Math.PI * 2) * 0.5 + 0.5
      return sx * sy
   },
   wave: (x, y, time) => {
      const freq = 0.02
      return (
         Math.sin(x * freq + time * 2) * Math.cos(y * freq + time) * 0.5 + 0.5
      )
   },
   ripple: (x, y, time, w, h) => {
      const cx = w / 2
      const cy = h / 2
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      return Math.sin(dist * 0.05 - time * 3) * 0.5 + 0.5
   },
   swirl: (x, y, time, w, h) => {
      const cx = w / 2
      const cy = h / 2
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      return Math.sin(angle * 5 + dist * 0.03 - time * 2) * 0.5 + 0.5
   },
   sphere: (x, y, time, w, h) => {
      const cx = w / 2
      const cy = h / 2
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = Math.min(w, h) / 2
      const normalized = dist / maxDist
      const sphere = Math.sqrt(Math.max(0, 1 - normalized * normalized))
      return (Math.sin(sphere * Math.PI + time * 2) * 0.5 + 0.5) * sphere
   }
}

export const DitheringShader = ({
   shape = 'simplex',
   type = '8x8',
   colorBack = '#000000',
   colorFront = '#ffffff',
   pxSize = 3,
   speed = 0.5,
   className = ''
}: DitheringShaderProps) => {
   const canvasRef = useRef<HTMLCanvasElement>(null)
   const rafRef = useRef<number | undefined>(undefined)
   const startTimeRef = useRef<number>(Date.now())

   // Parse colors
   const backRGB = useMemo(() => hexToRgb(colorBack), [colorBack])
   const frontRGB = useMemo(() => hexToRgb(colorFront), [colorFront])

   useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const pattern = DITHER_PATTERNS[type]
      const patternSize = type === 'random' ? 1 : pattern!.length

      const render = () => {
         const rect = canvas.getBoundingClientRect()
         const dpr = window.devicePixelRatio || 1

         // Set canvas size
         const width = Math.floor(rect.width / pxSize)
         const height = Math.floor(rect.height / pxSize)

         if (width <= 0 || height <= 0) {
            rafRef.current = requestAnimationFrame(render)
            return
         }

         if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
         }

         const time = ((Date.now() - startTimeRef.current) / 1000) * speed
         const imageData = ctx.createImageData(width, height)
         const data = imageData.data

         const shapeFunc = shapeGenerators[shape]

         // Generate dithered image
         for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
               const idx = (y * width + x) * 4

               // Get noise value for this position
               const value = shapeFunc(
                  x * pxSize,
                  y * pxSize,
                  time,
                  width * pxSize,
                  height * pxSize
               )

               // Apply dithering
               let threshold: number
               if (type === 'random') {
                  threshold = Math.random()
               } else {
                  const px = x % patternSize
                  const py = y % patternSize
                  threshold = pattern![py][px] / (patternSize * patternSize)
               }

               // Determine color
               const color = value > threshold ? frontRGB : backRGB

               data[idx] = color.r
               data[idx + 1] = color.g
               data[idx + 2] = color.b
               data[idx + 3] = 255
            }
         }

         ctx.putImageData(imageData, 0, 0)
         rafRef.current = requestAnimationFrame(render)
      }

      render()

      return () => {
         if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
         }
      }
   }, [shape, type, backRGB, frontRGB, pxSize, speed])

   return (
      <canvas
         className={className}
         ref={canvasRef}
         style={{
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated'
         }}
      />
   )
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
   return result
      ? {
           r: parseInt(result[1], 16),
           g: parseInt(result[2], 16),
           b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 }
}
