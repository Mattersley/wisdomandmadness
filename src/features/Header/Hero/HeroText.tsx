import { Inter } from 'next/font/google'
import Image from 'next/image'

import WisdomLogo from '@/assets/WisdomLogo'

 // eslint-disable-next-line new-cap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap' // Recommended for better user experience
})

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // Month is 0-indexed

const HeroText = () => {
  return (
    <div className="absolute right-0 bottom-20 sm:bottom-[8vh] z-50 flex w-full p-4 sm:p-10">
      <div className={`${inter.className} mx-auto flex border border-gray-500 border-t-2 p-10 text-left text-neutral-800`}>
        <div className="flex flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="mb-3 w-16">
              <WisdomLogo />
            </div>
            <div className="flex w-auto flex-row items-center justify-between gap-4">
              <p className="hidden sm:flex text-xs font-bold">{`© ${year}/${month}`}</p>
              <div>
                <Image
                  alt={'Gradient Circle Image'}
                  height={30}
                  src={'/images/web-app-manifest-192x192.png'}
                  width={30}
                />
              </div>
              <p className="w-20 text-xs leading-4">
                Wisdom & Madness Design Co.
              </p>
            </div>
          </div>
          <div>
            <p className="mt-4">
              Your imagination, combined with our team&#39;s creativity,
              experience and technical expertise. If you can think of an idea,
              we find a solution that fits every aspect of your business.
            </p>
            <p className="mt-4">
              From simple single page sales pages, to enterprise app
              development, we respect your business and treat your success as
              ours.
            </p>
            <ul className="mt-4 list-disc pl-6 tracking-tight">
              <li>100% custom, human-coded, creative websites.</li>
              <li>
                No page builders, no unnecessary bulky packages, just your
                imagination.
              </li>
              <li>
                Innovative pricing structures, 24/7 support, and a dedicated
                team.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroText
