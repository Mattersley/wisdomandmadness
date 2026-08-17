import Blobover from '@/features/Shared/Blobover/Blobover'
import React, { useContext, useState } from 'react'
import { WormContext } from '@/context/wormContext'
import Image from 'next/image'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/features/Inquire/types'
import { AnimatePresence, motion } from 'motion/react'
import ProgressNav from '@/features/Inquire/components/ProgressNav'
import FormErrorBanner from '@/features/Inquire/components/FormErrorBanner'
import { getStageFieldsToValidate } from '@/features/Inquire/validationMap'

// TODO: Add charity/non-profit/pro bono box

import ContactForm from '@/features/Inquire/components/01 Contact/ContactForm'
import Services from '@/features/Inquire/components/02 Services/ServicesForm'
import Logistics from '@/features/Inquire/components/03 LogisticsBudget/LogisticsBudgetForm'
import ProjectVision from '@/features/Inquire/components/04 Vision/ProjectVisionForm'
import DesignInspiration from '@/features/Inquire/components/05 Inspo/DesignInspirationForm'
import ManagerApproval from '@/features/Inquire/components/06 ManagerApproval/ManagerApprovalPetSubmission'
import ReviewForm from '@/features/Inquire/components/07 Review/ReviewForm'
import { buildContactFormData } from '@/features/Inquire/contactSubmission'

const stageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
    filter: 'blur(4px)'
  }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    filter: 'blur(4px)'
  })
}

