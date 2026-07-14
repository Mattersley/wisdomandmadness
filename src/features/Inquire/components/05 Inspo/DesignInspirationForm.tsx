import { useFormContext, useFieldArray } from 'react-hook-form'
import { Inputs } from '../../types'

export const DesignInspiration = () => {
  const { register, control } = useFormContext<Inputs>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inspiration'
  })

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-xl bg-indigo-50/20">
      <div className="flex items-center flex-col">
        <p className={'font-mono opacity-50 text-2xl tracking-wider text-indigo-500 uppercase'}>
          05.
        </p>
        <h3 className={'font-mono font-xl font-bold tracking-wider text-indigo-500 uppercase'}>
          Design Inspiration
        </h3>
        <p className="text-sm text-center text-gray-500">
          If you like, provide links to websites that you found helpful or inspiring. You can explain in the additional notes above if you would like.
        </p>
      </div>
      <div className="flex items-center justify-end">
        <button
          className="text-xs text-right font-bold font-mono tracking-widest text-indigo-600 uppercase hover:underline"
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
              className="flex-1 text-center rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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