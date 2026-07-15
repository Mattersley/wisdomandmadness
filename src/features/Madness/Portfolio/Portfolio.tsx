import React, { useContext, useState } from 'react'
import Egg from '@/features/Madness/Egg/Egg'
import { projects } from '@/features/Madness/Portfolio/data/projects'
import PortfolioNavBar from '@/features/Madness/Portfolio/components/NavBar/PortfolioNavBar'
import ProjectContainer from '@/features/Madness/Portfolio/components/ProjectContainer/ProjectContainer'
import { EggContext } from '@/context/eggContext'

interface PortfolioPropTypes {
  currentProject: string;
  setCurrentProject: React.Dispatch<React.SetStateAction<string>>;
}

const Portfolio = ({
  currentProject,
  setCurrentProject
}: PortfolioPropTypes) => {
  const { eggs } = useContext(EggContext)
  const [direction, setDirection] = useState(0)
  const currentIndex = projects.findIndex(
    (item) => item.name === currentProject
  )

  const handleNext = () => {
    setDirection(1)
    const nextIndex = (currentIndex + 1) % projects.length
    setCurrentProject(projects[nextIndex].name)
  }

  const handlePrev = () => {
    setDirection(-1)
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setCurrentProject(projects[prevIndex].name)
  }

  return (
    <div
      className={
        'no-scrollbar relative flex h-auto min-h-screen w-screen snap-mandatory snap-center flex-col items-center justify-start bg-white px-10 py-20 sm:px-10 md:px-30 md:pt-32'
      }
      id="work"
    >
      <PortfolioNavBar />
      <div className="3xl:grid-cols-5 my-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {projects.map((item, i) => (
          <ProjectContainer
            key={item.name + i.toString()}
            currentProject={currentProject}
            direction={direction}
            handleNext={handleNext}
            handlePrev={handlePrev}
            item={item}
            setCurrentProject={setCurrentProject}
            setDirection={setDirection}
          />
        ))}
      </div>

      {!eggs.eggList[0].found && (
        <div className="absolute right-3 bottom-3 sm:right-10 sm:bottom-10">
          <Egg id={1} />
        </div>
      )}
    </div>
  )
}

export default Portfolio
