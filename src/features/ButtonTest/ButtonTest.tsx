import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cubicBezier } from 'motion/react'
import TiltCard from '@/features/ButtonTest/BTCard/components/BTTiltCard'
import CaseStudyPortal from '@/features/ButtonTest/BTCard/components/BTCaseStudyPortal'
import PortfolioNavBar from '@/features/Madness/Portfolio/components/NavBar/PortfolioNavBar'
import { projects } from '@/features/Madness/Portfolio/data/projects'

const ButtonTest = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null
  )
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredProjects = projects.filter((project) => {
    if (!activeFilter) return true
    const insideServed = project.served?.some(
      (s) => s.toLowerCase() === activeFilter.toLowerCase()
    )
    const insideStack = project.stack?.some(
      (t) => t.toLowerCase() === activeFilter.toLowerCase()
    )
    return insideServed || insideStack
  })

  const activeCard = projects.find((c) => c.id === activeId)
  const activeIndex = filteredProjects.findIndex((c) => c.id === activeId)

  // Smooth cinematic ease-in-out curve
  const vortexEase = cubicBezier(0.76, 0, 0.24, 1)

  const handleSelectCard = (id: number) => {
    setSlideDirection(null)
    setActiveId(id)
  }

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (activeIndex === -1 || filteredProjects.length === 0) return
    let nextIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1

    if (nextIndex >= filteredProjects.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = filteredProjects.length - 1

    setActiveId(filteredProjects[nextIndex].id)
    setSlideDirection(direction === 'next' ? 'right' : 'left')
  }

  const handleEject = () => {
    setActiveId(null)
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-white select-none dark:bg-neutral-950">
      <motion.div
        animate={{ opacity: activeId ? 0 : 1, y: activeId ? -10 : 0 }}
        className="w-full"
        transition={{ duration: 0.3, ease: vortexEase }}
      >
        <PortfolioNavBar
          currentFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </motion.div>

      {/* Container is kept stable at scale 1 to prevent layout calculations from breaking */}
      <div className="flex w-full origin-center items-center justify-center p-0 pt-10 lg:p-10 2xl:p-20 xl:pt-20">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((card) => {
            const isThisCardActive = activeId === card.id
            const isAnyCardActive = activeId !== null

            return (
              <div key={card.id} className="relative aspect-video h-52 w-full">
                <motion.div
                  animate={{
                    opacity: isAnyCardActive && !isThisCardActive ? 0 : 1,
                    scale: isAnyCardActive && !isThisCardActive ? 0.92 : 1,
                    filter:
                      isAnyCardActive && !isThisCardActive
                        ? 'blur(4px)'
                        : 'blur(0px)'
                  }}
                  className="h-full w-full"
                  transition={{ duration: 0.4, ease: vortexEase }}
                >
                  <TiltCard
                    card={card}
                    isActive={isThisCardActive}
                    onSelect={() => handleSelectCard(card.id)}
                  />
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeId && activeCard && (
          <CaseStudyPortal
            activeCard={activeCard}
            activeId={activeId}
            handleEject={handleEject}
            onNavigate={handleNavigateProject}
            slideDirection={slideDirection}
            vortexEase={vortexEase}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ButtonTest
