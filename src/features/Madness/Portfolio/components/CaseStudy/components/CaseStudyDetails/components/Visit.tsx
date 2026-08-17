import { CaseStudyDetailsProps } from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/CaseStudyDetails'
import Image from 'next/image'

const Visit = ({ activeCard, isLight }: CaseStudyDetailsProps) => {
  return (
    <div className="flex w-60 flex-col items-center text-center lg:text-left xl:items-start">
      <h4
        className={`mb-3 uppercase ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        // VISIT
      </h4>

      <div className="flex flex-col gap-2.5">
        {activeCard.urls.map((link, index) => (
          <a
            key={index}
            className={`group flex w-50 items-center gap-3 rounded-lg border p-3 font-mono text-[11px] tracking-wide transition-all ${
              isLight
                ? 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-900 hover:bg-neutral-50'
                : 'border-white/5 bg-neutral-800/40 text-neutral-300 hover:border-white/20 hover:bg-neutral-800/80'
            }`}
            href={link.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="favicon"
              className="h-4 w-4 object-contain"
              height={16}
              onError={(e) => {
                e.currentTarget.src =
                  '/images/Portfolio/Cards/fallback-link.png'
              }}
              src={link.favi}
              width={16}
            />

            <span className="truncate group-hover:underline">
              {link.url.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Visit