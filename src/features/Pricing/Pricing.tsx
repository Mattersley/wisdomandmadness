import localFont from 'next/font/local'
import { useState } from 'react'

const instrumentFont = localFont({
  src: '../../../public/fonts/InstrumentSerif-Regular.woff2'
})

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true)

  const pricingTiers = [
    {
      name: 'Small Business',
      description: 'No obligation consultation on how we can refresh your brand identity and website.',
      monthlyPrice: 50,
      oneTimePrice: 1000,
      monthlyFeatures: [
        'Up to 5 pages',
        'Basic SEO',
        '5 updates a month',
        'Email support'
      ],
      oneTimeFeatures: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO',
        'Contact form',
        '1 month support',
        'updates charged per hour'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses',
      monthlyPrice: 79,
      oneTimePrice: 799,
      monthlyFeatures: [
        'Up to 15 pages',
        'Advanced animations',
        'SEO optimization',
        'CMS integration',
        'Weekly updates',
        'Analytics setup',
        'Priority support',
        'A/B testing tools'
      ],
      oneTimeFeatures: [
        'Up to 15 pages',
        'Advanced animations',
        'SEO optimization',
        'CMS integration',
        '3 months support',
        'Analytics setup',
        'Full source code',
        'Documentation'
      ],
      popular: true
    },
    {
      name: 'Business',
      description: 'For established companies',
      monthlyPrice: 119,
      oneTimePrice: 1199,
      monthlyFeatures: [
        'Up to 30 pages',
        'Custom features',
        'Advanced SEO & Analytics',
        'Full CMS with training',
        'Bi-weekly updates',
        'Performance optimization',
        'Priority support',
        'Multi-language support',
        'Third-party integrations'
      ],
      oneTimeFeatures: [
        'Up to 30 pages',
        'Custom features',
        'Advanced SEO & Analytics',
        'Full CMS with training',
        '4 months support',
        'Performance optimization',
        'Complete source code',
        'Full documentation',
        'Multi-language support',
        'Third-party integrations'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For complex applications',
      monthlyPrice: 149,
      oneTimePrice: 'Per Project',
      monthlyFeatures: [
        'Unlimited pages',
        'Fully custom features',
        'Advanced SEO',
        'Enterprise CMS',
        'Daily updates',
        'Priority updates',
        'Performance optimization',
        '24/7 support',
        'Dedicated account manager',
        'Custom integrations',
        'Security audits'
      ],
      oneTimeFeatures: [
        'Unlimited pages',
        'Fully custom features',
        'Advanced SEO',
        'Enterprise CMS',
        '6 months support',
        'Performance optimization',
        'Complete source code',
        'Technical documentation',
        'Training session',
        'White-label options',
        'Security audits'
      ]
    }
  ]

  return (
    <div className="w-2/3 -mb-32 flex flex-col items-center justify-start rounded-3xl bg-white py-20 text-white select-none z-50">
      <h2
        className={`${instrumentFont.className} bg-gradient-to-tr from-[#3F5EFB] to-[#FC466B] bg-clip-text text-[6rem] text-transparent`}
      >
        Pricing
      </h2>

      {/* Toggle Switch */}
      <div className="mb-12 flex items-center gap-4">
        <span
          className={`text-lg font-medium transition-colors ${
            !isMonthly ? 'text-neutral-800' : 'text-neutral-400'
          }`}
        >
          Pay Monthly
        </span>
        <button
          className="relative h-8 w-16 rounded-full bg-gradient-to-r from-[#3F5EFB] to-[#FC466B] transition-all hover:shadow-lg"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
              isMonthly ? 'left-1' : 'left-9'
            }`}
          />
        </button>
        <span
          className={`text-lg font-medium transition-colors ${
            isMonthly ? 'text-neutral-800' : 'text-neutral-400'
          }`}
        >
          Pay Once
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-4">
        {pricingTiers.map((tier, index) => (
          <div
            key={index}
            className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all hover:scale-105 ${
              tier.popular
                ? 'border-transparent bg-gradient-to-br from-[#3F5EFB] to-[#FC466B] shadow-2xl'
                : 'border-neutral-200 bg-white hover:border-indigo-300'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-neutral-900">
                POPULAR
              </span>
            )}

            <h3
              className={`mb-2 text-2xl font-bold ${
                tier.popular ? 'text-white' : 'text-neutral-800'
              }`}
            >
              {tier.name}
            </h3>
            <p
              className={`mb-6 text-sm ${
                tier.popular ? 'text-white/80' : 'text-neutral-500'
              }`}
            >
              {tier.description}
            </p>

            <div className="mb-6">
              {typeof (isMonthly ? tier.monthlyPrice : tier.oneTimePrice) === 'number' ? (
                <>
                  <span
                    className={`text-5xl font-bold ${
                      tier.popular ? 'text-white' : 'text-neutral-800'
                    }`}
                  >
                    ${isMonthly ? tier.monthlyPrice : tier.oneTimePrice}
                  </span>
                  <span
                    className={`ml-2 text-lg ${
                      tier.popular ? 'text-white/80' : 'text-neutral-500'
                    }`}
                  >
                    {isMonthly ? '/month' : 'once'}
                  </span>
                </>
              ) : (
                <span
                  className={`text-3xl font-bold ${
                    tier.popular ? 'text-white' : 'text-neutral-800'
                  }`}
                >
                  {isMonthly ? `$${tier.monthlyPrice}/month` : tier.oneTimePrice}
                </span>
              )}
            </div>

            <ul className="mb-8 flex-grow space-y-3">
              {(isMonthly ? tier.monthlyFeatures : tier.oneTimeFeatures).map(
                (feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-start gap-2 text-sm ${
                      tier.popular ? 'text-white' : 'text-neutral-600'
                    }`}
                  >
                    <svg
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                        tier.popular ? 'text-white' : 'text-indigo-500'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                )
              )}
            </ul>

            <button
              className={`rounded-lg py-3 font-semibold transition-all ${
                tier.popular
                  ? 'bg-white text-indigo-600 hover:bg-neutral-100'
                  : 'bg-gradient-to-r from-[#3F5EFB] to-[#FC466B] text-white hover:shadow-lg'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing