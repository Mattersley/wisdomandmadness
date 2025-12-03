import Card from '@/features/Portfolio/components/Card/Card'
import CaseStudy from '@/features/Portfolio/components/CaseStudy/CaseStudy'
import CaseStudyHeader from '@/features/Portfolio/components/CaseStudy/components/CaseStudyHeader'
import Pando from '@/features/Portfolio/components/CaseStudy/components/Pando/Pando'
import Druid from '@/features/Portfolio/components/CaseStudy/components/Druid/Druid'
import Cupendium from '@/features/Portfolio/components/CaseStudy/components/Cupendium/Cupendium'
import React, { useState } from 'react'
import { ProjectType } from '@/features/Portfolio/data/projects.types'
import LiquidInquirer from '@/features/Portfolio/components/CaseStudy/components/LiquidInquirer/LiquidInquirer'
import CIMS from '@/features/Portfolio/components/CaseStudy/components/CIMS/CIMS'
import GlassRoots from '@/features/Portfolio/components/CaseStudy/components/GlassRoots/GlassRoots'
import SpiritFish from '@/features/Portfolio/components/CaseStudy/components/SpiritFish/SpiritFish'
import Hattersleys from '@/features/Portfolio/components/CaseStudy/components/Hattersleys/Hattersleys'
import Naturalist from '@/features/Portfolio/components/CaseStudy/components/Naturalist/Naturalist'

interface ProjectContainerProps {
  currentProject: string;
  direction: number;
  handleNext: () => void;
  handlePrev: () => void;
  item: ProjectType;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
}

const ProjectContainer = ({currentProject, direction, handleNext, handlePrev, item, setCurrentProject, setDirection}: ProjectContainerProps) => {
  const [closing, setClosing] = useState(false)

  return (
    <>
      <Card
        closing={closing}
        current={currentProject}
        name={item.name}
        setClosing={setClosing}
        setCurrent={setCurrentProject}
        z={item.z}
      />
      <CaseStudy
        closing={closing}
        direction={direction}
        open={currentProject === item.name}
        setClosing={setClosing}
        setCurrent={setCurrentProject}
        setDirection={setDirection}
      >
        <div className="no-scrollbar mt-8 flex h-full w-full flex-col items-center overflow-y-scroll select-none md:overflow-auto">
          <CaseStudyHeader
            handleNext={handleNext}
            handlePrev={handlePrev}
            item={item}
          />
          {currentProject === 'Pando' && <Pando />}
          {currentProject === 'Druid' && <Druid />}
          {currentProject === 'Cupendium' && <Cupendium />}
          {currentProject === 'Naturalist' && <Naturalist />}
          {currentProject === 'Hattersleys' && <Hattersleys />}
          {currentProject === 'SpiritFish' && <SpiritFish />}
          {currentProject === 'GlassRoots' && <GlassRoots />}
          {currentProject === 'LI' && <LiquidInquirer />}
          {currentProject === 'CIMS' && <CIMS />}
        </div>
      </CaseStudy>
    </>
  )
}

export default ProjectContainer