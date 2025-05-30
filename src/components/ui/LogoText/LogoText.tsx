import localFont from 'next/font/local'
const vagraFont = localFont({
  src: '../../../../public/fonts/vagra-pixel.woff2'
})
const instrumentFont = localFont({
  src: '../../../../public/fonts/InstrumentSerif-Regular.woff2'
})

interface LogoTextProps {
  colour?: boolean;
  rightAlign?: boolean;
  row?: boolean;
  sizeM: 1 | 1.75 | 10 | 10.75 | 20 | 20.75;
  sizeW: 1 | 1.75 | 10 | 10.75 | 20 | 20.75;
}

const LogoText = ({
  colour = false,
  rightAlign = false,
  sizeM,
  sizeW,
  row
}: LogoTextProps) => {
  const textSizes = (size: 1 | 1.75 | 10 | 10.75 | 20 | 20.75) => {
    const textSize = {
      1: 'text-[3rem]',
      1.75: 'text-[3.75rem]',
      10: 'text-[10rem]',
      10.75: 'text-[10.75rem]',
      20: 'text-[20rem]',
      20.75: 'text-[15rem]',
      default: 'text-[3rem]'
    }
    return textSize[size] || textSize.default
  }

  return (
    <div
      className={`select-none relative mb-10 flex ${row ? 'flex-row md:items-baseline' : 'flex-col'} ${rightAlign ? 'items-end' : 'items-center'} justify-center gap-2 text-center`}
    >
      <p
        className={`z-0 leading-32 ${row && 'md:mt-0'} ${textSizes(sizeW)} ${instrumentFont.className} ${colour ? 'text-white opacity-100' : 'opacity-30 hover:opacity-100'} `}
      >
        Wisdom
      </p>
      <div
        className={`${row && 'hidden'} absolute top-10 z-[1] h-20 w-full bg-gradient-to-t from-neutral-950 to-transparent`}
      />
      <p
        className={`absolute shadow-2xl ${rightAlign ? 'top-[6rem] -right-[2.01rem] z-[2] text-[#FC466B]' : 'top-8 right-4'} leading-0 ${row && 'md:relative md:top-0 md:right-0 md:-mx-4 md:h-auto md:pb-8 md:leading-normal'} ${colour ? 'text-gray-400' : 'opacity-30 hover:opacity-100'} ${textSizes(sizeM)} scale-30`}
      >
        +
      </p>
      <p
        className={`z-[2] -mt-26 leading-[9.5rem] drop-shadow drop-shadow-black/20 ${row && 'md:mt-0 md:drop-shadow-none'} ${textSizes(sizeM)} ${vagraFont.className} ${colour ? 'bg-gradient-to-tr bg-clip-text text-transparent' : 'opacity-30 hover:bg-gradient-to-tr hover:bg-clip-text hover:text-transparent hover:opacity-100'} from-[#3F5EFB] to-[#FC466B]`}
      >
        Madness
      </p>
    </div>
  )
}

export default LogoText