const Inquire = () => {
  const { setWorm } = useContext(WormContext)
  const [currentStage, setCurrentStage] = useState(1)

  // FIXED: Explicitly typed state coordinate tuple to squash state initialization runtime errors
  const [[stageStep, direction], setStageStep] = useState<[number, number]>([
    1, 1
  ])
  const [highestStageReached, setHighestStageReached] = useState(1)

  const methods = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: {
      budget: '500',
      services: [],
      timeline: '1-3m',
      projectStatus: 'new',
      inspiration: [{ url: '' }],
      petName: '',
      petBio: ''
    }
  })

  const {
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitting }
  } = methods

  const navigateToStage = async (nextStage: number) => {
    if (nextStage === currentStage) return
    const isAdvancing = nextStage > currentStage

    if (isAdvancing) {
      for (
        let activeCheck = currentStage;
        activeCheck < nextStage;
        activeCheck++
      ) {
        const fieldsToValidate = getStageFieldsToValidate(activeCheck)
        if (fieldsToValidate.length > 0) {
          const isStepValid = await trigger(fieldsToValidate)
          if (!isStepValid) {
            const localDirection = activeCheck > currentStage ? 1 : -1
            setCurrentStage(activeCheck)
            setStageStep([activeCheck, localDirection])
            return
          }
        }
      }
    }

    const nextDirection = isAdvancing ? 1 : -1
    setCurrentStage(nextStage)
    setStageStep([nextStage, nextDirection])

    if (nextStage > highestStageReached) {
      setHighestStageReached(nextStage)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: buildContactFormData(data)
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Theres been an error.')
      }

      reset()
      setStageStep([1, -1])
      setCurrentStage(1)
      setHighestStageReached(1)
      alert(
        'Project Details successfully sent! Give us a few days to get back to you.'
      )
    } catch (e) {
      console.error('[SUBMIT_FAILURE]', e)
      alert(e instanceof Error ? e.message : 'Form submission error.')
    }
  }

  const getStageMetadata = (stage: number) => {
    switch (stage) {
      case 1:
        return {
          title: 'Contact Information',
          subtitle: 'Let us know who you are and how to contact you'
        }
      case 2:
        return {
          title: 'Services Required',
          subtitle: 'What can we do for you?'
        }
      case 3:
        return {
          title: 'Budget & Timeline',
          subtitle: 'How quickly can we help you?'
        }
      case 4:
        return {
          title: 'Project Information',
          subtitle: 'Mapping conceptual goals.'
        }
      case 5:
        return {
          title: 'Aesthetic Inspiration',
          subtitle: 'Visual moodboard linking.'
        }
      case 6:
        return {
          title: 'Manager Approval',
          subtitle: 'Submit your project manager'
        }
      case 7:
        return {
          title: 'Review',
          subtitle: 'Review and lock package data.'
        }
      default:
        return {
          title: 'Project Inquiry',
          subtitle: 'Tell us about your vision.'
        }
    }
  }

  const activeStageFields = getStageFieldsToValidate(currentStage)
  const currentMeta = getStageMetadata(currentStage)

  return (
    <div className="h-screen w-screen overflow-y-scroll bg-neutral-950 px-4 sm:pt-6 md:overflow-hidden">
      <div className="relative z-10 flex size-full md:-mb-24">
        <button className="font-vt323 absolute -top-2 left-[48vw] z-40 hidden rounded-2xl border px-3 text-neutral-700 hover:border-rose-500 hover:bg-rose-500 hover:text-white sm:block">
          OBS#{}-INQUIRY
        </button>
        <div className="w-full flex-row md:px-20">
          <div className="relative mt-10 flex w-full flex-row items-baseline justify-start gap-4 rounded-full bg-indigo-500 p-4">
            <h2 className="font-instrument ml-6 flex flex-row items-baseline text-2xl font-bold text-white">
              <svg
                className="mr-2 mb-1 size-6 self-end"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
                <path d="M15 6l3 3" />
                <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
              </svg>
              Project Inquiry Wizard
            </h2>
            <p className="hidden text-xs text-white sm:block">
              Tell us about your vision.
            </p>
          </div>

          <div className="relative flex size-full flex-col md:gap-x-6">
            <div className="relative mt-9 flex w-full flex-col items-center justify-center rounded-3xl bg-white md:h-3/4 md:justify-start">
              <div className="font-vt323 flex min-h-20 w-full flex-row items-center justify-center bg-indigo-500/10 text-center text-3xl sm:min-h-22 md:min-h-30 md:text-4xl lg:justify-start lg:pl-50">
                {currentMeta.title}
                <span className="-mt-4 ml-1 font-mono text-lg font-bold text-indigo-500">
                  0{currentStage}.
                </span>
              </div>

              {/* Connected stage tracking states */}
              <ProgressNav
                currentStage={currentStage}
                highestStageReached={highestStageReached}
                onStepClick={navigateToStage}
                stageComplete={highestStageReached - 1}
              />

              <div className="relative size-full px-10 pb-30 lg:pb-0 lg:pl-48">
                <FormProvider {...methods}>
                  <form
                    className="flex size-full flex-col items-center justify-center"
                    id="project-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="size-full">
                      <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                          key={currentStage}
                          animate="center"
                          className="size-full pt-10 pb-40 lg:pb-0 xl:px-32"
                          custom={direction}
                          exit="exit"
                          initial="enter"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 28
                          }}
                          variants={stageVariants}
                        >
                          {currentStage === 1 && <ContactForm />}
                          {currentStage === 2 && <Services />}
                          {currentStage === 3 && <Logistics />}
                          {currentStage === 4 && <ProjectVision />}
                          {currentStage === 5 && <DesignInspiration />}
                          {currentStage === 6 && <ManagerApproval />}
                          {currentStage === 7 && <ReviewForm />}
                          <FormErrorBanner
                            currentStage={currentStage}
                            stageFields={activeStageFields}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </form>
                </FormProvider>

                {/* Control Actions Bar */}
                <div className="absolute right-10 bottom-58 z-50 flex flex-row items-center gap-3 text-sm md:bottom-64 lg:right-8 lg:bottom-6">
                  {currentStage > 1 && (
                    <button
                      className="cursor-pointer rounded-xl border border-neutral-200 bg-white px-5 py-3 font-mono text-xs tracking-wider text-neutral-600 uppercase transition-all hover:bg-neutral-50"
                      onClick={() => navigateToStage(currentStage - 1)}
                      type="button"
                    >
                      Back
                    </button>
                  )}

                  {currentStage < 7 ? (
                    <button
                      className="group flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-mono text-xs tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:bg-indigo-600"
                      onClick={() => navigateToStage(currentStage + 1)}
                      type="button"
                    >
                      Next Step
                      <svg
                        className="transition-transform group-hover:translate-x-0.5"
                        fill="currentColor"
                        height="14"
                        viewBox="0 0 24 24"
                        width="14"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  ) : (
                    <motion.button
                      className="cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-pink-600 px-8 py-4 font-mono text-xs font-bold tracking-widest text-white uppercase transition-all hover:shadow-[0_12px_24px_rgba(99,102,241,0.4)] disabled:opacity-50"
                      disabled={isSubmitting}
                      form="project-form"
                      type="submit"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Transmitting Data...' : 'Send Inquiry ★'}
                    </motion.button>
                  )}
                </div>

                {/* Decorative Background Assets */}
                <div className="absolute bottom-0 left-0 z-2 hidden h-18 w-19 rounded-tr-3xl bg-neutral-950 lg:block" />
                <div className="absolute bottom-18 left-0 z-10 hidden -rotate-90 lg:block">
                  <Image
                    alt="image"
                    height={20}
                    src={'/images/corner.png'}
                    width={20}
                  />
                </div>
                <div className="absolute bottom-0 left-19 z-10 hidden -rotate-90 lg:block">
                  <Image
                    alt="image"
                    height={20}
                    src={'/images/corner.png'}
                    width={20}
                  />
                </div>

                <div className="absolute -top-43 right-2 z-50 sm:-top-47 sm:scale-80 md:-top-55 lg:top-auto lg:right-auto lg:-bottom-2 lg:left-0 lg:scale-100">
                  <Blobover
                    colour="black"
                    position="bottom"
                    trigger={
                      <button
                        className="size-12 cursor-pointer items-center justify-center rounded-[50%] border-neutral-500 bg-neutral-700 text-white hover:bg-neutral-900 sm:size-16"
                        onClick={() => setWorm('madness')}
                        type="button"
                      >
                        <span className="size-full">
                          <svg
                            className="mx-auto size-6 sm:size-8"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.3"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                          </svg>
                        </span>
                      </button>
                    }
                  >
                    HOME
                  </Blobover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inquire
