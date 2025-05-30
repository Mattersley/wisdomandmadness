import LogoText from '@/components/ui/LogoText/LogoText'
import VanIsle from '@/components/Footer/VanIsle'
import ContactButton from '@/components/ui/ContactButton/ContactButton'

const Footer = () => {
  return (
    <footer>
      <div
        className="relative h-[600px]"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="fixed bottom-0 h-[600px] w-full">
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
    <div
      className="mx-auto mt-auto flex h-40 w-[80%] flex-row items-center justify-between border-b border-white/50 pt-5">
      <ContactButton transparent={true} />

      <div className="flex flex-col items-center mb-10">
        <div className="relative mr-6 size-24 text-white">
          <VanIsle />
          <div
            className="absolute -right-2 bottom-4 size-9 rounded-4xl bg-gradient-to-tl from-[#3F5EFB]/60 to-[#FC466B]/60 hover:bg-gradient-to-tr" />
        </div>
        <p className="w-52 mb-4 font-mono text-xs text-white">
          Proudly serving the world, from our base on Vancouver Island in BC, Canada
        </p>
      </div>
    </div>
    <div className="w-[80%] mt-5 mx-auto mt-0 underline text-right gap-1 flex flex-col text-xs text-white/20">
      <p>Privacy Policy</p>
      <p>Terms & Conditions</p>
    </div>
  </>
)

const Section2 = () => (
  <div className="flex w-full flex-row">
    <div className="mt-auto ml-32 h-52 scale-125">
      <LogoText
        colour={true}
        rightAlign={false}
        row={true}
        sizeM={10.75}
        sizeW={10}
      />
    </div>
    <div className="mt-auto mr-10 mb-4 ml-auto h-12">
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
      <p className="mb-[14rem] text-xs text-white select-none">{`© ${new Date().getFullYear()}`}</p>
    </div>
  </div>
)

export default Footer
