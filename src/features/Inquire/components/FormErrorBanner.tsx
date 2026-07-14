import { motion, AnimatePresence } from 'motion/react'
import { useFormContext } from 'react-hook-form'

interface FormErrorBannerProps {
  currentStage: number;
  stageFields: string[];
}

const FormErrorBanner = ({
  currentStage,
  stageFields
}: FormErrorBannerProps) => {
  const {
    formState: { errors }
  } = useFormContext()

  // Track if any active errors exist on the current form stage screen
  const hasActiveErrors = stageFields.some((field) => !!errors[field])

  return (
    <AnimatePresence>
      {hasActiveErrors && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bottom-8 right-1/2 left-1/2 -translate-x-1/2 absolute flex w-full max-w-3xl items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 shadow-sm"
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
        >
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-500 p-1 text-white">
            <svg
              fill="none"
              height="12"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              width="12"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="font-mono text-xs font-bold tracking-wider uppercase">
              Validation Block // Stage 0{currentStage}
            </p>
            <p className="mt-0.5 text-xs text-rose-600/90">
              Please check and verify all required configuration fields before
              moving forward.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FormErrorBanner
