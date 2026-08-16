import React from 'react'

const OperatorTerminal = () => {
  return (
    <div className="relative h-80 w-60 overflow-hidden border border-emerald-900 bg-black p-4 font-mono">

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between border-b border-emerald-900 pb-1 text-[10px] text-emerald-500">
          <span>OPERATOR_CON</span>
          <span className="animate-pulse">_LN_99</span>
        </div>

        <div className="text-xs leading-tight text-emerald-400">
          {'>> TARGET: ZION_MAIN\n>> SIGNAL: STABLE\n>> TRACE: 0.00%'}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex h-20 items-center justify-center border border-emerald-900 bg-emerald-950/20">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
          <div className="h-20 overflow-hidden border border-emerald-900 bg-emerald-950/20 p-2">
            <span className="text-[6px] break-all text-emerald-600">
              {'0101110010101010101011001010101010101100101010101010'}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrix {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}

export default OperatorTerminal
