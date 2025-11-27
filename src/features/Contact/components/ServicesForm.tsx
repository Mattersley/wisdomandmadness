import { useFormContext } from 'react-hook-form'
import { Inputs, SERVICES } from '../types'

export const Services = () => {
  const { register } = useFormContext<Inputs>()

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold tracking-wider text-indigo-500 uppercase">
        02. Services Required
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SERVICES.map((service) => (
          <label
            key={service}
            className="group relative flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 px-2 py-3 text-center text-xs font-medium transition-all hover:border-blue-500 hover:bg-blue-50/50 dark:border-white/10 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
          >
            <input
              type="checkbox"
              value={service}
              {...register('services')}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-lg border-2 border-blue-500 opacity-0 transition-opacity peer-checked:opacity-100 dark:border-blue-400"></span>
            <span className="relative z-10 peer-checked:text-blue-600 dark:peer-checked:text-blue-400">
              {service}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Services