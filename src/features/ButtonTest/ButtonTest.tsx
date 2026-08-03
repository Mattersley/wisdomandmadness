import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cubicBezier } from 'motion/react'
import TiltCard from '@/features/ButtonTest/BTCard/components/BTTiltCard'
import CaseStudyPortal from '@/features/ButtonTest/BTCard/components/BTCaseStudyPortal'
import PortfolioNavBar from '@/features/Madness/Portfolio/components/NavBar/PortfolioNavBar'
import { projects } from '@/features/Madness/Portfolio/data/projects'

const ButtonTest = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [zoomOrigin, setZoomOrigin] = useState('center center')
  const [ejectOrigin, setEjectOrigin] = useState('center center')
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null
  )

  // New State tracker for navigation filters
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. Compute dynamically filtered items based on navigation choice
  const filteredProjects = projects.filter((project) => {
    if (!activeFilter) return true

    // Check if filter exists inside 'served' matrix or 'stack' arrays
    const insideServed = project.served?.some(
      (s) => s.toLowerCase() === activeFilter.toLowerCase()
    )
    const insideStack = project.stack?.some(
      (t) => t.toLowerCase() === activeFilter.toLowerCase()
    )

    return insideServed || insideStack
  })

  // 2. Adjust pagination bounds to point strictly to the remaining items
  const activeCard = projects.find((c) => c.id === activeId)
  const activeIndex = filteredProjects.findIndex((c) => c.id === activeId)
  const vortexEase = cubicBezier(1, 0, 0.15, 1)

  const updateZoomOriginToCardCenter = (id: number) => {
    const el = cardRefs.current[id]
    if (el) {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const originX = `${(centerX / window.innerWidth) * 100}%`
      const originY = `${(centerY / window.innerHeight) * 100}%`
      const exactCoordinates = `${originX} ${originY}`
      setZoomOrigin(exactCoordinates)
      setEjectOrigin(exactCoordinates)
    }
  }

  const handleSelectCard = (id: number) => {
    updateZoomOriginToCardCenter(id)
    setSlideDirection(null)
    setActiveId(id)
  }

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (activeIndex === -1 || filteredProjects.length === 0) return
    let nextIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1

    if (nextIndex >= filteredProjects.length) nextIndex = 0
    if (nextIndex < 0) nextIndex = filteredProjects.length - 1

    const nextProject = filteredProjects[nextIndex]
    updateZoomOriginToCardCenter(nextProject.id)
    setSlideDirection(direction === 'next' ? 'right' : 'left')
    setActiveId(nextProject.id)
  }

  const handleEject = () => {
    setZoomOrigin(ejectOrigin)
    requestAnimationFrame(() => {
      setActiveId(null)
    })
  }

  return (
    <div className="relative w-full overflow-hidden bg-white text-white select-none dark:bg-neutral-950">
      {/* Insert custom filter Navbar with binding handles */}
      <PortfolioNavBar
        currentFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <motion.div
        animate={{ scale: activeId ? 12 : 1 }}
        className="flex transform-gpu items-center justify-center p-6 pt-20"
        ref={containerRef}
        style={{ transformOrigin: zoomOrigin }}
        transition={{ duration: activeId ? 1.2 : 0.5, ease: vortexEase }}
      >
        {/* Render filtered data matrix gracefully with Framer Layout animations */}
        <motion.div
          className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((card) => (
              <motion.div
                key={card.id}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video h-52 w-full"
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.9 }}
                layout
                ref={(el) => {
                  cardRefs.current[card.id] = el
                }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard
                  card={card}
                  isActive={activeId === card.id}
                  onSelect={() => handleSelectCard(card.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

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
