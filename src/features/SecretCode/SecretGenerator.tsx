import React from 'react'
import { useSecretCode } from '@/features/SecretCode/context/secretCodeContext'

interface SecretGeneratorProps {
  showKey?: boolean; // Prop to dictate text rendering visibility
}

const SecretGenerator: React.FC<SecretGeneratorProps> = ({
  showKey = true
}) => {
  const { generatedCode, isUnlocked } = useSecretCode()

  if (isUnlocked) return null // Hide module once unlocked successfully

  return (
    <div className="text-center font-mono">
      {showKey ? (
        <div className="group mb-3 cursor-help rounded-lg p-3 select-all">
          <strong className="text-sm tracking-wider text-indigo-600">
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
    </div>
  )
}

export default SecretGenerator
