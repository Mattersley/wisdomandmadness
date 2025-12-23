import React, { useState, useEffect } from 'react'

const SymbolKeyboard: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([])
  const [active, setActive] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [pressedKey, setPressedKey] = useState<string | null>(null)

  const keys = [
    ['△', '◇', '○', '□', '▽', '◐'],
    ['⬢', '⊕', '⊗', '⊙', '◉', '◎'],
    ['▲', '▼', '◀', '▶', '◆', '◈'],
    ['✶', '✦', '✧', '⊛', '⊚', '⊜'],
    ['⬡', '⬢', '⬣', '⬤', '⬥', '⬦']
  ]

  const specialKeys = [
    { label: 'SCRAM', symbol: '⚠', action: 'emergency' },
    { label: 'PURGE', symbol: '☢', action: 'purge' },
    { label: 'OVERRIDE', symbol: '⊗', action: 'override' },
    { label: 'COOLANT', symbol: '❄', action: 'coolant' }
  ]

  const handleKeyPress = (key: string) => {
    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 200)

    setSequence((prev) => [...prev, key].slice(-10))

    // Play activation sound effect (visual feedback)
    if (!active && sequence.length > 3) {
      setActive(true)
    }
  }

  const handleSpecialKey = (action: string) => {
    if (action === 'emergency') {
      setCountdown(10)
      setActive(true)
    } else if (action === 'override') {
      setCountdown(null)
      setActive(false)
      setSequence([])
    }
  }

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Display Panel */}
        <div className="mb-8 rounded-lg border-4 border-yellow-600 bg-linear-to-b from-gray-900 to-black p-6 shadow-2xl">
          <div className="mb-4 text-center">
            <div className="text-sm tracking-widest text-green-500">
              EMERGENCY PROTOCOL SYSTEM
            </div>
          </div>

          {/* Status Display */}
          <div className="mb-4 border-2 border-yellow-700 bg-black p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-yellow-500">STATUS:</span>
              <span
                className={`text-xs font-bold ${active ? 'animate-pulse text-red-500' : 'text-green-500'}`}
              >
                {active ? '⚠ ACTIVE' : '● STANDBY'}
              </span>
            </div>

            {countdown !== null && (
              <div className="py-4 text-center">
                <div className="animate-pulse text-6xl font-bold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                  {countdown}
                </div>
                <div className="mt-2 text-sm tracking-wider text-red-400">
                  SELF DESTRUCT SEQUENCE INITIATED
                </div>
              </div>
            )}

            {/* Sequence Display */}
            <div className="mt-4 flex min-h-10 flex-wrap justify-center gap-2">
              {sequence.map((key, idx) => (
                <span
                  key={idx}
                  className="text-2xl text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>

          {/* Special Function Keys */}
          <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {specialKeys.map((key) => (
              <button
                key={key.action}
                className="rounded border-2 border-red-600 bg-linear-to-b from-red-900 to-red-950 p-3 shadow-lg transition-all hover:from-red-800 hover:to-red-900 active:scale-95"
                onClick={() => handleSpecialKey(key.action)}
              >
                <div className="mb-1 text-2xl text-red-400">{key.symbol}</div>
                <div className="text-xs tracking-wider text-red-300">
                  {key.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Keyboard Grid */}
      </div>
      <div className="p-4 absolute left-0 w-2/3 bottom-0">
        <div className="space-y-2">
          {keys.map((row, rowIdx) => (
            <div key={rowIdx} className="flex w-full justify-center gap-2">
              {row.map((key, keyIdx) => (
                <button
                  key={`${rowIdx}-${keyIdx}`}
                  className={`size-10 rounded-lg bg-linear-to-b from-amber-100 to-amber-200 text-xl font-bold text-gray-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.3)] transition-all hover:from-amber-200 hover:to-amber-300 active:scale-95 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)] ${pressedKey === key ? 'scale-95 from-yellow-300 to-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]' : ''} `}
                  onClick={() => handleKeyPress(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Warning Strip */}
        <div className="mt-6 border-2 border-yellow-600 bg-yellow-500 py-2 text-center text-xs font-bold tracking-widest text-black">
          ⚠ AUTHORIZED PERSONNEL ONLY ⚠
        </div>
      </div>
    </div>
  )
}

export default SymbolKeyboard
