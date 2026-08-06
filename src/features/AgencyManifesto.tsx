import React from 'react'

interface ComponentProps {
  dark?: boolean;
}

const AgencyManifesto = ({ dark = false }: ComponentProps) => {
  const principles = [
    {
      num: '01',
      title: 'No Middlemen, No Bloat',
      body: 'You talk directly to the builder. We do not use template page builders, bulky agency frameworks, or generic offshore scripts. Every single line of code is human-authored, and every physical asset is hand-sculpted.'
    },
    {
      num: '02',
      title: 'Elegant Violence in Design',
      body: 'Alternative culture is not a trend; it is an uncompromising standard of authenticity. We bring a raw, punk-rock subversion to luxury spaces, night life, and corporate applications. If you want safe, boring templates, go somewhere else.'
    },
    {
      num: '03',
      title: 'Systems Must Live Under Stress',
      body: 'A gorgeous website is useless if the underlying enterprise app crashes during high-volume reservation spikes. Our digital cores are engineered like ironclad industrial machines. Stability under heavy pressure is non-negotiable.'
    }
  ]

  return (
    <div
      className="mt-24 w-full font-mono text-xs tracking-tight"
      id="manifesto"
    >
      <div className="grid grid-cols-1 gap-8 border-b border-neutral-800 pb-8 lg:grid-cols-12">
        {/* Left Headline Pin */}
        <div className="lg:col-span-4">
          <span
            className={`mb-2 block text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}
          >
            // CORE IDEOLOGY
          </span>
          <h2
            className={`font-sans text-3xl leading-none font-black tracking-tighter uppercase ${dark ? 'text-neutral-900' : 'text-neutral-500'}`}
          >
            The Manifesto <br />
            <span className={dark ? 'text-neutral-500' : 'text-neutral-100'}>
              of Friction
            </span>
          </h2>
        </div>

        {/* Right Ethos Subtitle */}
        <div className="flex items-end lg:col-span-8">
          <p
            className={`max-w-xl font-sans text-base leading-relaxed normal-case italic ${dark ? 'text-neutral-600' : 'text-neutral-400'}`}
          >
            "We believe the boundaries between digital networks, raw physical
            branding, and hospitality concepts are completely imaginary. We
            destroy the compromise between precision code and organic dirt."
          </p>
        </div>
      </div>

      {/* 3-Column Pillar Breakdown */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {principles.map((p, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-bold text-red-500">
              <span>[{p.num}]</span>
              <div
                className={`h-[1px] w-full ${dark ? 'bg-neutral-200' : 'bg-neutral-800'}`}
              />
            </div>
            <h4
              className={`font-sans text-sm font-bold tracking-tight uppercase ${dark ? 'text-neutral-900' : 'text-neutral-100'}`}
            >
              {p.title}
            </h4>
            <p
              className={`font-sans text-xs leading-relaxed normal-case ${dark ? 'text-neutral-600' : 'text-neutral-400'}`}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgencyManifesto