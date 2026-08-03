'use client'

import React, { useEffect, useRef, useState } from 'react'

// --- STRUCTURAL CONTRACTS ---
interface Obstacle {
  x: number;
  gapTop: number;
  width: number;
  passed: boolean;
}

interface HistoryPoint {
  x: number;
  y: number;
}

interface EggParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  va: number;
  alpha: number;
}

interface GameEngineState {
  headX: number;
  headY: number;
  headVy: number;
  armLength: number;
  headHistory: HistoryPoint[];
  eggX: number;
  eggVx: number;
  eggY: number;
  eggVy: number;
  eggFloatY: number;
  eggAngle: number;
  eggVa: number;
  obstacles: Obstacle[];
  particles: EggParticle[];
  frameCount: number;
}

// --- CONSTANTS MAP ---
const CONFIG = {
  width: 800,
  height: 500,
  gravity: 0.35,
  flapStrength: -6.5,
  gameSpeed: 2,
  horizontalSpeed: 3,
  obstacleInterval: 120,
  gapSize: 145,
  eggRadiusX: 10,
  eggRadiusY: 15,
  spoonWidth: 44,
  eggFriction: 0.96,
  growthRate: 0.15,
  bowlDepth: 0.1,
  spoonLipWidth: 18,
  eggGravity: 0.22,
  launchInertia: 0.85,
  maxFloatHeight: -90,
  airDrag: 0.03,
  wobbleIntensity: 0.08
}
const PixelSpoonSnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState<number>(0)
  const [gameActive, setGameActive] = useState<boolean>(true)
  const [highScore, setHighScore] = useState<number>(0)
  const [displayArmLength, setDisplayArmLength] = useState<number>(90)

  const state = useRef<GameEngineState>({
    headX: 200,
    headY: 250,
    headVy: 0,
    armLength: 90,
    headHistory: [],
    eggX: 0,
    eggVx: 0,
    eggY: -14,
    eggVy: 0,
    eggFloatY: 0,
    eggAngle: 0,
    eggVa: 0,
    obstacles: [],
    particles: [],
    frameCount: 0
  })

  const jumpTriggered = useRef<boolean>(false)
  const keysPressed = useRef<{ [key: string]: boolean }>({})

  const handleAction = () => {
    if (gameActive) jumpTriggered.current = true
  }

  const resetGame = () => {
    state.current = {
      headX: 200,
      headY: 250,
      headVy: 0,
      armLength: 90,
      headHistory: Array.from({ length: 400 }, (_, i) => ({
        x: 200 - i * CONFIG.gameSpeed,
        y: 250
      })),
      eggX: 0,
      eggVx: 0,
      eggY: -14,
      eggVy: 0,
      eggFloatY: 0,
      eggAngle: 0,
      eggVa: 0,
      obstacles: [],
      particles: [],
      frameCount: 0
    }
    setScore(0)
    setDisplayArmLength(90)
    setGameActive(true)
  }

  const triggerShatter = (s: GameEngineState) => {
    const absX = s.headX + s.eggX
    const absY = s.headY + s.eggY
    for (let i = 0; i < 35; i++) {
      s.particles.push({
        x: absX,
        y: absY,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.7) * 7,
        size: Math.random() * 4 + 2,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.2,
        alpha: 1
      })
    }
    setGameActive(false)
  }

  const handleObstaclesAndCollisions = (s: GameEngineState) => {
    if (s.frameCount % CONFIG.obstacleInterval === 0) {
      const minTop = 50
      const maxTop = CONFIG.height - CONFIG.gapSize - 50
      s.obstacles.push({
        x: CONFIG.width,
        gapTop: Math.random() * (maxTop - minTop) + minTop,
        width: 55,
        passed: false
      })
    }
    s.obstacles.forEach((obs) => {
      obs.x -= CONFIG.gameSpeed
      if (!obs.passed && obs.x + obs.width < s.headX) {
        obs.passed = true
        setScore((prev) => {
          const next = prev + 1
          if (next > highScore) setHighScore(next)
          return next
        })
      }
    })
    s.obstacles = s.obstacles.filter((obs) => obs.x > -obs.width)
    if (
      s.headY < 0 ||
      s.headY > CONFIG.height ||
      s.headX < 0 ||
      s.headX > CONFIG.width
    ) {
      triggerShatter(s)
      return
    }
    for (const obs of s.obstacles) {
      if (
        s.headX + CONFIG.spoonWidth / 2 > obs.x &&
        s.headX - CONFIG.spoonWidth / 2 < obs.x + obs.width
      ) {
        if (s.headY < obs.gapTop || s.headY > obs.gapTop + CONFIG.gapSize) {
          triggerShatter(s)
          return
        }
      }
      const totalTailPoints = Math.min(
        s.headHistory.length,
        Math.floor(s.armLength)
      )
      for (let i = 0; i < totalTailPoints; i += 4) {
        const p = s.headHistory[i]
        if (p && p.x > obs.x && p.x < obs.x + obs.width) {
          if (p.y < obs.gapTop || p.y > obs.gapTop + CONFIG.gapSize) {
            triggerShatter(s)
            return
          }
        }
      }
    }
  }

  const drawGameScene = (ctx: CanvasRenderingContext2D, s: GameEngineState) => {
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, CONFIG.width, CONFIG.height)
    ctx.strokeStyle = '#222222'
    ctx.lineWidth = 1
    for (let x = 0; x < CONFIG.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CONFIG.height)
      ctx.stroke()
    }
    for (let y = 0; y < CONFIG.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(CONFIG.width, y)
      ctx.stroke()
    }
    s.obstacles.forEach((obs) => {
      ctx.lineWidth = 4
      ctx.strokeStyle = '#000000'
      ctx.fillStyle = '#334155'
      ctx.fillRect(obs.x, 0, obs.width, obs.gapTop)
      ctx.strokeRect(obs.x, -4, obs.width, obs.gapTop + 4)
      ctx.fillRect(
        obs.x,
        obs.gapTop + CONFIG.gapSize,
        obs.width,
        CONFIG.height - (obs.gapTop + CONFIG.gapSize)
      )
      ctx.strokeRect(
        obs.x,
        obs.gapTop + CONFIG.gapSize,
        obs.width,
        CONFIG.height - (obs.gapTop + CONFIG.gapSize) + 4
      )
    })
    const totalSegments = Math.min(
      s.headHistory.length,
      Math.floor(s.armLength)
    )
    if (totalSegments > 0 && s.headHistory[0]) {
      ctx.beginPath()
      ctx.lineWidth = 14
      ctx.lineCap = 'square'
      ctx.strokeStyle = '#000000'
      ctx.moveTo(s.headHistory[0].x, s.headHistory[0].y)
      for (let i = 1; i < totalSegments; i++) {
        const seg = s.headHistory[i]
        if (seg) ctx.lineTo(seg.x, seg.y)
      }
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#ffb6c1'
      ctx.moveTo(s.headHistory[0].x, s.headHistory[0].y)
      for (let i = 1; i < totalSegments; i++) {
        const seg = s.headHistory[i]
        if (seg) ctx.lineTo(seg.x, seg.y)
      }
      ctx.stroke()
    }
    ctx.lineWidth = 4
    ctx.strokeStyle = '#000000'
    ctx.fillStyle = '#94a3b8'
    ctx.beginPath()
    ctx.arc(s.headX, s.headY - 6, CONFIG.spoonWidth / 2, 0, Math.PI, false)
    ctx.fill()
    ctx.stroke()
    const indicatorY = s.headY + 22
    const maxSlipDistance = CONFIG.spoonWidth / 2 + CONFIG.eggRadiusX
    const slipRatio = Math.abs(s.eggX) / maxSlipDistance
    ctx.fillStyle = '#000000'
    ctx.fillRect(
      s.headX - CONFIG.spoonWidth / 2,
      indicatorY,
      CONFIG.spoonWidth,
      6
    )
    ctx.fillStyle =
      Math.abs(s.eggX) > CONFIG.spoonLipWidth
        ? '#ef4444'
        : slipRatio > 0.4
          ? '#eab308'
          : '#22c55e'
    ctx.fillRect(
      s.headX - (CONFIG.spoonWidth * (1 - slipRatio)) / 2,
      indicatorY + 1,
      CONFIG.spoonWidth * (1 - slipRatio),
      4
    )
    ctx.save()
    ctx.translate(s.headX + s.eggX, s.headY + s.eggY)
    ctx.rotate(s.eggAngle)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.moveTo(0, -CONFIG.eggRadiusY - 2)
    ctx.bezierCurveTo(
      CONFIG.eggRadiusX + 3,
      -CONFIG.eggRadiusY - 2,
      CONFIG.eggRadiusX + 3,
      CONFIG.eggRadiusY + 2,
      0,
      CONFIG.eggRadiusY + 2
    )
    ctx.bezierCurveTo(
      -CONFIG.eggRadiusX - 3,
      CONFIG.eggRadiusY + 2,
      -CONFIG.eggRadiusX - 3,
      -CONFIG.eggRadiusY - 2,
      0,
      -CONFIG.eggRadiusY - 2
    )
    ctx.fill()
    ctx.fillStyle = '#fffdd0'
    ctx.beginPath()
    ctx.moveTo(0, -CONFIG.eggRadiusY)
    ctx.bezierCurveTo(
      CONFIG.eggRadiusX + 1,
      -CONFIG.eggRadiusY,
      CONFIG.eggRadiusX + 1,
      CONFIG.eggRadiusY,
      0,
      CONFIG.eggRadiusY
    )
    ctx.bezierCurveTo(
      -CONFIG.eggRadiusX - 1,
      CONFIG.eggRadiusY,
      -CONFIG.eggRadiusX - 1,
      -CONFIG.eggRadiusY,
      0,
      -CONFIG.eggRadiusY
    )
    ctx.fill()
    ctx.fillStyle = '#ffcc00'
    ctx.fillRect(-3, -1, 6, 5)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(-4, -5, 3, 3)
    ctx.restore()
    s.particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.2
      p.alpha -= 0.015
      p.angle += p.va
      if (p.alpha <= 0) return
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.fillStyle = `rgba(255, 253, 208, ${p.alpha})`
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
      ctx.restore()
    })
    s.particles = s.particles.filter((p) => p.alpha > 0)
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        handleAction()
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false
    if (state.current.headHistory.length === 0) {
      state.current.headHistory = Array.from({ length: 500 }, (_, i) => ({
        x: 200 - i,
        y: 250
      }))
    }
    let animationId: number
    const updateLoop = () => {
      const s = state.current
      s.frameCount++
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA'])
        s.headX -= CONFIG.horizontalSpeed
      if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD'])
        s.headX += CONFIG.horizontalSpeed
      const oldHeadVy = s.headVy
      if (jumpTriggered.current) {
        s.headVy = CONFIG.flapStrength
        jumpTriggered.current = false
      }
      s.headVy += CONFIG.gravity
      s.headY += s.headVy
      s.armLength += CONFIG.growthRate
      if (s.frameCount % 10 === 0) setDisplayArmLength(s.armLength)

      let prevPt = { x: s.headX, y: s.headY }
      s.headHistory = s.headHistory.map((pt) => {
        let nextX = pt.x - CONFIG.gameSpeed
        let nextY = pt.y
        if (Math.abs(nextX - prevPt.x) > Math.abs(nextY - prevPt.y)) {
          nextY = prevPt.y
        } else {
          nextX = prevPt.x
        }
        prevPt = { x: nextX, y: nextY }
        return prevPt
      })
      s.headHistory.unshift({ x: s.headX, y: s.headY })
      if (s.headHistory.length > Math.ceil(s.armLength) * 4)
        s.headHistory.pop()

      s.eggVx += s.headVy * 0.06
      if (Math.abs(s.eggX) < CONFIG.spoonLipWidth) {
        s.eggVx += -s.eggX * CONFIG.bowlDepth
      } else {
        s.eggVx += (s.eggX > 0 ? 1 : -1) * 0.12
      }
      s.eggVx *= CONFIG.eggFriction
      s.eggX += s.eggVx

      if (s.eggFloatY === 0) {
        s.eggVy = s.headVy
        s.eggVa = s.eggVx * CONFIG.wobbleIntensity
        s.eggAngle = (s.eggAngle + s.eggVa) * 0.85
        if (s.headVy < oldHeadVy) {
          s.eggVy = oldHeadVy * CONFIG.launchInertia
          s.eggFloatY -= 0.1
        }
      } else {
        s.eggVy += CONFIG.eggGravity
        s.eggFloatY += s.eggVy - s.headVy
        s.eggVx -= CONFIG.airDrag
        s.eggAngle += s.eggVx * 0.05
        if (s.eggFloatY >= 0) {
          s.eggFloatY = 0
          s.eggVy = s.headVy
          s.eggVx += s.eggAngle * 1.5
        }
      }
      if (s.eggFloatY < CONFIG.maxFloatHeight) {
        s.eggFloatY = CONFIG.maxFloatHeight
        if (s.eggVy < s.headVy) s.eggVy = s.headVy
      }
      s.eggY = -14 + Math.pow(s.eggX, 2) * 0.015 + s.eggFloatY
      if (Math.abs(s.eggX) > CONFIG.spoonWidth / 2 + CONFIG.eggRadiusX) {
        triggerShatter(s)
        return
      }

      handleObstaclesAndCollisions(s)
      drawGameScene(ctx, s)
      if (gameActive) animationId = requestAnimationFrame(updateLoop)
    }
    animationId = requestAnimationFrame(updateLoop)
    return () => cancelAnimationFrame(animationId)
  }, [gameActive, highScore])

  useEffect(() => {
    if (gameActive) return
    let pid: number
    const pLoop = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      state.current.frameCount++
      drawGameScene(ctx, state.current)
      pid = requestAnimationFrame(pLoop)
    }
    pid = requestAnimationFrame(pLoop)
    return () => cancelAnimationFrame(pid)
  }, [gameActive])

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] font-mono text-white select-none"
      onClick={handleAction}
    >
      <div className="relative border-4 border-neutral-800 bg-black shadow-[0px_0px_30px_rgba(255,182,193,0.15)]">
        <canvas
          className="block cursor-pointer"
          height={CONFIG.height}
          ref={canvasRef}
          width={CONFIG.width}
        />
        <div className="pointer-events-none absolute top-4 left-4 flex flex-col text-left text-xl font-black uppercase">
          <div className="bg-white px-2 py-1 text-black">Score: {score}</div>
          <div className="bg-neutral-900 px-2 py-0.5 text-xs text-neutral-400">
            High: {highScore}
          </div>
          <div className="mt-1 text-[11px] font-bold text-pink-300">
            SNAKE: {Math.floor(displayArmLength)}px
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded border border-neutral-800 bg-neutral-950/80 p-2">
          <button
            className="border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-bold uppercase hover:bg-neutral-800 active:scale-95"
            onMouseDown={() => {
              keysPressed.current['ArrowLeft'] = true
            }}
            onMouseLeave={() => {
              keysPressed.current['ArrowLeft'] = false
            }}
            onMouseUp={() => {
              keysPressed.current['ArrowLeft'] = false
            }}
            onTouchEnd={() => {
              keysPressed.current['ArrowLeft'] = false
            }}
            onTouchStart={() => {
              keysPressed.current['ArrowLeft'] = true
            }}
          >
            ◀ STEER L
          </button>
          <div className="px-1 text-[10px] font-bold text-neutral-500 uppercase">
            [SPACE] FLAP
          </div>
          <button
            className="border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-bold uppercase hover:bg-neutral-800 active:scale-95"
            onMouseDown={() => {
              keysPressed.current['ArrowRight'] = true
            }}
            onMouseLeave={() => {
              keysPressed.current['ArrowRight'] = false
            }}
            onMouseUp={() => {
              keysPressed.current['ArrowRight'] = false
            }}
            onTouchEnd={() => {
              keysPressed.current['ArrowRight'] = false
            }}
            onTouchStart={() => {
              keysPressed.current['ArrowRight'] = true
            }}
          >
            STEER R ▶
          </button>
        </div>
        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center text-white">
            <h2 className="mb-1 text-4xl font-black tracking-wide text-pink-400 uppercase">
              Egg Splat!
            </h2>
            <p className="mb-6 max-w-sm text-sm text-neutral-500 uppercase">
              The ovoid shell cracked open.
            </p>
            <button
              className="cursor-pointer border-2 border-pink-400 bg-pink-500/10 px-8 py-3 text-lg font-black text-pink-300 uppercase hover:bg-pink-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation()
                resetGame()
              }}
            >
              Re-Insert Coin
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PixelSpoonSnakeGame
