import LogoText from '@/components/ui/LogoText/LogoText'

const Footer = () => {
  return (
    <div
      className="relative h-[600px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[600px] w-full">
        <div className="bg-neutral-800 py-8 px-12 h-full w-full flex flex-col justify-between">
          <Section1 />
          <Section2 />
        </div>
      </div>
    </div>
  )
}

const Section1 = () => (
  <div>
    <Nav />
  </div>
)

const Section2 = () => (
  <div className="flex flex-row items-end">
    <div className="self-end scale-75 mt-[14.3rem] -ml-[18rem]">
      <LogoText colour={true} sizeM={20} sizeW={20.75} />
    </div>
    <div>
      <a
        className="mt-6 flex flex-col place-items-center text-left text-gray-700 sm:mt-16"
        href="mailto:design@wisdomandmadness.com"
      >
        <div className="flex flex-col">
          <p className="mt-1 select-none font-anonymous text-xs font-light text-white">
            designed/coded by MAT_AT 👁
          </p>
        </div>
      </a>
      <p className="select-none text-xs mb-[14rem] text-white">{`© ${new Date().getFullYear()}`}</p>
    </div>
  </div>
)

const Nav = () => (
  <div className="flex shrink-0">
    <div className="flex flex-col gap-2"></div>
  </div>
)

export default Footer
