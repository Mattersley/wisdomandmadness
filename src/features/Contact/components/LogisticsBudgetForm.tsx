import { useFormContext } from 'react-hook-form'
import { Inputs, TIMELINES } from '../types'

export const Logistics = () => {
  const { register, watch } = useFormContext<Inputs>()
  const budgetValue = watch('budget')

  const formatBudget = (val: string) => {
    const num = parseInt(val, 10)
    if (num >= 20000) return '$20,000+'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xs font-bold tracking-wider text-indigo-500 uppercase">
        03. Logistics
      </h3>

      <div className="space-y-4 rounded-xl bg-gray-50 p-4 dark:bg-white/5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-500" htmlFor="budget">
            Estimated Budget
          </label>
          <span className="text-indigo-400 text-lg font-bold">
            {formatBudget(budgetValue)}
          </span>
        </div>
        <input
          id="budget"
          max="20000"
          min="500"
          step="1000"
          type="range"
          {...register('budget')}
          className="accent-indigo-500 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-white/10"
        />
        <div className="flex justify-between text-[10px] font-medium text-gray-400">
          <span>$1k</span>
          <span>$20k+</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500" htmlFor="timeline">
          Desired Timeline
        </label>
        <div className="flex w-full rounded-lg bg-gray-100 p-1 dark:bg-white/5">
          {TIMELINES.map((item) => (
            <label
              key={item.value}
              className="flex-1 cursor-pointer text-center"
            >
              <input
                id="timeline"
                type="radio"
                value={item.value}
                {...register('timeline')}
                className="peer sr-only"
              />
              <span className="peer-checked:bg-background peer-checked:text-foreground block rounded-md py-2 text-xs font-medium text-gray-500 transition-all peer-checked:shadow-sm hover:text-gray-900 dark:peer-checked:bg-neutral-800 dark:hover:text-gray-200">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Logistics