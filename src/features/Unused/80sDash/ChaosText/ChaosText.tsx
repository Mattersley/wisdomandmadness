import React, { useState, useEffect, useMemo } from 'react'

const initialText = 'ALL SYSTEMS OPERATIONAL'

const ChaosText: React.FC = () => {
  const [chaosLevel, setChaosLevel] = useState(0) 
  const [glitch, setGlitch] = useState({ x: 0, y: 0, active: false })
  const [scrambledText, setScrambledText] = useState(initialText)

  const reset = () => {
    setChaosLevel(0)
    setScrambledText(initialText)
  }

  // 1. Logic for Scrambling Text (The "Daisy Bell" Effect)
  const originalText = 'I FEEL MUCH BETTER NOW... DAISY... DAISY...'
  useEffect(() => {
    const timer = setInterval(() => {
      if (chaosLevel > 10) {
        const scrambled = originalText
          .split('')
          .map((char) =>
            Math.random() * 100 < chaosLevel
              ? String.fromCharCode(33 + Math.random() * 60)
              : char
          )
          .join('')
        setScrambledText(scrambled)
      } else {
        setScrambledText('ALL SYSTEMS NOMINAL')
      }
    }, 100)
    return () => clearInterval(timer)
  }, [chaosLevel])

  // 2. High-Frequency Jitter & Glitch
  useEffect(() => {

    const glitchInterval = setInterval(() => {
      const isGlitching = Math.random() < chaosLevel / 100
      setGlitch({
        x: isGlitching ? (Math.random() - 0.5) * 40 : 0,
        y: isGlitching ? (Math.random() - 0.5) * 10 : 0,
        active: isGlitching
      })
      // Slowly increase chaos over time
      setChaosLevel((prev) => Math.min(prev + 0.008, 100))
    }, 50)
    return () => clearInterval(glitchInterval)
  }, [chaosLevel])

  // 3. Chaotic Voice Waves (Jagged and Sharp)
  const voiceWave = useMemo(() => {
    const points = []
    for (let i = 0; i < 20; i++) {
      const y = 50 + (Math.random() - 0.5) * chaosLevel
      points.push(`${i * 5},${y}`)
    }
    return points.join(' ')
  }, [chaosLevel])

  return (
    <div className="flex w-60 flex-col items-center justify-center border-5 border-[#ff0066]/50 p-6 text-center text-2xl">
      <svg
        className="drop-shadow-crt mx-auto mb-2 size-9"
        fill="none"
        stroke="#ff0066"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"></path>
        <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"></path>
        <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"></path>
        <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"></path>
        <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"></path>
        <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"></path>
      </svg>
      <svg className="absolute">
        <filter id="chaosFilter">
          <feTurbulence
            baseFrequency="0.01 0.2"
            numOctaves="2"
            seed={50}
            type="fractalNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale={glitch.active ? 30 : 0}
          />
        </filter>
      </svg>

      {/* Scrambled HUD */}
      <div className="text-[#ff0066] size-52 overflow-clip text-center flex flex-col justify-between">
        <div className="text-sm opacity-60">
          LOGIC_STATE: {chaosLevel > 80 ? 'MEMORY_PURGE' : 'RECOVERING...'}
        </div>
        <div className="font-bold text-wrap">{scrambledText}</div>

        {/* Chaotic Oscilloscope Line */}
        <svg className="ml-12 -mt-10 -mb-2 size-28" viewBox="45 0 1 100">
          <polyline
            fill="none"
            points={voiceWave}
            stroke="#ff0066"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </svg>
      </div>

      <button
        className="text-shadow-crt cursor-pointer border border-[#ff0066] bg-transparent px-4 py-2 text-xl leading-5 text-[#ff0066] hover:bg-[#ff0066] hover:text-[#0e1111]"
        onClick={reset}
      >
        RESET LOGIC CORE
      </button>
    </div>
  )
}

export default ChaosText
