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
    { label: 'CONCEPT', value: 'Concept' },
    { label: 'BRANDING', value: 'Branding' },
    { label: 'MARKETING MATERIALS', value: 'Marketing' },
    { label: 'PACKAGING', value: 'Packaging' },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'ENTERPRISE APP', value: 'Web App' }
  ]

  return (
    <div className="relative py-10 flex w-full flex-col items-center justify-center gap-2 border-y border-b-2 border-gray-200 border-b-black px-2 select-none xl:h-16 xl:flex-row xl:justify-between">
      {/* Center Identity branding */}
      <div className="flex h-12 -mt-6 mb-2 flex-row text-gray-500 xl:mt-0">
        <WisdomAndMadnessLogo />
        <p className="mt-5 ml-2 text-xs tracking-widest">WORK</p>
      </div>

      {/* Dynamic Filter Links */}
      <div className="z-10 flex flex-row flex-wrap justify-center leading-0 items-center gap-6 font-mono text-[10px] tracking-widest">
        {filters.map((f) => (
          <button
            key={f.label}
            className={`cursor-pointer uppercase transition-all duration-200 hover:text-black ${
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
    </div>
  )
}

export default PortfolioNavBar
