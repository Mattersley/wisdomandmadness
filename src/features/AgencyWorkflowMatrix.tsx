import React from 'react'

interface ComponentProps {
  dark?: boolean;
}

const AgencyWorkflowMatrix = ({ dark = false }: ComponentProps) => {
  const steps = [
    {
      phase: 'PHASE 01',
      wing: 'REALITIES',
      action: 'Concept Destruction',
      desc: 'We completely map out the project narrative, sensory rules, and alternative direction. We hand you a pure Concept Bible before touching a single tool.'
    },
    {
      phase: 'PHASE 02',
      wing: 'ARTIFACTS',
      action: 'Tactile Hardening',
      desc: 'We translate the narrative into physical realities. This is where we hand-craft clay vessels, print high-texture menu systems, and finalize the raw brand identities.'
    },
    {
      phase: 'PHASE 03',
      wing: 'SYSTEMS',
      action: 'Digital Infrastructure',
      desc: 'We lock down the digital core. Custom engineering high-speed frontends, robust web apps, and custom reservation/logistics architectures that run with zero friction.'
    }
  ]

  return (
    <div className="mt-16 w-full font-mono text-xs tracking-tight">
      <span
        className={`mb-4 block text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}
      >
        // THE PROJECT TRAJECTORY
      </span>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex min-h-[200px] flex-col justify-between border border-dashed p-6 ${
              dark
                ? 'border-neutral-200 bg-neutral-50/50 text-neutral-800'
                : 'border-neutral-800 bg-neutral-900/10 text-neutral-400'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between opacity-60">
                <span>{step.phase}</span>
                <span className="font-bold text-red-500">[{step.wing}]</span>
              </div>
              <h4
                className={`mb-2 font-sans text-base font-black tracking-tight uppercase ${
                  dark ? 'text-neutral-900' : 'text-neutral-100'
                }`}
              >
                {step.action}
              </h4>
              <p className="font-sans text-sm leading-relaxed normal-case">
                {step.desc}
              </p>
            </div>

            <div
              className={`mt-4 border-t pt-3 text-[10px] uppercase opacity-40 ${
                dark ? 'border-neutral-200' : 'border-neutral-800'
              }`}
            >
              STATUS: PENDING_DEPLOYMENT
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgencyWorkflowMatrix
