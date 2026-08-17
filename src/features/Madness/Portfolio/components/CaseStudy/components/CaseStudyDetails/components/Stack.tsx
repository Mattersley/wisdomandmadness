import Image from 'next/image'
import { CaseStudyDetailsProps } from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/CaseStudyDetails'

const Stack = ({ activeCard, isLight }: CaseStudyDetailsProps) => {
  return (
    <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start">
      <h4
        className={`mb-2 -ml-9 uppercase lg:ml-0 ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        // STACK
      </h4>

      <div className="mt-1 flex flex-wrap justify-center gap-2 sm:w-90 lg:w-60 lg:justify-start">
        {Object.entries(activeCard.stack!).map(([name, tech]) => (
          <a
            key={name}
            className={`flex w-27 cursor-alias flex-row gap-2 rounded border px-2 py-2 text-[10px] hover:bg-gray-200 ${
              isLight
                ? 'border-neutral-200 bg-white text-neutral-800'
                : 'border-white/5 bg-neutral-800 text-neutral-300'
            }`}
            href={tech}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt={`${name} Icon`}
              height={12}
              src={`https://www.google.com/s2/favicons?domain=${tech}&sz=12`}
              width={12}
            />
            {name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Stack