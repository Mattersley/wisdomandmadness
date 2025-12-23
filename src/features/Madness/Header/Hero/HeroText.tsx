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

const HeroText = ({
  dark = true,
  floating = true,
  text = true
}: {
  dark?: boolean;
  floating?: boolean;
  text?: boolean;
}) => {
  return (
    <div
      className={` ${floating && 'xs:bottom-20 absolute right-0 bottom-0 z-30 p-4 sm:bottom-[8vh] sm:p-10'} ${dark ? 'text-neutral-800' : 'text-white'} flex w-full`}
    >
      <div
        className={`${inter.className} mx-auto flex border border-t-2 border-gray-500 p-10 text-left w-full`}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="mb-3 w-16">
              <WisdomLogo />
            </div>
            <div className="flex w-auto flex-row items-center justify-between gap-4">
              <p className="hidden text-xs font-bold sm:flex">{`© ${year}/${month}`}</p>
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
          {text &&
            <div
              className={`${dark ? 'text-neutral-800' : 'text-neutral-500'} `}
            >
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
          }
        </div>
      </div>
    </div>
  )
}

export default HeroText
