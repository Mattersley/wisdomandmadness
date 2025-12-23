import React from 'react'

const CorporateHeader: React.FC = () => (
  <div className="flex w-60 flex-col items-center border-y-2 border-[#444] bg-[#222] p-5 shadow-inner">
    <div className="flex items-center gap-3">
      <div className="flex w-20 text-white">
        <svg viewBox="0 0 524.23 206" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-black" d="M.2,0l114.99,205.7h72.18l74.89-141.4,73.14,141.4h66.84L524.23,0h-74.89l-74.89,141.4L299.56,0h-74.89l-74.89,141.4L74.89,0H0h.2Z"/>
          <path className="fill-neutral-400" d="M212.28,206h99.78l-50.37-103.8-49.45,103.8h.04Z"/>
          <path className="fill-neutral-400" d="M324.58,0h99.78l-49.9,102.9L324.55,0h.03Z"/>
          <path className="fill-neutral-400" d="M99.98,0h99.78l-49.9,102.9L99.96,0h.03Z"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white">
          WIS-MAD CORP
        </span>
        <span className="font-mono text-[7px] text-gray-400 italic">
          BUILDING BETTER WEB WORLDS
        </span>
      </div>
    </div>
    <div className="mt-2 h-1 w-full bg-[repeating-linear-gradient(45deg,#ffb400,#ffb400_5px,#222_5px,#222_10px)]" />
  </div>
)

export default CorporateHeader