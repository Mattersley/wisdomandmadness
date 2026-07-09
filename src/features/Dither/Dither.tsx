import React from 'react'
import {DitheringShader} from './components/ui/dithering-shader'
import { Card, CardContent, CardHeader, CardTitle} from './components/ui/card'

const demos = [
   {
      shape: 'simplex' as const,
      label: 'Simplex Noise',
      colors: { back: '#001122', front: '#ff0088' }
   },
   {
      shape: 'warp' as const,
      label: 'Warp',
      colors: { back: '#0a0a0a', front: '#00ff9f' }
   },
   {
      shape: 'dots' as const,
      label: 'Dots',
      colors: { back: '#1a0033', front: '#ff3366' }
   },
   {
      shape: 'wave' as const,
      label: 'Wave',
      colors: { back: '#001122', front: '#ff0088' }
   },
   {
      shape: 'ripple' as const,
      label: 'Ripple',
      colors: { back: '#000033', front: '#00aaff' }
   },
   {
      shape: 'swirl' as const,
      label: 'Swirl',
      colors: { back: '#330011', front: '#ffaa00' }
   },
   {
      shape: 'sphere' as const,
      label: 'Sphere',
      colors: { back: '#110022', front: '#aa00ff' }
   }
]

const Dither = () => {
   return (
     <div className="w-full min-h-screen bg-background p-4">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
         {demos.map((demo) => (
           <Card key={demo.shape} className="group relative overflow-hidden transition-transform hover:scale-105">
             <CardHeader className="p-4 pb-2">
               <CardTitle className="text-lg">{demo.label}</CardTitle>
             </CardHeader>
             <CardContent className="p-4 pt-2">
               <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border">
                 <DitheringShader
                   className="absolute inset-0"
                   colorBack={demo.colors.back}
                   colorFront={demo.colors.front}
                   pxSize={3}
                   shape={demo.shape}
                   speed={0.5}
                   type="8x8"
                 />
               </div>
             </CardContent>
           </Card>
         ))}
       </div>
     </div>
   )
}

export default Dither