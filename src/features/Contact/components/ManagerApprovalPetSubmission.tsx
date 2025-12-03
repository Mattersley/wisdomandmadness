import { useFormContext } from 'react-hook-form'
import { Inputs } from '../types'

const ManagerApproval = () => {
  const { register } = useFormContext<Inputs>()

  return (
    <div className="relative rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/50 p-6">
      <div className="flex items-center flex-col">
        <span className="absolute left-6 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
          !
        </span>
        <p className={'font-mono opacity-50 text-2xl tracking-wider text-pink-500 uppercase'}>
          06.
        </p>
        <h3 className={'font-mono font-xl font-bold tracking-wider text-pink-500 uppercase'}>
          Manager Approval
        </h3>
      </div>
      <p className="mb-4 text-xs text-center text-gray-500 dark:text-gray-400">
        Our CEO (a very judgmental dog) requires a vibe
        check. Please submit a photo of your pet. If you do not
        have a pet, a drawing of a hypothetical pet is
        acceptable. Or...you know...just don&#39;t submit anything, we support your decision.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 text-center">
          <label className="text-xs font-mono text-center uppercase font-medium text-pink-500" htmlFor="petName">
            Pet Name
          </label>
          <input
            id="petName"
            {...register('petName')}
            className="text-center bg-background w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            placeholder="Sir Barks-a-Lot"
          />
        </div>
        <div className="space-y-1.5 text-center">
          <label className="text-xs font-mono uppercase text-center font-medium text-pink-500" htmlFor="petImage">
            Photo Evidence
          </label>
          <input
            accept="image/*"
            id="petImage"
            type="file"
            {...register('petImage')}
            className="bg-background w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-pink-500 file:px-4 file:py-0.5 file:text-xs file:font-bold file:text-white hover:file:bg-pink-500"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2 text-center">
          <label className="text-xs font-mono uppercase text-center font-medium text-pink-500" htmlFor="petBio">
            Pet Bio (Be honest, are they a good boy?)
          </label>
          <textarea
            id="petBio"
            {...register('petBio')}
            className="bg-background w-full text-center resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            placeholder="He eats shoes but has a great personality..."
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}

export default ManagerApproval