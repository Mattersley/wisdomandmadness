import BrainModel from '@/features/Shared/80sDash/BrainModel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import React, { Suspense } from 'react'
import { Activity, Heart } from 'lucide-react'

const BrainTank = () => {
  return (
    <div className="relative flex w-60 flex-col gap-2 overflow-hidden border-[#1a1a1a] bg-[#0a0a0a] p-6">
      {/* Header Info */}
      <div
        className="relative flex flex-col items-start justify-between border-b-2 pb-2"
        style={{ borderColor: '#ffb400' }}
      >
        <div className="font-mono uppercase">
          <h2 className="text-[8px] opacity-70" style={{ color: '#ffb400' }}>
            Bio-Telemetry // WIS-MAD 666
          </h2>
          <h1 className="text-xl font-bold" style={{ color: '#ffb400' }}>
            BRAIN
          </h1>
          <span
            className="bg-white/10 px-1 text-[10px]"
            style={{ color: '#ffb400' }}
          >
            ID: 666
          </span>
        </div>
        <div className="text-right">
          <span className="text-[8px]" style={{ color: '#ffb400' }}>
            SIGNAL STRENGTH: 98%
          </span>
        </div>
        <div
          className="absolute right-0 bottom-1 flex items-center gap-2 text-2xl font-black"
          style={{ color: '#ffb400' }}
        >
          <Heart className={'animate-ping'} size={20} />
          90
          <span className="text-xs">BPM</span>
        </div>
      </div>


        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <BrainModel />
          </Suspense>
        </Canvas>


      {/* Crew Selector Grid */}

      {/* Footer System Status */}
      <div className="flex flex-col justify-between border-t border-white/10 pt-2 font-mono text-[9px] tracking-widest uppercase">
        <div className="flex items-center gap-2" style={{ color: '#ffb400' }}>
          <Activity size={12} />
          <span>Condition: DEAD</span>
        </div>
        <div className="text-white/30 italic">Priority One: Biosign Lock</div>
      </div>
    </div>
  )
}

export default BrainTank