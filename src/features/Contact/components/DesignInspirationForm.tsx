import { useFormContext, useFieldArray } from 'react-hook-form'
import { Inputs } from '../types'

export const DesignInspiration = () => {
  const { register, control } = useFormContext<Inputs>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inspiration'
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          05. Design Inspiration
        </h3>
        <button
          className="text-[10px] font-bold tracking-wide text-blue-600 uppercase hover:underline dark:text-blue-400"
          onClick={() => append({ url: '' })}
          type="button"
        >
          + Add Link
        </button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`inspiration.${index}.url`)}
              className="flex-1 rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
              placeholder="https://example.com/awesome-design"
            />
            {index > 0 && (
              <button
                className="px-2 text-gray-400 transition-colors hover:text-red-500"
                onClick={() => remove(index)}
                type="button"
              >
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" x2="6" y1="6" y2="18"></line>
                  <line x1="6" x2="18" y1="6" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DesignInspiration