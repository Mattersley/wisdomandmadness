import { useFormContext } from 'react-hook-form'
import { Inputs } from '@/features/Contact/types'


export const ContactForm = () => {
  const { register, formState: { errors } } = useFormContext<Inputs>()

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold tracking-wider text-indigo-500 uppercase">
        01. Contact Info
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register('name', {
              required: 'Name is required'
            })}
            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500" htmlFor="email">
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
            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
            placeholder="jane@company.com"
          />
          {errors.email && (
            <span className="text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-gray-500" htmlFor="phone">
            Company / Organization
          </label>
          <input
            id="phone"
            {...register('company')}
            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
            placeholder="Acme Inc."
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-gray-500" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            className="w-full resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:focus:border-blue-400"
            placeholder="Let us know what you're looking for and we'll get back to you as soon as possible."
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactForm