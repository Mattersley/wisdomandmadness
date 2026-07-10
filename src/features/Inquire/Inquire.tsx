import Blobover from '@/features/Shared/Popover/Blobover'
import React, { useContext, useEffect, useState } from 'react'
import { WormContext } from '@/context/wormContext'
import Image from 'next/image'
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext
} from 'react-hook-form'
import { Inputs } from '@/features/Madness/Contact/types'
import ContactForm from '@/features/Madness/Contact/components/ContactForm'
import { AnimatePresence, motion } from 'motion/react'
import Services from '@/features/Madness/Contact/components/ServicesForm'
import Logistics from '@/features/Madness/Contact/components/LogisticsBudgetForm'
import ProjectVision from '@/features/Madness/Contact/components/ProjectVisionForm'
import DesignInspiration from '@/features/Madness/Contact/components/DesignInspirationForm'
import ManagerApproval from '@/features/Madness/Contact/components/ManagerApprovalPetSubmission'

const Inquire = () => {
  const { setWorm } = useContext(WormContext)

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

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    // Pass the form data
    const payload = { ...data }

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
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="w-screen snap-start bg-neutral-950 sm:pt-6 md:h-screen">
      <div className="relative z-10 flex size-full md:-mb-24">
        <button className="font-vt323 absolute -top-2 left-[48vw] z-40 hidden rounded-2xl border px-3 text-neutral-700 hover:border-rose-500 hover:bg-rose-500 hover:text-white sm:block">
          OBS#{}-INQUIRY
        </button>
        <div className="w-full flex-row md:px-20">
          <div className="relative mt-10 flex w-full flex-row items-center justify-start gap-4 rounded-full bg-indigo-500 p-4">
            <h2 className="font-instrument ml-6 text-2xl font-bold text-white">
              Project Inquiry
            </h2>
            <p className="text-xs text-white">Tell us about your vision.</p>
          </div>

          <div className="relative flex h-full w-full flex-col md:gap-x-6">
            <div className="relative px-40 flex flex-col items-center justify-center mt-9 h-3/4 w-full rounded-3xl bg-white">
              <FormProvider {...methods}>
                <form
                  className="w-full"
                  id="project-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="space-y-6">
                    <ContactForm />

                    {/*<AnimatePresence>*/}
                    {/*  <motion.div*/}
                    {/*    animate={{*/}
                    {/*      height: 'auto',*/}
                    {/*      opacity: 1,*/}
                    {/*      marginTop: 40*/}
                    {/*    }}*/}
                    {/*    className="overflow-hidden"*/}
                    {/*    exit={{ height: 0, opacity: 0, marginTop: 0 }}*/}
                    {/*    initial={{*/}
                    {/*      height: 0,*/}
                    {/*      opacity: 0,*/}
                    {/*      marginTop: 0*/}
                    {/*    }}*/}
                    {/*    transition={{ duration: 0.3, ease: 'easeInOut' }}*/}
                    {/*  >*/}
                    {/*    <div className="space-y-10 pt-2 lg:pt-0">*/}
                    {/*      <Services />*/}
                    {/*      <Logistics />*/}
                    {/*    </div>*/}
                    {/*  </motion.div>*/}
                    {/*</AnimatePresence>*/}
                  </div>

                  {/*<motion.div*/}
                  {/*  animate={{ height: 'auto', opacity: 1 }}*/}
                  {/*  className="overflow-hidden"*/}
                  {/*  exit={{ height: 0, opacity: 0 }}*/}
                  {/*  initial={{ height: 0, opacity: 0 }}*/}
                  {/*  transition={{ duration: 0.3, ease: 'easeInOut' }}*/}
                  {/*>*/}
                  {/*  <div className="space-y-10 pt-2 lg:pt-0">*/}
                  {/*    <ProjectVision />*/}
                  {/*    <DesignInspiration />*/}
                  {/*    <ManagerApproval />*/}
                  {/*  </div>*/}
                  {/*</motion.div>*/}
                </form>
              </FormProvider>

              <div className="absolute bottom-0 left-0 z-2 hidden h-18 w-19 rounded-tr-3xl bg-neutral-950 md:block" />
              <div className="absolute bottom-18 left-0 z-10 hidden -rotate-90 md:block">
                <Image
                  alt="image"
                  height={20}
                  src={'/images/corner.png'}
                  width={20}
                />
              </div>
              <div className="absolute bottom-0 left-19 z-10 hidden -rotate-90 md:block">
                <Image
                  alt="image"
                  height={20}
                  src={'/images/corner.png'}
                  width={20}
                />
              </div>

              <div className="absolute -bottom-2 left-0 z-10">
                <Blobover
                  colour="rose"
                  position="bottom"
                  trigger={
                    <button
                      className="size-12 cursor-pointer items-center justify-center rounded-[50%] bg-rose-700 text-white hover:bg-rose-500 sm:size-16"
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
  )
}

export default Inquire
