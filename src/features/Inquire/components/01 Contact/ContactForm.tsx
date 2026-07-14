import { useFormContext } from 'react-hook-form'
import { Inputs } from '@/features/Inquire/types'

export const ContactForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<Inputs>()

  return (
    <div className="flex w-full flex-col items-start justify-start gap-10">
      <input
        {...register('website_confirm_field')}
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        tabIndex={-1}
        type="text"
      />
      <div className="w-full text-left text-neutral-500">
        Let&#39;s get started, so we can find out more about your project and
        provide you exactly what you need.
      </div>
      <div className="size-full space-y-4 rounded-2xl border border-gray-200 bg-indigo-50/20 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              className="ml-1 font-mono text-sm tracking-[0.2rem] text-indigo-500 uppercase"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              {...register('name', {
                required: 'Name is required'
              })}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Winston Smith"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              className="ml-1 font-mono text-sm tracking-[0.2rem] text-indigo-500 uppercase"
              htmlFor="email"
            >
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
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="winston@minitrue.org"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label
              className="ml-1 font-mono text-xs tracking-[0.2rem] text-indigo-500 uppercase"
              htmlFor="company"
            >
              Organization
            </label>
            <input
              id="company"
              {...register('company')}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Ministry of Truth"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label
              className="ml-1 font-mono text-xs tracking-[0.2rem] text-indigo-500 uppercase"
              htmlFor="notes"
            >
              Notes
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              className="w-full resize-none rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
