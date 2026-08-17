interface CaseStudyHeroControlsProps {
  isLight: boolean;
  onNavigate: (direction: 'prev' | 'next') => void;
  handleEject: () => void;
}

const CaseStudyHeroControls = ({
  isLight,
  onNavigate,
  handleEject
}: CaseStudyHeroControlsProps) => {
  return (
    <div className="pointer-events-auto absolute top-0 right-0 left-0 z-200 flex w-full items-center justify-between p-8 md:p-16">
      <div className="flex gap-2">
        <button
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
            isLight
              ? 'border-black/10 bg-white/60 text-neutral-900 hover:bg-neutral-900 hover:text-white'
              : 'border-white/10 bg-black/60 text-white hover:bg-white hover:text-black'
          }`}
          onClick={() => onNavigate('prev')}
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
            isLight
              ? 'border-black/10 bg-white/60 text-neutral-900 hover:bg-neutral-900 hover:text-white'
              : 'border-white/10 bg-black/60 text-white hover:bg-white hover:text-black'
          }`}
          onClick={() => onNavigate('next')}
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <button
        className={`rounded-full border px-8 py-3 font-mono text-xs tracking-widest uppercase shadow-lg backdrop-blur-xl transition-all ${
          isLight
            ? 'border-black/20 bg-white/60 text-neutral-900 hover:border-black hover:bg-black hover:text-white'
            : 'border-white/20 bg-black/60 text-white hover:border-white hover:bg-white hover:text-black'
        }`}
        onClick={handleEject}
      >
        RETURN
      </button>
    </div>
  )
}

export default CaseStudyHeroControls