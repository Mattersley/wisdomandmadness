import { useFormContext } from 'react-hook-form'
import { Inputs } from '../types'

const ManagerApproval = () => {
  const { register } = useFormContext<Inputs>()

  return (
    <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
          !
        </span>
        <h3 className="text-xs font-bold tracking-wider text-pink-500 uppercase">
          06. Manager Approval
        </h3>
      </div>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
        Our CEO (a very judgmental dog) requires a vibe
        check. Please submit a photo of your pet. If you do not
        have a pet, a drawing of a hypothetical pet is
        acceptable. Or...you know...just don&#39;t submit anything, we support your decision.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500" htmlFor="petName">
            Pet Name
          </label>
          <input
            id="petName"
            {...register('petName')}
            className="bg-background w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:border-white/10 dark:focus:border-pink-500"
            placeholder="Sir Barks-a-Lot"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500" htmlFor="petImage">
            Photo Evidence
          </label>
          <input
            accept="image/*"
            id="petImage"
            type="file"
            {...register('petImage')}
            className="bg-background w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-0.5 file:text-xs file:font-bold file:text-white hover:file:bg-pink-500 dark:border-white/10"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-gray-500" htmlFor="petBio">
            Pet Bio (Be honest, are they a good boy?)
          </label>
          <textarea
            id="petBio"
            {...register('petBio')}
            className="bg-background w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:border-white/10 dark:focus:border-pink-500"
            placeholder="He eats shoes but has a great personality..."
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}

export default ManagerApproval