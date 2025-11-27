import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Inputs } from './types'
import ContactForm from './components/ContactForm'
import Services from '@/features/Contact/components/ServicesForm'
import Logistics from '@/features/Contact/components/LogisticsBudgetForm'
import ProjectVision from '@/features/Contact/components/ProjectVisionForm'
import DesignInspiration from '@/features/Contact/components/DesignInspirationForm'
import ManagerApproval from '@/features/Contact/components/ManagerApprovalPetSubmission'
import { useContact } from '@/context/contactContext'

const Contact = () => {
  const { isOpen, closeContact, openContact } = useContact()
  const [showDetails, setShowDetails] = useState(false)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)

  const methods = useForm<Inputs>({
    defaultValues: {
      budget: '5000',
      services: [],
      timeline: '1-3m',
      projectStatus: 'new',
      inspiration: [{ url: '' }]
    }
  })

  const { handleSubmit, reset, formState: { isSubmitting } } = methods

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    if (!captchaValue) {
      alert('Please complete the reCAPTCHA verification.')
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const subject = `Project Inquiry: ${data.name || 'New Request'}`

    const servicesList = Array.isArray(data.services) && data.services.length > 0
      ? data.services.map((s: string) => `• ${s}`).join('\n')
      : 'None selected'

    const inspirationLinks = Array.isArray(data.inspiration)
      ? data.inspiration
          .map((item: { url: string }) => item.url)
          .filter((url: string) => url)
          .map((url: string) => `• ${url}`)
          .join('\n')
      : ''

    const body = `
New Project Inquiry via Website
================================

CONTACT DETAILS
--------------------------------
Name:    ${data.name || 'N/A'}
Email:   ${data.email || 'N/A'}
Company: ${data.company || 'N/A'}
Phone:   ${data.phone || 'N/A'}

PROJECT OVERVIEW
--------------------------------
Status:   ${data.projectStatus}
Timeline: ${data.timeline}
Budget:   $${data.budget}

SERVICES REQUIRED
--------------------------------
${servicesList}

PROJECT VISION
--------------------------------
${data.projectVision || data.description || 'No details provided.'}

DESIGN INSPIRATION
--------------------------------
${inspirationLinks || 'No links provided.'}

--------------------------------
Sent from wisdomandmadness.com
`.trim()

    window.location.href = `mailto:webinquiry@wisdomandmadness.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    reset()
    setCaptchaValue(null)
    closeContact()
    setShowDetails(false)
  }

  return (
    <>
      <button
        className="right-[5%] z-20 hidden items-center rounded-[3rem] bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] text-center text-white hover:bg-gradient-to-tr sm:flex sm:h-16 sm:w-52 md:w-40 lg:w-52"
        onClick={openContact}
      >
        <p className="w-full text-xs font-bold tracking-widest">INQUIRE</p>
      </button>

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
                className={`bg-background pointer-events-auto flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl shadow-2xl transition-[max-width] duration-500 ease-in-out ${
                  showDetails ? 'max-w-2xl lg:max-w-5xl' : 'max-w-2xl'
                }`}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] text-white relative z-10 flex-shrink-0 border-b border-gray-100 px-6 py-5 dark:border-white/10">
                  <h2 className="font-mono text-xl font-bold tracking-tight">
                    Project Inquiry
                  </h2>
                  <p className="text-sm text-white">
                    Tell us about your vision
                  </p>
                  <button
                    className="absolute top-5 right-5 rounded-full p-1 text-white transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
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
                          ? 'space-y-10 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0'
                          : 'space-y-10'
                      }
                      id="project-form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="space-y-10">
                        <ContactForm />

                        <div className="flex justify-center">
                          <button
                            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={() => setShowDetails(!showDetails)}
                            type="button"
                          >
                            <span className="bg-gradient-to-tl from-[#3F5EFB] to-[#FC466B] text-transparent bg-clip-text">
                              {showDetails
                                ? 'Hide Details'
                                : 'Go into more detail'}
                            </span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${
                                showDetails ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 9l-7 7-7-7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </button>
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

                      <div
                        className={`flex justify-center pt-4 ${
                          showDetails ? 'lg:col-span-2' : ''
                        }`}
                      >
                        <ReCAPTCHA
                          onChange={(val) => setCaptchaValue(val)}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                          }
                          theme="dark"
                        />
                      </div>
                    </form>
                  </FormProvider>
                </div>

                <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <button
                    className="bg-indigo-500 font-mono text-background w-full rounded-lg py-3 text-sm font-bold shadow-lg transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
                    disabled={isSubmitting}
                    form="project-form"
                    type="submit"
                  >
                    <div
                      className="flex flex-row items-center justify-center gap-2">
                      {isSubmitting ? 'Sending...' : 'Submit Project Request'}
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
