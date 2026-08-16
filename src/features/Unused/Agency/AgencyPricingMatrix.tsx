import React from 'react'

interface ComponentProps {
  dark?: boolean;
}

const AgencyPricingMatrix = ({ dark = false }: ComponentProps) => {
  const tiers = [
    {
      name: 'Tactile Blueprint',
      scope: 'BRAND & ARTIFACTS',
      price: '$10,000+',
      desc: 'Complete visual weaponization for new hospitality or alternative luxury concepts.',
      features: [
        'Core Brand ID & Type System',
        'Tactile Menu Layout & Material Specs',
        'Physical Print, Wrap, or Tent Specs',
        'High-Motion 1-Page Identity Link'
      ]
    },
    {
      name: 'Digital Overdrive',
      scope: 'SYSTEMS & APPS',
      price: '$25,000+',
      desc: 'Full-scale custom platform engineering for high-volume corporate and hospitality venues.',
      features: [
        'Human-Coded Next.js/Remix Platform',
        'Custom Back-End Web Application',
        'Headless Content Management Engine',
        'Secure Reservation/Inventory Logistics'
      ]
    },
    {
      name: 'Absolute Reality',
      scope: 'THE FULL CONFLICT',
      price: '$45,000+',
      desc: 'The ultimate deployment. We dictate the creative direction, forge physical CaseStudies, and deploy the entire digital network.',
      features: [
        'Complete Concept Bible & Story Arc',
        'Liquid R&D / Menu Concept Consulting',
        'Physical Paper/Clay Vessel Prototypes',
        'All Deliverables from Tiers 1 and 2'
      ]
    }
  ]

  return (
    <div className="mt-24 w-full font-mono text-xs tracking-tight">
      <span
        className={`mb-4 block text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}
      >
        // DEPLOYMENT FEES & SCALABILITY
      </span>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between border p-6 transition-all duration-200 ${
              idx === 2
                ? dark
                  ? 'border-neutral-900 bg-neutral-900 text-neutral-100 shadow-xl'
                  : 'border-neutral-100 bg-neutral-100 text-neutral-950 shadow-xl'
                : dark
                  ? 'border-neutral-200 bg-transparent text-neutral-800'
                  : 'border-neutral-800 bg-transparent text-neutral-400'
            }`}
          >
            {idx === 2 && (
              <span className="absolute top-3 right-3 animate-pulse rounded-sm bg-red-600 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white">
                CRITICAL VALUE
              </span>
            )}

            <div>
              <div className="mb-1 text-[10px] tracking-wider uppercase opacity-50">
                // {tier.scope}
              </div>
              <h3
                className={`mb-1 font-sans text-xl leading-none font-black tracking-tight uppercase ${
                  idx === 2
                    ? dark
                      ? 'text-neutral-100'
                      : 'text-neutral-950'
                    : dark
                      ? 'text-neutral-900'
                      : 'text-neutral-100'
                }`}
              >
                {tier.name}
              </h3>
              <div className="my-4 font-sans text-2xl font-black tracking-tighter text-red-500">
                {tier.price}{' '}
                <span className="font-mono text-[10px] font-normal tracking-normal text-neutral-500">
                  USD FLAT FEE
                </span>
              </div>
              <p className="mb-6 font-sans text-xs leading-relaxed normal-case opacity-80">
                {tier.desc}
              </p>
            </div>

            <div>
              <ul
                className={`mb-6 space-y-2 border-t pt-4 ${
                  idx === 2
                    ? dark
                      ? 'border-neutral-800'
                      : 'border-neutral-200'
                    : dark
                      ? 'border-neutral-200'
                      : 'border-neutral-800'
                }`}
              >
                {tier.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="font-bold text-red-500">✓</span>
                    <span className="font-sans text-xs normal-case opacity-90">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full border py-3 font-bold uppercase transition-all duration-150 ${
                  idx === 2
                    ? dark
                      ? 'border-neutral-100 bg-neutral-100 text-neutral-950 hover:bg-transparent hover:text-neutral-100'
                      : 'border-neutral-950 bg-neutral-950 text-neutral-100 hover:bg-transparent hover:text-neutral-950'
                    : dark
                      ? 'border-neutral-900 bg-neutral-900 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-950'
                      : 'border-neutral-100 bg-neutral-100 text-neutral-950 hover:bg-transparent hover:text-neutral-100'
                }`}
              >
                SECURE SLOT ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Retainer Note */}
      <div
        className={`mt-6 text-center text-[10px] uppercase opacity-50 ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}
      >
        Need ongoing priority execution? We reserve exactly two slots for
        fractional monthly retainers at **$8,500/mo**.
      </div>
    </div>
  )
}

export default AgencyPricingMatrix
