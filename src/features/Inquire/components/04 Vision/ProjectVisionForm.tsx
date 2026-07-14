import { useFormContext } from 'react-hook-form'
import { Inputs, PROJECT_STATUSES } from '../../types'

export const ProjectVision = () => {
  const { register, formState: { errors } } = useFormContext<Inputs>()

  return (
    <div className="space-y-6 p-4 border border-gray-200 rounded-xl bg-indigo-50/20">
      <div className="flex items-center flex-col">
      <p className={'font-mono opacity-50 text-2xl tracking-wider text-indigo-500 uppercase'}>
        04.
      </p>
      <h3 className={'font-mono font-xl font-bold tracking-wider text-indigo-500 uppercase'}>
        The Vision
      </h3>
      </div>

      <div className="text-center">
        <label className="text-xs font-mono uppercase tracking-widest text-center font-medium text-indigo-500" htmlFor="status">
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
              <div className="flex items-center justify-center rounded-lg border border-gray-200 py-2.5 text-xs font-medium transition-all peer-checked:border-indigo-500 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 hover:border-gray-300">
                {status.label}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="text-center">
        <label className="text-xs font-medium font-mono uppercase text-indigo-500 tracking-widest" htmlFor="goal">
          What is the primary goal of this project?
        </label>
        <textarea
          id="goal"
          {...register('goals', {
            required: 'Please specify a goal'
          })}
          className="text-center w-full resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g. Increase conversion rates, launch a new product..."
          rows={2}
        />
        {errors.goals && (
          <span className="text-xs text-red-500">
            {errors.goals.message}
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-center">
        <label className="text-xs font-mono text-center uppercase tracking-widest font-medium text-indigo-500" htmlFor="audience">
          Who is the target audience?
        </label>
        <input
          id="audience"
          {...register('targetAudience')}
          className="w-full text-center rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="e.g. Young professionals, B2B..."
        />
      </div>

      <div className="space-y-1.5 text-center">
        <label className="text-xs font-medium font-mono uppercase tracking-widest text-indigo-500" htmlFor="additionalInfo">
          Additional Details
        </label>
        <textarea
          id="additionalInfo"
          {...register('additionalInfo')}
          className="w-full text-center resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="Specific features, constraints, or burning questions..."
          rows={3}
        />
      </div>
    </div>
  )
}

export default ProjectVision