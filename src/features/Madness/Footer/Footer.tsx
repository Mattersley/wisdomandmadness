import LogoText from '@/features/Shared/LogoText/LogoText'
import VanIsle from '@/features/Madness/Footer/VanIsle'
import ContactButton from '@/features/Shared/ContactButton/ContactButton'

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
    <div className="mx-auto mt-auto flex h-40 w-[80%] flex-row items-center justify-between border-b border-white/50 pt-5">
      <div className="pointer-events-auto">
        <ContactButton transparent={true} />
      </div>

      <div className="mb-10 flex flex-col items-center">
        <div className="relative mr-6 size-24 text-white">
          <VanIsle />
          <div className="absolute -right-2 bottom-4 size-9 rounded-4xl bg-gradient-to-tl from-[#3F5EFB]/60 to-[#FC466B]/60 hover:bg-gradient-to-tr" />
        </div>
        <p className="mb-4 w-52 font-mono text-xs text-white">
          Proudly serving the world, from our base on Vancouver Island in BC,
          Canada
        </p>
      </div>
    </div>
    {/*<div className="pointer-events-auto mx-auto mt-5 flex w-[80%] flex-col gap-1 text-right text-xs text-white/20 underline">*/}
    {/*  <p>Privacy Policy</p>*/}
    {/*  <p>Terms & Conditions</p>*/}
    {/*</div>*/}
  </>
)

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
    <div className="absolute right-10 bottom-10 mt-auto mb-4 ml-auto hidden h-12 md:block xl:relative xl:right-auto xl:bottom-auto xl:mr-10">
      <a
        className="flex flex-col place-items-center text-left text-gray-700"
        href="mailto:design@wisdomandmadness.com"
      >
        <div className="flex flex-col">
          <p className="font-anonymous mt-1 text-xs font-light text-white select-none">
            designed/coded in house by MAT_AT 👁
          </p>
        </div>
      </a>
      <p className="mb-56 text-xs text-white select-none">{`© ${new Date().getFullYear()}`}</p>
    </div>
  </div>
)

export default Footer
