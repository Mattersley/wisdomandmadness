import { useFormContext } from 'react-hook-form'
import { Inputs, SERVICES } from '../types'

export const Services = () => {
  const { register } = useFormContext<Inputs>()

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-xl bg-indigo-50/20">
      <div className="flex items-center flex-col">
        <p className={'font-mono opacity-50 text-2xl tracking-wider text-indigo-500 uppercase'}>
          02.
        </p>
        <h3 className={'font-mono font-xl font-bold tracking-wider text-indigo-500 uppercase'}>
          Services Required
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SERVICES.map((service) => (
          <label
            key={service}
            className="group relative flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 px-2 py-3 text-center text-xs font-medium transition-all hover:border-indigo-500 hover:bg-indigo-50/50"
          >
            <input
              type="checkbox"
              value={service}
              {...register('services')}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-lg border-2 border-indigo-500 opacity-0 transition-opacity peer-checked:opacity-100"></span>
            <span className="relative text-gray-500 z-10 peer-checked:text-indigo-600">
              {service}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Services