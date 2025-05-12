import localFont from 'next/font/local'
const vagraFont = localFont({
  src: '../../../../public/fonts/vagra-pixel.woff2'
})
const instrumentFont = localFont({
  src: '../../../../public/fonts/InstrumentSerif-Regular.woff2'
})

import brain from '../../../../public/img/Brain2.png'

const LogoText = () => (
  <div className="text-center leading-0 relative flex flex-col sm:flex-row sm:gap-2 sm:items-baseline sm:ml-4">
    <p className={`text-[3rem] opacity-30 hover:opacity-100  ${instrumentFont.className}`}>Wisdom</p>
    <p className="self-center mt-7 -mb-4 opacity-30 hover:opacity-100 sm:mt-2">+</p>
    <p className={`text-6xl opacity-30 hover:opacity-100 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] ${vagraFont.className}`}>Madness</p>
    {/*<div className="absolute rounded-4xl top-3 -left-8 opacity-80 size-12 mb-6">*/}
    {/*    <LavaLamp/>*/}
    {/*</div>*/}
  </div>
)

export default LogoText
