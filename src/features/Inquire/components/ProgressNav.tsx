import { motion } from 'motion/react'
import Image from 'next/image'

interface ProgressNavProps {
  currentStage: number;
  stageComplete: number;
  highestStageReached: number;
  onStepClick: (step: number) => void;
}

const ProgressNav = ({
  currentStage,
  stageComplete,
  highestStageReached,
  onStepClick
}: ProgressNavProps) => {
  const tick = () => (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M5 12l5 5l10 -10" />
    </svg>
  )

  const steps = [1, 2, 3, 4, 5, 6, 7]

  return (
    <div className="absolute bottom-0 z-30 flex h-32 w-full flex-row items-center justify-center gap-3 bg-neutral-400/10 sm:h-full sm:w-40 sm:flex-col sm:self-start">
      <div className="select-none absolute -top-17 right-0 flex w-auto scale-90 flex-row items-center gap-4 sm:top-8 sm:left-7">
        <Image
          alt={'Gradient Circle Image'}
          height={30}
          src={'/images/web-app-manifest-192x192.png'}
          width={30}
        />
        <p className="w-20 text-xs leading-4 text-neutral-600">
          Wisdom & Madness Design Co.
        </p>
      </div>

      <div className="relative flex flex-row items-center gap-2.5 sm:flex-col">
        {steps.map((step) => {
          const isActive = currentStage === step
          const isCompleted = stageComplete >= step && !isActive
          const isSelectable =
            step <= highestStageReached ||
            step === currentStage - 1 ||
            step === currentStage + 1
          const label = step === 7 ? '★' : `0${step}`

          return (
            <div
              key={step}
              className="relative flex flex-row items-center gap-2.5 sm:flex-col"
            >
              <button
                className={`group relative flex size-10 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'border-transparent text-white'
                    : isCompleted
                      ? 'cursor-pointer border-indigo-200 bg-indigo-50/50 text-indigo-600'
                      : isSelectable
                        ? 'cursor-pointer border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-neutral-800'
                        : 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-200 opacity-55'
                }`}
                disabled={!isSelectable}
                onClick={() => onStepClick(step)}
                type="button"
              >
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-500 via-indigo-600 to-violet-600 shadow-[0_6px_15px_-4px_rgba(79,70,229,0.5)]"
                    layoutId="activeLiquidIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                  />
                )}
                <span className="relative z-10 block transition-transform group-hover:scale-105">
                  {isCompleted ? tick() : label}
                </span>
              </button>
              {step <= 6 && (
                <div className="h-3 w-px border border-l border-neutral-200" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressNav
