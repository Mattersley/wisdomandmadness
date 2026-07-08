import LogoText from '@/features/Shared/LogoText/LogoText'
import VanIsle from '@/features/Madness/Footer/VanIsle'
import ContactButton from '@/features/Shared/ContactButton/ContactButton'
import Blobover from "@/features/Shared/Popover/Blobover";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        className="relative h-[700px]"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="pointer-events-none fixed bottom-0 h-[700px] w-full">
          <div className="flex h-full w-full flex-col bg-neutral-800">
            <Section1 />
            <Section2 />
          </div>
        </div>
      </div>
    </footer>
  )
}

const Section1 = () => (
  <>
    <div className="mx-auto mt-auto pb-10 flex h-40 w-[80%] flex-row items-end justify-between border-b border-white/50">
      <div className="pointer-events-auto flex flex-row gap-4">
        <ContactButton transparent={true} />
        <Blobover
          colour="indigo"
          position="right"
          trigger={
            <button
              className="absolute top-8 right-[7vw] flex size-12 items-center justify-center rounded-[50%] bg-indigo-500 text-white hover:bg-gray-500 sm:relative sm:top-auto sm:right-auto sm:size-16"
              type="button"
            >
              <span className="size-full">
                <svg
                  className="mx-auto mt-4 size-6 sm:size-8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                  <path d="M15 6l3 3" />
                  <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                  <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                </svg>
              </span>
            </button>
          }
        >
          INQUIRY WIZARD
        </Blobover>
      </div>
      <VanIsle />
    </div>
    {/*<div className="pointer-events-auto mx-auto mt-5 flex w-[80%] flex-col gap-1 text-right text-xs text-white/20 underline">*/}
    {/*  <p>Privacy Policy</p>*/}
    {/*  <p>Terms & Conditions</p>*/}
    {/*</div>*/}
  </>
);

const Section2 = () => (
  <div className="flex w-full flex-row">
    <div className="3xl:ml-32 3xl:scale-125 mt-auto -mb-14 -ml-68 hidden h-52 scale-50 sm:block md:-mb-10 md:-ml-36 md:scale-75 xl:-mb-5 xl:-ml-8 xl:scale-95">
      <LogoText
        colour={true}
        rightAlign={false}
        row={true}
        sizeM={10.75}
        sizeW={10}
      />
    </div>
    <div className="mt-auto -mb-16 -ml-26 h-52 scale-50 sm:hidden">
      <LogoText
        colour={true}
        footer={true}
        rightAlign={false}
        row={false}
        sizeM={10.75}
        sizeW={10}
      />
    </div>
    <div className="absolute right-10 bottom-10 mt-auto mb-4 ml-auto hidden h-12 md:block xl:relative xl:right-auto xl:bottom-auto xl:mr-20">
      <a
        className="flex flex-col place-items-center text-right text-gray-700"
        href="mailto:design@wisdomandmadness.com"
      >
        <div className="flex flex-col">
          <p className="font-anonymous mt-1 text-xs font-light text-white select-none">
            designed/coded in house by MAT_AT 👁
          </p>
        </div>
      </a>
      <p className="mb-56 text-xs text-white text-right select-none">{`© ${new Date().getFullYear()}`}</p>
    </div>
  </div>
)

export default Footer
