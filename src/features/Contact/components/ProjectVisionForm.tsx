import { useFormContext } from 'react-hook-form'
import { Inputs, PROJECT_STATUSES } from '../types'

export const ProjectVision = () => {
  const { register, formState: { errors } } = useFormContext<Inputs>()

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
        04. The Vision
      </h3>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500" htmlFor="status">
          Current Status
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PROJECT_STATUSES.map((status) => (
            <label key={status.value} className="cursor-pointer">
              <input
                id="status"
                type="radio"
                value={status.value}
                {...register('projectStatus')}
                className="peer sr-only"
              />
              <div className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-xs font-medium transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:border-gray-300 dark:border-white/10 dark:peer-checked:border-blue-400 dark:peer-checked:bg-blue-900/20 dark:peer-checked:text-blue-400 dark:hover:border-white/20">
                {status.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-500" htmlFor="goal">
          What is the primary goal of this project?
        </label>
        <textarea
          id="goal"
          {...register('goals', {
            required: 'Please specify a goal'
          })}
          className="w-full resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
          placeholder="e.g. Increase conversion rates, launch a new product..."
          rows={2}
        />
        {errors.goals && (
          <span className="text-xs text-red-500">
            {errors.goals.message}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-500" htmlFor="audience">
          Who is the target audience?
        </label>
        <input
          id="audience"
          {...register('targetAudience')}
          className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
          placeholder="e.g. Young professionals, B2B..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-500" htmlFor="additionalInfo">
          Additional Details
        </label>
        <textarea
          id="additionalInfo"
          {...register('additionalInfo')}
          className="w-full resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
          placeholder="Specific features, constraints, or burning questions..."
          rows={3}
        />
      </div>
    </div>
  )
}

export default ProjectVision