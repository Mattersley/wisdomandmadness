import { CaseStudyDetailsProps } from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/CaseStudyDetails'

const Palettes = ({ activeCard, isLight }: CaseStudyDetailsProps) => {
  return (
    <div
      className={`${activeCard.colourPalettes?.pal && activeCard.colourPalettes.bg && 'min-h-40'} text-center lg:text-left`}
    >
      <h4
        className={`mb-3 -ml-5 uppercase lg:ml-0 ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        // PALETTES
      </h4>
      <div className="mt-2 flex h-20 flex-col gap-3">
        {activeCard.colourPalettes?.pal && (
          <div className="flex flex-row items-start gap-2 font-mono text-xs">
            <p className="absolute mt-1.5 -ml-9 text-[10px]">MAIN</p>
            {activeCard.colourPalettes.pal.map((colour) => (
              <div
                key={colour}
                className="group flex cursor-crosshair flex-col items-center gap-1"
              >
                <div
                  className={'h-6 w-18 rounded transition-all group-hover:h-18'}
                  style={{
                    background: colour
                  }}
                />
                {colour}
              </div>
            ))}
          </div>
        )}
        {activeCard.colourPalettes?.bg && (
          <div className="flex flex-row items-start gap-2 font-mono text-xs">
            <p className="absolute mt-1.5 -ml-9 text-[10px]">GRAD</p>
            {activeCard.colourPalettes.bg.map((colour) => (
              <div
                key={colour}
                className="group flex cursor-crosshair flex-col items-center gap-1"
              >
                <div
                  className={'h-6 w-18 rounded transition-all group-hover:h-18'}
                  style={{
                    background: colour
                  }}
                />
                {colour}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Palettes
