import { ProjectType } from '@/features/Madness/data/projects.types'
import Served from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/components/Served'
import Palettes from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/components/Palettes'
import Stack from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/components/Stack'
import Visit from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/components/Visit'

export interface CaseStudyDetailsProps {
  activeCard: ProjectType;
  isLight: boolean;
}

const CaseStudyDetails = ({ activeCard, isLight }: CaseStudyDetailsProps) => {
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-10 font-mono text-xs tracking-wider select-none lg:flex-row lg:items-start">
      <Served activeCard={activeCard} isLight={isLight} />
      {activeCard.colourPalettes && (
        <Palettes activeCard={activeCard} isLight={isLight} />
      )}
      <Stack activeCard={activeCard} isLight={isLight} />
      {activeCard.urls && activeCard.urls.length > 0 && (
        <Visit activeCard={activeCard} isLight={isLight} />
      )}
    </div>
  )
}

export default CaseStudyDetails
