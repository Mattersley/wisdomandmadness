import { CaseStudyDetailsProps } from '@/features/Madness/Portfolio/components/CaseStudy/components/CaseStudyDetails/CaseStudyDetails'

const Served = ({ activeCard, isLight }: CaseStudyDetailsProps) => {
  return (
    <div className="text-center lg:w-30 lg:text-left">
      <h4
        className={`mb-2 uppercase ${
          isLight ? 'text-neutral-900' : 'text-white'
        }`}
      >
        // SERVED
      </h4>

      <div className="mt-3 grid grid-cols-2 flex-col gap-1 gap-x-8 lg:flex">
        {activeCard.served?.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  )
}

export default Served
