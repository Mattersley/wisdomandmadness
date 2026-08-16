import {
  ArtifactsIcon,
  RealitiesIcon,
  SystemsIcon
} from '@/features/Madness/Hero/features/HeroText/components/Icons'

const herotext = {
  sys: {
    num: '01',
    title: 'Systems',
    icon: <SystemsIcon className="size-6" />,
    subtitle: 'Web development, apps, and digital experiences',
    desc: 'We engineer high-performance enterprise web applications and custom interactive experiences. No rigid page builders or bloated, generic packages—just fast, human-coded, scalable digital architecture designed to withstand high-volume operations.',
    points: [
      'Bespoke enterprise applications and platforms',
      'High-motion, immersive creative frontend sites',
      'Clean, custom-coded headless CMS setups'
    ],
    colorClass: 'bg-indigo-500 text-white',
    accentTextClass: 'text-indigo-500',
    accentBgClass: 'bg-indigo-500'
  },
  art: {
    num: '02',
    title: 'Assets',
    icon: <ArtifactsIcon className="size-6" />,
    subtitle: 'Graphic design, branding, and physical items',
    desc: 'We forge razor-sharp brand identities and translate them into physical, textured realities. Disrupting traditional graphic design by manipulating raw paper, clay prototypes, alternative typography, and sensory product packaging.',
    points: [
      'Core brand books, custom typography, and logic',
      'Luxury menus and physical collateral',
      'Bespoke physical fabrication, event tents, and wraps'
    ],
    colorClass: 'bg-rose-500 text-white',
    accentTextClass: 'text-rose-500',
    accentBgClass: 'bg-rose-500'
  },
  real: {
    num: '03',
    title: 'Concepts',
    icon: <RealitiesIcon className="size-6" />,
    subtitle: 'Creative concepts, visual strategy, and art direction',
    desc: 'The overarching narrative and conceptual blueprint before execution begins. We build complete concept bibles that direct avant-garde cocktail programs, michelin-star menus, and raw visual storytelling for brands born to break rules.',
    points: [
      'Auteur-driven creative direction and concept bibles',
      'Liquid R&D, flavor mapping, and culinary identity',
      'Spatial and experiential curation'
    ],
    colorClass: 'bg-white text-black',
    accentTextClass: 'text-white',
    accentBgClass: 'bg-white'
  }
}

export default herotext
