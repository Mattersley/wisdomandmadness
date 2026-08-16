import React, { useMemo, useState, useEffect } from 'react'

const GRID_SIZE = 24
const CELL_SIZE = 16
const COLORS = {
  hull: '#00ff41',
  breach: '#ff3131',
  text: '#0dff00',
  scanner: 'rgba(0, 255, 65, 0.4)'
}
const ROOM_NAMES = [
  'BRIDGE',
  'REACTOR',
  'MED-BAY',
  'OXYGEN',
  'CARGO',
  'ENGINE',
  'ARMORY',
  'LAB',
  'LAB-2',
  'NAV'
]

const Schematic: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false)
  const [breaches, setBreaches] = useState<
    { x: number; y: number; name: string }[]
  >([])
  const [scannerX, setScannerX] = useState(0)

  const shipData = useMemo(() => {
    const tempGrid = Array(GRID_SIZE)
      .fill(0)
      .map(() => Array(GRID_SIZE).fill(0))
    const centerX = Math.floor(GRID_SIZE / 2)
    const points: { x: number; y: number; name: string }[] = []

    // Mirrored growth logic
    for (let y = 4; y < GRID_SIZE - 4; y++) {
      const width = Math.floor(Math.random() * 5) + 2
      for (let x = 0; x < width; x++) {
        tempGrid[y][centerX - x] = 1
        tempGrid[y][centerX + x] = 1

        // Add name to point data for breach logs
        points.push({
          x: centerX - x,
          y,
          name: ROOM_NAMES[y % ROOM_NAMES.length]
        })
        points.push({
          x: centerX + x,
          y,
          name: ROOM_NAMES[y % ROOM_NAMES.length]
        })
      }
    }
    return { grid: tempGrid, hullPoints: points }
  }, [])

  // Animation and Breach Logic
  useEffect(() => {
    const blinkTimer = setInterval(() => setIsBlinking((b) => !b), 400)
    const breachTimer = setInterval(() => {
      if (Math.random() > 0.6) {
        const randomPoint =
          shipData.hullPoints[
            Math.floor(Math.random() * shipData.hullPoints.length)
          ]
        // Check if already breached at this specific point
        if (
          !breaches.some((b) => b.x === randomPoint.x && b.y === randomPoint.y)
        ) {
          setBreaches((prev) => [...prev, randomPoint])
        }
      }
    }, 4000)

    const scanTimer = setInterval(() => {
      setScannerX((prev) => (prev + 1) % GRID_SIZE)
    }, 100)

    return () => {
      clearInterval(blinkTimer)
      clearInterval(breachTimer)
      clearInterval(scanTimer)
    }
  }, [shipData.hullPoints, breaches])

  return (
    <div
      className="absolute flex flex-col gap-3 p-5 bg-transparent w-full"
      style={{
        color: COLORS.text,
        maxWidth: `${GRID_SIZE * CELL_SIZE + 40}px`
      }}
    >
      {/* --- 1. SCHEMATIC DISPLAY AREA --- */}
      <div
        style={{ position: 'relative', border: `1px solid ${COLORS.hull}` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: scannerX * CELL_SIZE,
            width: '2px',
            height: GRID_SIZE * CELL_SIZE,
            background: COLORS.scanner,
            boxShadow: `0 0 15px ${COLORS.scanner}`,
            zIndex: 5,
            pointerEvents: 'none',
            transition: 'left 0.1s linear'
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: 0
          }}
        >
          {shipData.grid.map((row, y) =>
            row.map((cell, x) => {
              if (cell === 0)
                return (
                  <div
                    key={`${x}-${y}`}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  />
                )

              const hasTop = y > 0 && shipData.grid[y - 1][x] === 1
              const hasBottom =
                y < GRID_SIZE - 1 && shipData.grid[y + 1][x] === 1
              const hasLeft = x > 0 && shipData.grid[y][x - 1] === 1
              const hasRight =
                x < GRID_SIZE - 1 && shipData.grid[y][x + 1] === 1

              const isBreached = breaches.some((b) => b.x === x && b.y === y)
              const color =
                isBreached && isBlinking ? COLORS.breach : COLORS.hull

              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    boxSizing: 'border-box',
                    borderTop: !hasTop ? `1px solid ${color}` : 'none',
                    borderBottom: !hasBottom ? `1px solid ${color}` : 'none',
                    borderLeft: !hasLeft ? `1px solid ${color}` : 'none',
                    borderRight: !hasRight ? `1px solid ${color}` : 'none',
                    backgroundColor:
                      isBreached && isBlinking
                        ? 'rgba(255, 49, 49, 0.2)'
                        : 'transparent'
                  }}
                />
              )
            })
          )}
        </div>
      </div>

      {/* --- 2. GADGET & READOUT PANEL (Vertical Stacked) --- */}
      <div
        style={{
          width: '100%',
          border: `1px solid ${COLORS.hull}`,
          padding: '15px',
          background: 'rgba(0, 0, 0, 0.2)' // Slight background for contrast
        }}
      >
        <h3
          style={{
            borderBottom: `1px solid ${COLORS.hull}`,
            paddingBottom: '5px'
          }}
        >
          :: TACTICAL READOUT
        </h3>

        <div
          style={{
            fontSize: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}
        >
          <div>
            HULL INTEGRITY:{' '}
            <span
              style={{
                color: breaches.length > 0 ? COLORS.breach : COLORS.text
              }}
            >
              {Math.max(0, 100 - breaches.length * 5)}%
            </span>
          </div>
          <div>
            O2 LEVELS:{' '}
            <span
              style={{
                color: breaches.length > 0 ? COLORS.breach : COLORS.text
              }}
            >
              {Math.max(80, 100 - breaches.length * 10)}%
            </span>
          </div>
          <div>POWER: 99%</div>
        </div>

        <h3
          style={{
            borderBottom: `1px solid ${COLORS.hull}`,
            paddingBottom: '5px'
          }}
        >
          :: BREACH LOG
        </h3>
        <div style={{ fontSize: '9px', maxHeight: '100px', overflowY: 'auto' }}>
          {breaches
            .slice()
            .reverse()
            .map(
              (
                b,
                i // Show newest breaches first
              ) => (
                <div
                  key={i}
                  style={{
                    color: COLORS.breach,
                    borderBottom: '1px dotted rgba(255, 49, 49, 0.3)',
                    padding: '2px 0'
                  }}
                >
                  {'>>'} WARNING: BRCH {b.name} X:{b.x} Y:{b.y}
                </div>
              )
            )}
          {breaches.length === 0 && <div>NO INCIDENTS LOGGED.</div>}
        </div>
      </div>
    </div>
  )
}

export default Schematic
