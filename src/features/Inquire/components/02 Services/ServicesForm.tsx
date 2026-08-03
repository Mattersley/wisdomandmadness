import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { Inputs, SERVICES_BRANCH_META } from '@/features/Inquire/types'
import { ServicesReceiptTracker } from '@/features/Inquire/components/02 Services/ServicesReceiptTracker'
import { Transition } from 'motion'

// Precise mechanical transition settings to map organic card movement paths
const liquidSpringConfig: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 28,
  mass: 0.75
}

export const Services = () => {
  const { register, watch, setValue } = useFormContext<Inputs>()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const selectedServices = watch('services') || []
  const formValues = watch()

  const handleCardToggle = (serviceId: string) => {
    let updatedServices = [...selectedServices]
    if (updatedServices.includes(serviceId)) {
      updatedServices = updatedServices.filter((id) => id !== serviceId)
      if (expandedCard === serviceId) setExpandedCard(null)
    } else {
      updatedServices.push(serviceId)
    }
    setValue('services', updatedServices, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const toggleDetails = (e: React.MouseEvent, serviceId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedCard(expandedCard === serviceId ? null : serviceId)
  }

  return (
    /* Side-by-side Layout Wrapper Matrix: Pushes the receipt tracker sidebar layout neatly to the right */
    <div className="flex w-full flex-col items-start gap-6 md:flex-row">
      {/* Left Column Stack Area */}
      <div className="w-full flex-1 columns-1 gap-4 rounded-2xl border border-gray-200 bg-indigo-50/20 p-4 [column-fill:balance] sm:columns-2">
        {SERVICES_BRANCH_META.map((service) => {
          const isChecked = selectedServices.includes(service.id)
          const isExpanded = expandedCard === service.id
          const Icon = service.icon

          return (
            <motion.div
              key={service.id}
              className={`relative mb-4 flex inline-block min-h-[155px] w-full cursor-pointer flex-col justify-between rounded-xl border bg-transparent p-4 transition-colors duration-200 select-none ${
                isExpanded
                  ? 'border-blue-500 bg-white/50 shadow-sm'
                  : 'border-gray-200 bg-white/5'
              } ${isChecked && !isExpanded ? 'border-indigo-500/50' : 'hover:border-gray-300'}`}
              layout="position"
              onClick={() => handleCardToggle(service.id)}
              transition={liquidSpringConfig}
            >
              <input
                checked={isChecked}
                type="checkbox"
                {...register('services')}
                className="sr-only"
                onChange={() => {}}
              />

              <div className="flex h-full w-full items-start justify-between">
                <div className="flex h-full flex-1 flex-col justify-between pr-2">
                  <div>
                    <div className="mb-1.5 flex items-center gap-2">
                      <div
                        className={`rounded-lg border p-1.5 transition-colors ${isChecked ? 'border-transparent bg-indigo-500 text-white' : 'border-gray-200 bg-white text-neutral-400'}`}
                      >
                        <Icon size={14} />
                      </div>
                      <h4
                        className={`text-xl font-vt323 uppercase transition-colors ${isChecked ? 'text-indigo-600' : 'text-neutral-800'}`}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-400">
                      {service.description}
                    </p>
                  </div>

                  {isChecked && (
                    <button
                      className={`mt-4 self-start rounded-lg border px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-widest uppercase transition-all ${
                        isExpanded
                          ? 'border-transparent bg-indigo-500 text-white hover:bg-indigo-600'
                          : 'border-gray-200 bg-transparent text-indigo-500 hover:border-gray-300 hover:bg-white'
                      }`}
                      onClick={(e) => toggleDetails(e, service.id)}
                      type="button"
                    >
                      {isExpanded ? 'Hide Specs ▲' : 'Configure Details ▼'}
                    </button>
                  )}
                </div>

                <div
                  className={`mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded border transition-all ${isChecked ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 bg-white/50'}`}
                >
                  {isChecked && (
                    <svg
                      fill="none"
                      height="9"
                      stroke="white"
                      strokeWidth="4"
                      viewBox="0 0 24 24"
                      width="9"
                    >
                      <path
                        d="M5 12l5 5l10 -10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Subfield Configuration Expansion Blocks */}
              <AnimatePresence initial={false}>
                {isChecked && isExpanded && service.subFields.length > 0 && (
                  <motion.div
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full overflow-hidden text-left"
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    transition={liquidSpringConfig}
                  >
                    <div className="mt-4 flex w-full flex-col gap-3.5 border-t border-gray-200/80 pt-4">
                      {service.subFields.map((field) => {
                        const pathString = `serviceDetails.${service.id}.${field.id}`
                        const currentFieldValue =
                          formValues?.serviceDetails?.[service.id]?.[field.id]
                        const isOtherSelected =
                          field.hasOtherOption && currentFieldValue === 'Other'

                        return (
                          <div
                            key={field.id}
                            className="flex w-full flex-col space-y-1.5"
                          >
                            <label
                              className="ml-0.5 font-mono text-[10px] tracking-[0.15rem] text-indigo-500 uppercase"
                              htmlFor={`${service.id}-${field.id}`}
                            >
                              {field.label}
                            </label>

                            {field.type === 'select' && (
                              <select
                                id={`${service.id}-${field.id}`}
                                {...register(pathString as any)}
                                className="w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-xs text-neutral-700 transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="">
                                  -- Dropdown Selection --
                                </option>
                                {field.options?.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === 'input' && (
                              <input
                                id={`${service.id}-${field.id}`}
                                placeholder={field.placeholder}
                                type="text"
                                {...register(pathString as any)}
                                className="w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-xs text-neutral-700 placeholder-neutral-400 transition-all outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                            )}

                            {/* "Other" Option Form Injections */}
                            <AnimatePresence initial={false}>
                              {isOtherSelected && (
                                <motion.div
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="w-full overflow-hidden pt-1.5"
                                  exit={{ opacity: 0, height: 0 }}
                                  initial={{ opacity: 0, height: 0 }}
                                  transition={liquidSpringConfig}
                                >
                                  <input
                                    placeholder="Please specify custom setup details..."
                                    type="text"
                                    {...register(
                                      `serviceDetails.${service.id}.${field.id}_custom` as any
                                    )}
                                    className="w-full rounded-lg border border-blue-400 bg-white px-3 py-1.5 text-xs text-neutral-700 placeholder-neutral-400 transition-all outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Right Sidebar Area: Renders receipt ledger panel inline */}
      <ServicesReceiptTracker />
    </div>
  )
}

export default Services
