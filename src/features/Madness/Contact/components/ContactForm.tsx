import { useFormContext } from 'react-hook-form'
import { Inputs } from '@/features/Madness/Contact/types'

export const ContactForm = () => {
  const { register, formState: { errors } } = useFormContext<Inputs>()

  return (
    <div className="space-y-4 border border-gray-200 rounded-2xl p-4 bg-indigo-50/20">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 text-center">
          <label className="text-indigo-500 uppercase font-mono tracking-[0.2rem] text-sm" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register('name', {
              required: 'Name is required'
            })}
            className="w-full text-center rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Winston Smith"
          />
          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="space-y-1.5 text-center">
          <label className="text-indigo-500 uppercase font-mono tracking-[0.2rem] text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full text-center rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="winston@minitrue.org"
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2 text-center">
          <label className="text-indigo-500 uppercase font-mono tracking-[0.2rem] text-xs" htmlFor="phone">
            Organization
          </label>
          <input
            id="phone"
            {...register('company')}
            className="w-full text-center rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Ministry of Truth"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2 text-center">
          <label className="text-indigo-500 uppercase font-mono tracking-[0.2rem] text-xs" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            className="w-full text-center resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactForm