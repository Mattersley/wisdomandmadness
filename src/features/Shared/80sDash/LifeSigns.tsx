import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { Activity, Heart, AlertTriangle, User } from 'lucide-react'

interface WaveformProps {
  color: string;
  speed?: number;
}

interface CrewMember {
  name: string;
  id: string;
  baseBPM: number;
  status: 'NOMINAL' | 'STRESS' | 'CRITICAL' | 'FLATLINE';
}

const CREW: CrewMember[] = [
  { name: 'KANE, G.', id: 'A-112', baseBPM: 72, status: 'STRESS' },
  { name: 'RIPLEY, E.', id: 'A-113', baseBPM: 68, status: 'NOMINAL' },
  { name: 'LAMBERT, J.', id: 'A-114', baseBPM: 85, status: 'CRITICAL' },
  { name: 'PARKER, J.', id: 'A-115', baseBPM: 70, status: 'NOMINAL' }
]

const PhosphorTrace: React.FC<{ color: string; speed?: number }> = ({
  color,
  speed = 2
}) => {
  // A static ECG path.
  // IMPORTANT: The path is static; the MASK moves to create the "tracing" effect.
  const pathData =
    'M 0 50 L 40 50 L 45 40 L 50 50 L 55 10 L 60 90 L 65 50 L 75 50 L 80 45 L 85 50 L 120 50 L 160 50 L 165 40 L 170 50 L 175 10 L 180 90 L 185 50 L 200 50 L 240 50 L 280 50 L 285 40 L 290 50 L 295 10 L 300 90 L 305 50 L 340 50 L 400 50'

  return (
    <div className="group relative h-32 overflow-hidden border-y border-white/10 bg-black/60">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <svg
        className="relative z-10 block h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 100"
      >
        <defs>
          {/* The "Scanning Beam" Mask: A gradient that moves Right to Left */}
          <linearGradient id="traceGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="10%" stopColor="white" stopOpacity="1" />
            <stop offset="20%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="traceMask">
            <motion.rect
              animate={{ x: ['100%', '-100%'] }} // Right to Left
              fill="url(#traceGradient)"
              height="100"
              transition={{
                duration: speed,
                ease: 'linear',
                repeat: Infinity
              }}
              width="100%"
              x="-100%"
              y="0"
            />
          </mask>
        </defs>

        {/* 1. The Persistent "Ghost" Line (Very faint) */}
        <path
          className="opacity-10"
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="1"
        />

        {/* 2. The Bright "Trace" Line (Revealed by the mask) */}
        <path
          d={pathData}
          fill="none"
          mask="url(#traceMask)"
          stroke={color}
          strokeWidth="2.5"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />

        {/* 3. The "Scanning Blip" (The bright head of the line) */}
        <motion.circle
          animate={{
            offsetDistance: ['0%', '100%']
          }}
          className="[offset-path:path('M_400_50_L_0_50')]" // Simplified straight path for the blip
          fill={color}
          r="3"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          transition={{
            duration: speed,
            ease: 'linear',
            repeat: Infinity
          }}
        />
      </svg>

      {/* Retro HUD Overlay */}
      <div className="absolute top-2 left-2 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
        <span className="font-mono text-[8px] tracking-widest text-white/50">
          TRACE_MODE: ACTIVE
        </span>
      </div>
    </div>
  )
}



const InteractiveLifeMonitor: React.FC = () => {
  const [selectedID, setSelectedID] = useState(CREW[0].id)
  const [ticker, setTicker] = useState(0)

  // Derive current status colors
  const activeCrew = useMemo(
    () => CREW.find((c) => c.id === selectedID) || CREW[0],
    [selectedID]
  )

  const themeColor = {
    NOMINAL: '#00ff41', // Classic Green
    STRESS: '#ffb400', // Mother Amber
    CRITICAL: '#ff3131', // Emergency Red
    FLATLINE: '#444444' // Dead Grey
  }[activeCrew.status]

  // Animation ticker for the heartbeat wave
  useEffect(() => {
    const interval = setInterval(() => setTicker((t) => t + 1), 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex max-w-60 flex-col gap-2 overflow-hidden border-[#1a1a1a] bg-[#0a0a0a] p-6">
      {/* features Info */}
      <div
        className="relative flex flex-col items-start justify-between border-b-2 pb-2"
        style={{ borderColor: themeColor }}
      >
        <div className="font-mono uppercase">
          <h2 className="text-[8px] opacity-70" style={{ color: themeColor }}>
            Bio-Telemetry // MU-TH-UR 6000
          </h2>
          <h1 className="text-xl font-bold" style={{ color: themeColor }}>
            {activeCrew.name}
          </h1>
          <span
            className="bg-white/10 px-1 text-[10px]"
            style={{ color: themeColor }}
          >
            ID: {activeCrew.id}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[8px]" style={{ color: themeColor }}>
            SIGNAL STRENGTH: 98%
          </span>
        </div>
        <div
          className="absolute right-0 bottom-1 flex items-center gap-2 text-2xl font-black"
          style={{ color: themeColor }}
        >
          <Heart
            className={activeCrew.status !== 'NOMINAL' ? 'animate-ping' : ''}
            size={20}
          />
          {activeCrew.status === 'FLATLINE'
            ? '00'
            : Math.floor(activeCrew.baseBPM + Math.sin(ticker / 5) * 3)}{' '}
          <span className="text-xs">BPM</span>
        </div>
      </div>

      {/* Interactive ECG Waveform */}
      <div className="relative h-32 overflow-hidden border border-white/10 bg-black/50">
        <svg className="h-full w-full opacity-80" viewBox="0 0 400 100">
          <motion.path
            animate={{ x: [-500, 0] }}
            d={'M 0 50 Q 20 50 30 50 L 35 20 L 40 80 L 45 50 Q 100 50 400 50'}
            fill="none"
            stroke={themeColor}
            strokeWidth="2"
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          {/* Static Grid Lines */}
          {[...Array(10)].map((_, i) => (
            <line
              key={i}
              stroke={themeColor}
              strokeOpacity="0.1"
              x1={i * 40}
              x2={i * 40}
              y1="0"
              y2="100"
            />
          ))}
        </svg>
      </div>

      {/* Crew Selector Grid */}
      <div className="grid grid-cols-4 gap-2">
        {CREW.map((c) => (
          <button
            key={c.id}
            className={`flex flex-col items-center gap-1 border-2 p-2 transition-all ${
              selectedID === c.id
                ? 'border-white bg-white/10 text-white'
                : 'border-white/20 text-white/40'
            }`}
            onClick={() => setSelectedID(c.id)}
          >
            <User size={16} />
            <span className="font-mono text-[8px] leading-none">
              {c.name.split(',')[0]}
            </span>
            {c.status === 'CRITICAL' && (
              <AlertTriangle className="animate-pulse text-red-500" size={10} />
            )}
          </button>
        ))}
      </div>

      {/* Footer System Status */}
      <div className="flex flex-col justify-between border-t border-white/10 pt-2 font-mono text-[9px] tracking-widest uppercase">
        <div className="flex items-center gap-2" style={{ color: themeColor }}>
          <Activity size={12} />
          <span>Condition: {activeCrew.status}</span>
        </div>
        <div className="text-white/30 italic">Priority One: Biosign Lock</div>
      </div>
    </div>
  )
}

export default InteractiveLifeMonitor
