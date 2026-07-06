import Card from '@/features/Madness/Portfolio/components/Card/Card'
import CaseStudy from '@/features/Madness/Portfolio/components/CaseStudy/CaseStudy'
import CaseStudyHeader from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyHeader'
import Pando from '@/features/Madness/Portfolio/components/CaseStudy/components/Pando/Pando'
import Druid from '@/features/Madness/Portfolio/components/CaseStudy/components/Druid/Druid'
import Cupendium from '@/features/Madness/Portfolio/components/CaseStudy/components/Cupendium/Cupendium'
import React, { useEffect, useRef, useState } from 'react'
import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'
import LiquidInquirer from '@/features/Madness/Portfolio/components/CaseStudy/components/LiquidInquirer/LiquidInquirer'
import CIMS from '@/features/Madness/Portfolio/components/CaseStudy/components/CIMS/CIMS'
import GlassRoots from '@/features/Madness/Portfolio/components/CaseStudy/components/GlassRoots/GlassRoots'
import SpiritFish from '@/features/Madness/Portfolio/components/CaseStudy/components/SpiritFish/SpiritFish'
import Hattersleys from '@/features/Madness/Portfolio/components/CaseStudy/components/Hattersleys/Hattersleys'
import Naturalist from '@/features/Madness/Portfolio/components/CaseStudy/components/Naturalist/Naturalist'
import { useScroll } from 'framer-motion'
import { useMotionValueEvent } from 'motion/react'

interface ProjectContainerProps {
  currentProject: string;
  direction: number;
  handleNext: () => void;
  handlePrev: () => void;
  item: ProjectType;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
}

const ProjectContainer = ({
  currentProject,
  direction,
  handleNext,
  handlePrev,
  item,
  setCurrentProject,
  setDirection
}: ProjectContainerProps) => {
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null
  )
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
        containerNode={containerNode}
        direction={direction}
        open={currentProject === item.name}
        setClosing={setClosing}
        setCurrent={setCurrentProject}
        setDirection={setDirection}
      >
        <div
          className="no-scrollbar mt-8 flex h-full w-full flex-col items-center overflow-y-auto select-none"
          ref={setContainerNode}
        >
          <CaseStudyHeader
            containerNode={containerNode}
            handleNext={handleNext}
            handlePrev={handlePrev}
            item={item}
          />
          <div className="flex w-full flex-col items-center">
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
        </div>
      </CaseStudy>
    </>
  )
}

export default ProjectContainer
