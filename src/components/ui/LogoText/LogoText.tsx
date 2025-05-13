import localFont from 'next/font/local'
const vagraFont = localFont({
  src: '../../../../public/fonts/vagra-pixel.woff2'
})
const instrumentFont = localFont({
  src: '../../../../public/fonts/InstrumentSerif-Regular.woff2'
})

import brain from '../../../../public/img/Brain2.png'

interface LogoTextProps {
  colour?: boolean
  sizeM: 1 | 1.75 | 10 | 10.75 | 20 | 20.75
  sizeW: 1 | 1.75 | 10 | 10.75 | 20 | 20.75
}

const LogoText = ({colour = false, sizeM, sizeW}: LogoTextProps) => {
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
      <div className="text-center flex flex-row gap-2 items-baseline">
        <p className={`${textSizes(sizeW)} ${instrumentFont.className} ${colour ? 'text-white opacity-100' : 'opacity-30 hover:opacity-100'} `}>Wisdom</p>
        <p className={`${colour ? 'text-gray-400' : 'opacity-30 hover:opacity-100'} ${textSizes(sizeM)} -mx-4 pb-8 scale-30`}>+</p>
        <p className={`${textSizes(sizeM)} ${vagraFont.className} ${colour ? 'bg-clip-text text-transparent bg-gradient-to-tr' : 'opacity-30 hover:opacity-100 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr'} from-[#3F5EFB] to-[#FC466B]`}>Madness</p>
      </div>
  )
}

export default LogoText
