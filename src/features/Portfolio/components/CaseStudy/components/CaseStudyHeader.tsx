import Image from 'next/image'
import React from 'react'
import { ProjectType } from '@/features/Portfolio/data/projects.types'

interface CardHeaderProps {
  item: ProjectType;
  handleNext: () => void;
  handlePrev: () => void;
}

const CaseStudyHeader = ({ item, handleNext, handlePrev }: CardHeaderProps) => {
  const urlRegex = /^(https?:\/\/)?(www\.)?/
  const textUrl = item.url.replace(urlRegex, '')

  const bgList = {
    cupendium1: 'from-[#f4d03f]/20',
    cupendium2: 'hover:bg-[#f4d03f]',
    cupendium3: 'to-[#16a085]/20',
    cupendium4: 'hover:bg-[#16a085]',
    pando1: 'from-[#FFE6FA]/50',
    pando2: 'hover:bg-[#FFE6FA]',
    pando3: 'to-[#E3FDF5]/50',
    pando4: 'hover:bg-[#E3FDF5]'
  }

  return (
    <div
      className={`flex h-auto w-full flex-row items-center rounded-b-3xl bg-gradient-to-r from-[${item.bgColours['1']}]/20 to-[${item.bgColours['2']}]/20`}
    >
      <button
        className={`flex h-full cursor-pointer items-center stroke-black hover:stroke-white sm:mr-6 sm:p-4 hover:bg-[${item.bgColours['1']}] rounded-bl-3xl`}
        onClick={handlePrev}
      >
        <svg
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
        <p className="glassmorphism mb-8 rounded-3xl border border-indigo-500 p-1 px-2 text-xs tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white md:my-0 md:h-8 md:min-w-32 md:pt-1.5 md:pl-3 md:text-sm">
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
          <div className="glassmorphism flex w-full flex-row items-center justify-center rounded-2xl p-3 text-right md:flex-col md:items-end xl:p-6">
            <p className="mr-2 font-mono text-xs tracking-[0.3rem] md:mr-0 md:mb-2">
              URL
            </p>
            <a
              className="flex flex-row items-center justify-center hover:opacity-50 md:flex-col md:items-end md:justify-end"
              href={item.url}
            >
              <Image
                alt="favicon"
                className="mr-2.5"
                height={25}
                src={'/images/Portfolio/Cards/CupendiumICO.svg'}
                width={25}
              />

              <p>{textUrl}</p>
            </a>
          </div>
          <div className="glassmorphism flex w-full flex-col rounded-2xl border px-4 py-2 text-center text-sm md:p-6 md:text-right">
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
        className={`flex h-full cursor-pointer items-center stroke-black hover:stroke-white sm:ml-6 sm:p-4 hover:bg-[${item.bgColours['2']}] rounded-br-3xl`}
        onClick={handleNext}
      >
        <svg
          fill="none"
          height="32"
          stroke="curentColor"
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
    </div>
  )
}

export default CaseStudyHeader
