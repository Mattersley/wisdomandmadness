import React from 'react'
import { useSecretCode } from '@/features/SecretCode/context/secretCodeContext'

interface SecretGeneratorProps {
  showKey?: boolean; // Prop to dictate text rendering visibility
}

const SecretGenerator: React.FC<SecretGeneratorProps> = ({
  showKey = true
}) => {
  const { generatedCode, regenerateCode, isUnlocked } = useSecretCode()

  if (isUnlocked) return null // Hide module once unlocked successfully

  return (
    <div className="max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center font-mono shadow-lg">
      <span className="mb-2 block text-[10px] tracking-widest text-zinc-500 uppercase">
        Code Engine Node
      </span>

      {showKey ? (
        <div className="group mb-3 cursor-pointer rounded-lg border border-zinc-800/60 bg-zinc-950 p-3 select-all">
          <p className="mb-0.5 text-[10px] text-zinc-600 transition-colors group-hover:text-zinc-400">
            Click string to copy:
          </p>
          <strong className="text-sm font-bold tracking-wider text-amber-400">
            {generatedCode || 'INITIALIZING...'}
          </strong>
        </div>
      ) : (
        <div className="mb-3 rounded-lg border border-zinc-800/60 bg-zinc-950 p-3">
          <p className="text-xs font-semibold text-zinc-500">
            🔒 System token generated securely
          </p>
        </div>
      )}

      <button
        className="rounded border border-zinc-700/60 bg-zinc-900/50 px-3 py-1 text-[11px] text-zinc-400 transition-all hover:border-zinc-600 hover:text-zinc-200 active:scale-95"
        onClick={regenerateCode}
      >
        Cycle Key Sequence
      </button>
    </div>
  )
}

export default SecretGenerator
