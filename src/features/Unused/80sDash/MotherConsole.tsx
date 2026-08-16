import React from 'react'

const MotherInput: React.FC = () => {
  const [input, setInput] = React.useState('')

  return (
    <div className="w-60 border-2 border-[#ffb400] bg-black p-4">
      <div className="mb-2 font-mono text-xs text-[#ffb400] opacity-70">
        QUERY MU-TH-UR 6000:
      </div>
      <div className="flex items-center gap-2">
        <span className="animate-pulse font-bold text-[#ffb400]">{'>'}</span>
        <input
          autoFocus
          className="w-full border-none bg-transparent font-mono text-[#ffb400] uppercase outline-none"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setInput('')}
          value={input}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-1 bg-[#ffb40022]" />
        ))}
      </div>
    </div>
  )
}

export default MotherInput