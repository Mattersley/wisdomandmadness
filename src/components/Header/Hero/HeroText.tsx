import WisdomAndMadnessLogo from '@/assets/WisdomLogo'
import LogoText from '@/components/ui/LogoText/LogoText'
import { useContext } from 'react'
import { EggContext } from '@/context/eggContext'

const HeroText = () => {
  const { eggs, eggFound } = useContext(EggContext)

  const handleClick = () => {
    if (eggs.eggs > 0) {
      eggFound(1)
    }
  }

  return (
    <div className="flex min-h-screen md:min-h-80 w-screen flex-col items-center py-6 xl:py-20 sm:p-10 md:w-auto xl:justify-start">
      <div className="absolute -top-10 -left-10 hidden size-32 self-start rounded-3xl bg-white xl:block" />
      <div className="flex flex-col items-center text-center xl:items-end">
        <div className="relative">
          <div className="w-28 scale-75 text-white sm:scale-100">
            <WisdomAndMadnessLogo />
          </div>
          <div className="absolute top-9 left-7 mb-6 size-12 scale-75 rounded-4xl bg-gradient-to-tl from-[#3F5EFB]/60 to-[#FC466B]/60 hover:bg-gradient-to-tr sm:top-10 sm:scale-100" />
        </div>
        <div className="-mt-8 scale-[56%] text-white sm:mt-auto sm:scale-75 xl:hidden">
          <LogoText
            colour
            rightAlign={false}
            row={false}
            sizeM={10.75}
            sizeW={10}
          />
        </div>
        <div className="hidden text-white xl:block">
          <LogoText
            colour
            rightAlign={true}
            row={false}
            sizeM={10.75}
            sizeW={10}
          />
        </div>
        {/*<div className="3xl:-left-0 hidden text-white sm:-left-28 sm:scale-200 md:absolute md:top-[40%] md:-left-12 md:block md:-rotate-90 md:self-end">*/}
        {/*  <LogoText sizeM={1.75} sizeW={1} />*/}
        {/*</div>*/}
        <>
          <button className="hidden md:block" onClick={handleClick}>
            <h1
              className={`${eggs.eggs > 0 && !eggs.eggList[1].found && 'text-2xl'} font-mono text-2xl tracking-wide text-wrap text-white/80 sm:text-4xl`}
            >
              {eggs.eggs > 0 && !eggs.eggList[1].found
                ? 'Eggceptional'
                : 'Intentional'}{' '}
              Design
            </h1>
          </button>
          <div className="-mt-8 items-center flex max-w-80 flex-col text-center font-mono text-sm text-white/60 sm:mt-0 sm:max-w-[30rem] md:max-w-[40rem] xl:items-end xl:text-right xl:text-[1.1rem]">
            <div className="flex flex-row md:mt-6">
              <span className="flex flex-col gap-2">
                <p>100% custom, human-coded, creative websites.</p>
                <p>
                  No page builders, no unnecessary bulky packages, just your
                  imagination.
                </p>
              </span>
              <div className="my-auto xl:ml-4 hidden scale-105 text-white xl:block">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 11.5v-1a1.5 1.5 0 0 1 3 0v1.5"></path>
                  <path d="M17 12v-6.5a1.5 1.5 0 0 1 3 0v10.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
                  <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5"></path>
                  <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row">
              <p>
                Innovative pricing structures, 24/7 support, and a dedicated
                team
              </p>
              <div className="my-auto xl:ml-4 hidden scale-105 text-white xl:block">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z"></path>
                  <path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592"></path>
                  <path d="M7 10h-.01"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row self-center xl:self-end">
              <p>No design, no fee</p>
              <div className="my-auto xl:ml-4 hidden scale-105 text-white xl:block">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 21v-16m2 -2h10a2 2 0 0 1 2 2v10m0 4.01v1.99l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
                  <path d="M11 7l4 0"></path>
                  <path d="M9 11l2 0"></path>
                  <path d="M13 15l2 0"></path>
                  <path d="M15 11l0 .01"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-row">
              <p>
                From single page static websites, to enterprise app development
              </p>
              <div className="my-auto xl:ml-4 hidden scale-105 text-white xl:block">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
                  <path d="M14 7l6 0"></path>
                  <path d="M17 4l0 6"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mb-0 flex h-16 w-52 items-center rounded-[3rem] bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] text-center text-white hover:bg-gradient-to-tr">
            <p className="w-full text-xs font-bold tracking-widest">
              LEARN MORE
            </p>
          </div>
        </>
      </div>
    </div>
  )
}

export default HeroText
