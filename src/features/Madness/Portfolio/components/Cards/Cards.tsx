import { useState } from 'react'
import { AnimatePresence, motion, cubicBezier } from 'motion/react'

import TiltCard from '@/features/Madness/Portfolio/components/Cards/components/TiltCard'
import CaseStudy from '@/features/Madness/Portfolio/components/Cards/components/CaseStudy'
import PortalReveal from '@/features/Madness/Portfolio/components/Cards/components/PortalReveal'

import { projects } from '@/features/Madness/Portfolio/data/projects'
import PortfolioNavBar from '@/features/Madness/Portfolio/components/NavBar/PortfolioNavBar'

const Cards = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const [zoomingId, setZoomingId] = useState<number | null>(null)
  const [revealData, setRevealData] = useState<{
    cardId: number;
    rect: DOMRect;
  } | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null
  )
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredProjects = projects.filter((project) => {
    if (!activeFilter) return true

    return (
      project.served?.some(
        (s) => s.toLowerCase() === activeFilter.toLowerCase()
      ) ||
      project.stack?.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    )
  })

  const activeCard = projects.find((c) => c.id === activeId)

  const slowVortexEase = cubicBezier(0.76, 0, 0.24, 1)

  const handleSelectCard = (id: number, rect: DOMRect) => {
    setZoomingId(id)
    setRevealData({
      cardId: id,
      rect
    })
  }

  const handleRevealComplete = () => {
    if (!revealData) return
    setActiveId(revealData.cardId)
    setRevealData(null)
  }

  const handleEject = () => {
    setActiveId(null)
    setZoomingId(null)
  }

  return (
    <>
      <PortfolioNavBar
        currentFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="flex w-full items-center justify-center p-0 pt-10 lg:p-10 xl:pt-20 2xl:p-20">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((card) => {
              const isZooming = zoomingId === card.id
              const anotherZooming = zoomingId !== null && !isZooming

              return (
                <motion.div
                  key={card.id}
                  animate={{
                    opacity: anotherZooming ? 0 : 1,
                    scale: anotherZooming ? 0.85 : 1,
                    filter: anotherZooming ? 'blur(16px)' : 'blur(0px)'
                  }}
                  className="relative aspect-video h-52 w-full"
                  transition={{ duration: 2.5, ease: slowVortexEase }}
                >
                  <TiltCard
                    card={card}
                    isActive={isZooming}
                    onSelect={(rect) => handleSelectCard(card.id, rect)}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {revealData && (
        <PortalReveal
          card={projects.find((p) => p.id === revealData.cardId)!}
          onComplete={handleRevealComplete}
          rect={revealData.rect}
        />
      )}

      <AnimatePresence>
        {activeId && activeCard && (
          <CaseStudy
            activeCard={activeCard}
            activeId={activeId}
            handleEject={handleEject}
            onNavigate={(dir) => {
              const idx = filteredProjects.findIndex((c) => c.id === activeId)
              let next = dir === 'next' ? idx + 1 : idx - 1
              if (next >= filteredProjects.length) next = 0
              if (next < 0) next = filteredProjects.length - 1
              setSlideDirection(dir === 'next' ? 'right' : 'left')
              setZoomingId(filteredProjects[next].id)
              setActiveId(filteredProjects[next].id)
            }}
            slideDirection={slideDirection}
            vortexEase={slowVortexEase}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Cards
