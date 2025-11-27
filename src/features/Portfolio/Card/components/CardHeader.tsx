import Image from 'next/image'
import React from 'react'

interface CardHeaderProps {
  bgColours: { 1: string; 2: string };
  image: { src: string; alt: string; width: number; height: number };
  url: string;
  served: string[];
}

const CardHeader = ({ bgColours, image, url, served }: CardHeaderProps) => {
  const urlRegex = /^(https?:\/\/)?(www\.)?/
  const textUrl = url.replace(urlRegex, '')

  const bgList = {
    'cupendium1': 'hover:bg-[#f4d03f]',
    'cupendium2': 'hover:bg-[#16a085]'
  }

  return (
    <div
      className={`flex w-full flex-row items-center rounded-b-3xl bg-gradient-to-r from-[${bgColours['1']}]/20 to-[${bgColours['2']}]/20 h-80`}
    >
      <button className={`stroke-black hover:stroke-white mr-6 p-4 h-full flex items-center cursor-pointer hover:bg-[${bgColours['1']}] rounded-bl-3xl`}>
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 6v12" />
          <path d="M18 6l-6 6l6 6" />
        </svg>
      </button>
      <div className="flex w-full flex-row items-center justify-between">
        <p className="ml-10 h-8 rounded-3xl border border-indigo-500 px-4 pt-1.5 text-sm tracking-widest text-indigo-500 hover:bg-indigo-500 hover:font-bold hover:text-white">
          CASE STUDY
        </p>
        <div className="relative">
          <Image
            alt={image.alt}
            height={image.height}
            src={image.src}
            width={image.width}
          />
        </div>
        <div className="flex flex-row items-start text-right">
          <div className="flex flex-col">
            <p className="font-mono text-xs tracking-[0.3rem]">URL</p>
            <a className="hover:text-indigo-600 hover:underline" href={url}>
              <p>{textUrl}</p>
            </a>
          </div>
          <div className="flex flex-col text-sm">
            <p className="-mr-1 font-mono text-xs tracking-[0.3rem]">SERVED</p>
            {served.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
      <button className={`stroke-black hover:stroke-white ml-6 p-4 h-full flex items-center cursor-pointer hover:bg-[${bgColours['2']}] rounded-br-3xl`}>
        <svg
          fill="none"
          height="32"
          stroke="curentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
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

export default CardHeader
