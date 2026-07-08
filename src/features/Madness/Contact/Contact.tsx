import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { Inputs } from './types'
import ContactForm from './components/ContactForm'
import Services from '@/features/Madness/Contact/components/ServicesForm'
import Logistics from '@/features/Madness/Contact/components/LogisticsBudgetForm'
import ProjectVision from '@/features/Madness/Contact/components/ProjectVisionForm'
import DesignInspiration from '@/features/Madness/Contact/components/DesignInspirationForm'
import ManagerApproval from '@/features/Madness/Contact/components/ManagerApprovalPetSubmission'
import { useContact } from '@/context/contactContext'
import localFont from 'next/font/local'
import ContactButton from "@/features/Madness/Contact/components/ContactButton";

const instrumentFont = localFont({
  src: '../../../../public/fonts/InstrumentSerif-Regular.woff2'
})

const Contact = () => {
  const { isOpen, closeContact, openContact } = useContact()
  const [showDetails, setShowDetails] = useState(false)
  const [simplePlease, setSimplePlease] = useState(false)

  const methods = useForm<Inputs>({
    defaultValues: {
      budget: '500',
      services: [],
      timeline: '1-3m',
      projectStatus: 'new',
      inspiration: [{ url: '' }]
    }
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setSimplePlease(event.target.checked)
    if (event.target.checked) {
      setShowDetails(false)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    // Pass the form data
    const payload = { ...data, simpleWebsite: simplePlease }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      reset()
      setSimplePlease(false)
      closeContact()
      setShowDetails(false)
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <>
      <ContactButton openContact={openContact} />
      {/*<button*/}
      {/*  className="wnm-gradient absolute top-8 right-[6vw] z-20 h-12 w-28 cursor-pointer items-center rounded-[3rem] text-center text-white hover:bg-linear-to-tr sm:relative sm:top-0 sm:right-0 sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52"*/}
      {/*  onClick={openContact}*/}
      {/*>*/}
      {/*  <p className="w-full text-xs font-bold tracking-widest">CONTACT</p>*/}
      {/*</button>*/}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeContact}
            />

            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`bg-background pointer-events-auto flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl shadow-2xl transition-[max-width] duration-500 ease-in-out ${showDetails ? 'max-w-2xl lg:max-w-5xl' : 'max-w-2xl'}`}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="wnm-gradient relative z-10 shrink-0 border-b border-gray-100 px-6 py-5 text-center text-white">
                  <h2
                    className={`${instrumentFont.className} mt-6 text-4xl font-bold`}
                  >
                    Project Inquiry
                  </h2>
                  <p className="mt-1 text-white">Tell us about your vision</p>
                  <button
                    className="absolute top-5 right-5 rounded-full p-1 text-white transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={closeContact}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto scroll-smooth p-6 sm:p-8">
                  <FormProvider {...methods}>
                    <form
                      className={
                        showDetails
                          ? 'space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0'
                          : 'space-y-6'
                      }
                      id="project-form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="space-y-6">
                        <ContactForm />

                        <div
                          className={`glassmorphism ${!simplePlease ? 'grid gap-y-3 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-0' : ''} w-full items-center justify-center rounded-xl border border-indigo-500/50 bg-indigo-500/10 px-6 py-4`}
                        >
                          <div className="relative col-span-2 mr-6 flex h-full w-full flex-row items-center justify-center rounded-xl border border-indigo-500 p-4 text-center">
                            <label
                              className={`mr-4 w-full ${simplePlease ? 'text-center' : 'text-right'} font-mono text-xs font-bold text-indigo-500 uppercase`}
                              htmlFor="spa"
                            >
                              I just want a simple single page website please!
                            </label>
                            <input
                              checked={simplePlease}
                              className="peer relative h-6 w-6 cursor-pointer appearance-none rounded-sm border-2 border-gray-500 checked:border-indigo-500 checked:bg-indigo-500"
                              id="spa"
                              name="spa"
                              onChange={handleChange}
                              type="checkbox"
                            />
                            <div className="pointer-events-none absolute right-[0.88rem] hidden h-6 w-6 items-center justify-center stroke-white text-lg font-bold peer-checked:block sm:right-[0.95rem]">
                              <svg
                                fill="none"
                                height="24"
                                stroke="#ffffff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                          {!simplePlease && (
                            <button
                              className="group col-span-2 flex h-full w-full flex-col items-center justify-center rounded-xl border border-indigo-500 bg-indigo-500 p-3 font-mono text-xs font-bold tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-500 sm:col-span-1"
                              onClick={() => setShowDetails(!showDetails)}
                              type="button"
                            >
                              <div className="flex h-4 w-full flex-row sm:h-auto">
                                <svg
                                  className="size-8 stroke-2 transition-transform duration-300"
                                  fill="none"
                                  height={20}
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  width={20}
                                >
                                  <path d="M12 5l0 14" />
                                  <path d="M5 12l14 0" />
                                </svg>
                                <span className="ml-3 text-left uppercase">
                                  {showDetails
                                    ? 'Hide Details'
                                    : 'Go into more detail'}
                                </span>
                              </div>
                              {!showDetails && (
                                <small className="mt-1 text-[0.5rem] tracking-normal normal-case">
                                  Only fill out what you want
                                </small>
                              )}
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {showDetails && (
                            <motion.div
                              animate={{
                                height: 'auto',
                                opacity: 1,
                                marginTop: 40
                              }}
                              className="overflow-hidden"
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              initial={{
                                height: 0,
                                opacity: 0,
                                marginTop: 0
                              }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="space-y-10 pt-2 lg:pt-0">
                                <Services />
                                <Logistics />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            animate={{ height: 'auto', opacity: 1 }}
                            className="overflow-hidden"
                            exit={{ height: 0, opacity: 0 }}
                            initial={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="space-y-10 pt-2 lg:pt-0">
                              <ProjectVision />
                              <DesignInspiration />
                              <ManagerApproval />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </FormProvider>
                </div>

                <div className="wnm-gradient flex-shrink-0 rounded-b-2xl border-t border-gray-100 px-6 py-4 backdrop-blur">
                  <button
                    className="text-background w-full rounded-lg bg-indigo-500 py-3 font-mono text-sm font-bold shadow-lg transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
                    disabled={isSubmitting}
                    form="project-form"
                    type="submit"
                  >
                    <div className="flex flex-row items-center justify-center gap-2">
                      {isSubmitting ? 'Sending...' : 'Submit'}
                      <svg
                        fill="none"
                        height="26"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        viewBox="0 0 24 24"
                        width="26"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 14l11 -11" />
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                      </svg>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Contact
