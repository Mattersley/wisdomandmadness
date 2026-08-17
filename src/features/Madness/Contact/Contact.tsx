import { useState, useEffect, useContext } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { Inputs } from '../../Inquire/types'
import ContactForm from '@/features/Inquire/components/01 Contact/ContactForm'
import Services from '@/features/Inquire/components/02 Services/ServicesForm'
import Logistics from '@/features/Inquire/components/03 LogisticsBudget/LogisticsBudgetForm'
import { useContact } from '@/features/Madness/Contact/context/contactContext'
import ContactButtonLiquid from '@/features/Shared/ContactButtons/ContactButtonLiquid'
import { buildContactFormData } from '@/features/Inquire/contactSubmission'
import { WormContext } from '@/context/wormContext'

const Contact = () => {
  const { setWorm } = useContext(WormContext)
  const { isOpen, closeContact, openContact } = useContact()
  const [showDetails, setShowDetails] = useState(false)

  const methods = useForm<Inputs>({
    defaultValues: {
      budget: '0',
      services: [],
      timeline: '0',
      projectStatus: undefined,
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: buildContactFormData(data)
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'Failed to send message')
      }

      reset()
      closeContact()
      setShowDetails(false)
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.'
      )
    }
  }

  return (
    <>
      <ContactButtonLiquid openContact={openContact} />

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
                  <h2 className="font-instrument mt-6 text-4xl font-bold">
                    Contact Us
                  </h2>
                  <p className="mt-1 text-white">Ask us anything</p>
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

                <div className="flex-1 overflow-y-auto scroll-smooth p-6 text-center sm:p-8">
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
                        <ContactForm isPopup={true} />

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
                    </form>
                  </FormProvider>
                  <p className="mt-6 font-mono text-xs">
                    Try our{' '}
                    <button
                      className="cursor-pointer font-bold text-indigo-500 hover:bg-indigo-500 hover:text-white"
                      onClick={() => setWorm('inquire')}
                      type="button"
                    >
                      [INQUIRY WIZARD]
                    </button>{' '}
                    if you would like to go into more detail than this.
                  </p>
                </div>

                <div className="wnm-gradient shrink-0 rounded-b-2xl border-t border-gray-100 px-6 py-4 backdrop-blur">
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
