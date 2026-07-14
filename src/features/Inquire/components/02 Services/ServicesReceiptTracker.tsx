import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { Transition } from 'motion'
import { Inputs } from '@/features/Inquire/types'

const springConfig: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.6
}

export const ServicesReceiptTracker = () => {
  const { watch } = useFormContext<Inputs>()
  const selectedServices = watch('services') || []
  const serviceDetails = watch('serviceDetails') || {}

  return (
    <motion.div
      className="relative -mt-20 -mr-22 w-80 bg-white p-6 font-mono text-gray-800 shadow-xl before:absolute before:-top-2.5 before:left-0 before:h-2.5 before:w-full before:bg-[linear-gradient(45deg,white_5px,transparent_0),linear-gradient(-45deg,white_5px,transparent_0)] before:bg-size-[10px_10px] before:bg-bottom-left before:bg-repeat-x after:absolute after:-bottom-2.5 after:left-0 after:h-2.5 after:w-full after:bg-[linear-gradient(135deg,white_5px,transparent_0),linear-gradient(-135deg,white_5px,transparent_0)] after:bg-size-[10px_10px] after:bg-top-left after:bg-repeat-x"
      layout
      transition={springConfig}
    >
      <div className="mb-3 border-b border-dashed border-neutral-200 pb-2 text-center">
        <p className="font-bold tracking-wider text-neutral-800 uppercase">
          SERVICE LEDGER
        </p>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1">
        <AnimatePresence
          key={selectedServices.join('-')}
          initial={false}
          mode="popLayout"
        >
          {selectedServices.length > 0 ? (
            selectedServices.map((serviceId, idx) => {
              const specs = serviceDetails[serviceId]

              return (
                <motion.div
                  key={`service-${serviceId}${idx}`}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  className="space-y-1"
                  exit={{ opacity: 0, x: -8, filter: 'blur(2px)' }}
                  initial={{ opacity: 0, x: 8, filter: 'blur(2px)' }}
                  layout
                  transition={springConfig}
                >
                  {/* Service Row Line */}
                  <div className="flex items-baseline justify-between gap-1 font-bold text-neutral-800">
                    <span className="w-auto text-[10px] text-nowrap uppercase">
                      {serviceId}
                    </span>
                    <div className="w-full min-w-2.5 border-b border-dotted border-neutral-200" />
                    <span className="text-[9px] text-neutral-400">
                      ADD_0{idx + 1}
                    </span>
                  </div>

                  {/* Spec Write-In Underloops */}
                  {specs &&
                    Object.entries(specs).map(([subKey, val]) => {
                      if (!val || subKey.endsWith('_custom')) return null
                      const outputVal =
                        val === 'Other' && specs[`${subKey}_custom`]
                          ? specs[`${subKey}_custom`]
                          : val

                      return (
                        <motion.div
                          key={subKey}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-between pl-3 text-[10px] leading-tight text-neutral-400"
                          initial={{ opacity: 0, y: 2 }}
                        >
                          <span className="max-w-[100px] truncate">
                            ↳ {subKey}
                          </span>
                          <span className="w-full font-bold text-neutral-400">
                            [{outputVal}]
                          </span>
                        </motion.div>
                      )
                    })}
                </motion.div>
              )
            })
          ) : (
            <motion.p
              key="empty"
              animate={{ opacity: 1 }}
              className="py-4 text-center text-neutral-400 italic"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              [ CHOOSE_SERVICES ]
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Receipt Total Accumulator Block */}
      <div className="mt-3 flex justify-between border-t border-dashed border-neutral-200 pt-2 text-[10px] font-bold text-neutral-700">
        <span className="tracking-wider uppercase">UNIT COUNT:</span>
        <span>{selectedServices.length} ITEMS</span>
      </div>
    </motion.div>
  )
}
