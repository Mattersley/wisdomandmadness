import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import React from 'react'

interface PortfolioNavBarProps {
  currentFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const PortfolioNavBar = ({
  currentFilter,
  onFilterChange
}: PortfolioNavBarProps) => {
  // Available filter options matched precisely against project data keys
  const filters = [
    { label: 'ALL', value: null },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'WEB DITHER', value: 'Web Dither' },
    { label: 'BRANDING', value: 'Branding' },
    { label: 'PACKAGING', value: 'Packaging' }
  ]

  return (
    <div className="relative flex h-16 w-full flex-row items-center justify-between gap-2 border-y border-b-2 border-gray-200 border-b-black px-2 select-none">
      {/* Dynamic Filter Links */}
      <div className="z-10 w-full flex flex-row items-center gap-6 font-mono text-[10px] tracking-widest">
        {filters.map((f) => (
          <button
            key={f.label}
            className={`uppercase transition-all duration-200 hover:text-black ${
              currentFilter === f.value
                ? 'font-bold text-black underline decoration-2 underline-offset-4'
                : 'text-gray-400'
            }`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Center Identity branding */}
      <div className="absolute bottom-2.5 flex h-12 w-30 flex-row justify-center text-gray-500 md:left-[47%]">
        <WisdomAndMadnessLogo />
        <p className="mt-5 ml-2 text-xs tracking-widest">WORK</p>
      </div>
    </div>
  )
}

export default PortfolioNavBar
