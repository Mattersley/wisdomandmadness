import Image from 'next/image'
import React from 'react'
import { ProjectType } from '@/features/Madness/data/projects.types'

const ProjectURLS = ({ urls }: { urls: ProjectType['urls'] }) => {
  const urlRegex = /^(https?:\/\/)?(www\.)?/
  return (
    <div className={`glassmorphism flex w-full ${urls.length <= 2 ? 'flex-col' : 'flex-row'} items-center justify-center rounded-2xl p-3 text-right md:flex-col md:items-end xl:p-6`}>
      <p className="mr-2 font-mono text-xs tracking-[0.3rem] md:mr-0 md:mb-2">
        {urls.length !== 1 ? 'URLS' : 'URL'}
      </p>
      {urls.map((url) => (
        <a
          key={url.url}
          className={`flex flex-row items-center justify-center hover:opacity-50 ${urls.length < 2 ? 'md:flex-col md:items-end md:justify-end' : 'my-1 px-5'}`}
          href={url.url}
        >
          <Image
            alt="favicon"
            className="mr-2.5"
            height={25}
            src={url.favi}
            width={25}
          />
          <p>{url.url.replace(urlRegex, '')}</p>
        </a>
      ))}
    </div>
  )
}

export default ProjectURLS