import Image from 'next/image'
import React from 'react'
import { ProjectType } from '@/features/Madness/Portfolio/data/projects.types'
import ProjectURLS from '@/features/Madness/Portfolio/components/CaseStudy/components/ProjectURLS'
import {
  motion,
  useScroll,
  useTransform
} from 'motion/react'

interface CardHeaderProps {
  item: ProjectType;
  handleNext: () => void;
  handlePrev: () => void;
  containerNode?: HTMLDivElement | null;
}

const CaseStudyHeader = ({ item, handleNext, handlePrev, containerNode }: CardHeaderProps) => {
  const bgColour = () => {
    const colours: {[name: string]: string} = {
      Cupendium: 'cup-gradient',
      Pando: 'pando-gradient',
      Druid: 'druid-gradient',
      Naturalist: 'naturalist-gradient',
      GlassRoots: 'glassroots-gradient'
    }
    return colours[item.name]
  }

  const buttonBgColour = (colour: string) => {
    const colours: { [name: string]: string } = {
      '#f4d03f': 'hover:bg-[#f4d03f]',
      '#16a085': 'hover:bg-[#16a085]',
      '#FFE6FA': 'hover:bg-[#FFE6FA]',
      '#E3FDF5': 'hover:bg-[#E3FDF5]',
      '#363C48': 'hover:bg-[#363C48]',
      '#1B1B19': 'hover:bg-[#1B1B19]',
      '#d6e9d4': 'hover:bg-[#d6e9d4]',
      '#ffffff': 'hover:bg-[#ffffff]',
      '#30b44a': 'hover:bg-[#30b44a]',
      '#9cb49c': 'hover:bg-[#9cb49c]',
      '#27aae1': 'hover:bg-[#27aae1]',
      '#303b74': 'hover:bg-[#303b74]',
      '#393939': 'hover:bg-[#393939]'
    }
    return colours[colour]
  }

  const { scrollY } = useScroll({
    container: containerNode ? { current: containerNode } : undefined
  })
  
  const headerScale = useTransform(scrollY, [0, 150], [1, 0.8])
  const headerY = useTransform(scrollY, [0, 150], [0, -5])

  return (
    <motion.div
      className={
        'flex h-auto w-full flex-row items-center rounded-b-3xl bg-white'
      }
      layout
      style={{
        ...(item.bgImage
          ? {
              backgroundImage: `url(${item.bgImage})`,
              backgroundPosition: 'center center'
            }
          : {}),
        scale: headerScale,
        y: headerY,
        position: 'sticky',
        top: '0px',
        zIndex: 50,
        transformOrigin: 'top center'
      }}
    >
      <div
        className={`${item.bgImage ? 'bg-cover' : bgColour()} absolute -z-1 top-0 h-full w-full rounded-b-3xl`}
      />
      <button
        className={`group flex h-full cursor-pointer items-center stroke-black group-hover:stroke-white sm:mr-6 sm:p-4 ${buttonBgColour(item.bgColours['1'])} rounded-bl-3xl`}
        onClick={handlePrev}
      >
        <svg
          className={`group ${item.dark ? 'text-white' : 'group-hover:stroke-white'}`}
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 6v12" />
          <path d="M18 6l-6 6l6 6" />
        </svg>
      </button>
      <div className="my-10 flex w-full flex-col items-center justify-between sm:p-3 md:my-2 md:flex-row md:gap-6">
        <p
          className={`${item.dark && 'bg-indigo-500 font-bold text-white'} glassmorphism mb-8 rounded-3xl border border-indigo-500 p-1 px-2 text-xs tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white md:my-0 md:h-8 md:min-w-32 md:pt-1.5 md:pl-3 md:text-sm`}
        >
          CASE STUDY
        </p>
        <div className="relative mb-6 px-4 sm:px-0 md:mb-0 md:px-0">
          <Image
            alt={item.image.alt}
            height={item.image.height}
            src={item.image.src}
            width={item.image.width}
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-right md:flex-row">
          {item.urls.length > 0 && <ProjectURLS urls={item.urls} />}
          <div
            className={`${item.dark && 'text-white'} glassmorphism flex w-full flex-col rounded-2xl border px-4 py-2 text-center text-sm md:p-6 md:text-right`}
          >
            <p className="-mr-1 font-mono text-xs tracking-[0.3rem]">SERVED</p>
            <div className="grid w-full grid-cols-3 flex-col gap-x-4 md:flex md:gap-0">
              {item.served.map((item) => (
                <p
                  key={item}
                  className="transition-colors hover:text-indigo-500"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className={`group flex h-full cursor-pointer items-center stroke-black group-hover:stroke-white sm:ml-6 sm:p-4 ${buttonBgColour(item.bgColours['2'])} rounded-br-3xl`}
        onClick={handleNext}
      >
        <svg
          className={`group ${item.dark ? 'text-white' : 'group-hover:stroke-white'}`}
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 6l6 6l-6 6" />
          <path d="M17 5v13" />
        </svg>
      </button>
    </motion.div>
  )
}

export default CaseStudyHeader
