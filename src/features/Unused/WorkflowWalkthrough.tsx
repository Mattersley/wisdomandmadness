import React from "react";
import {
  ComponentProps,
  WorkflowStep,
} from "@/features/Madness/Pricing/CombinedAgencyPortal";

interface WalkthroughProps extends ComponentProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  dark: boolean;
}

const WorkflowWalkthrough = ({
  dark = false,
  currentStep,
  setCurrentStep,
}: WalkthroughProps) => {
  const steps: WorkflowStep[] = [
    {
      phase: "STEP 01",
      title: "Strategy & Brand Identity",
      desc: "Before designing or coding, we map out your entire project plan. We define how your brand sounds, feels, and looks, creating a master blueprint so there are no surprises later.",
      whatWeDo: [
        "Research your competitors and industry standards",
        "Map out how users will experience your brand and website",
        "Create a clear master plan for your text, imagery, and style",
      ],
      deliverables: [
        "Master Brand Strategy Guide",
        "Project Visual Blueprint",
        "Step-by-Step Launch Plan",
      ],
      icon: (
        <svg
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      phase: "STEP 02",
      title: "Visual Identity & Design",
      desc: "We bring the strategy to life visually. We design your physical materials and digital brand assets, tailoring every texture, color choice, and custom detail to match your company.",
      whatWeDo: [
        "Design your official logos, colors, and fonts",
        "Create physical brand assets (menus, packaging prototypes, or signage)",
        "Build complete visual mockups of your digital screens",
      ],
      deliverables: [
        "Official Brand Logo & Asset Pack",
        "Physical Design Templates & Layouts",
        "Final Visual Artwork & UI Mockups",
      ],
      icon: (
        <svg
          className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      phase: "STEP 03",
      title: "Coding & Website Development",
      desc: "We write clean, secure code to turn your approved designs into a fast, fully functioning digital platform. We set up easy tools to handle your bookings and operations smoothly.",
      whatWeDo: [
        "Code custom, ultra-fast landing pages and full websites",
        "Build seamless booking, reservation, or product order engines",
        "Test everything extensively on phones, tablets, and desktop computers",
      ],
      deliverables: [
        "Fully Programmed, Launch-Ready Website",
        "Custom Booking/Order Software Core",
        "Complete Source Code Ownership",
      ],
      icon: (
        <svg
          className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative mb-12 flex flex-col space-y-4 px-2">
      <div
        className="absolute top-4 bottom-4 left-8 w-px animate-pulse border-l border-dashed"
        style={{ borderColor: "#3F5EFB", opacity: 0.3 }}
      />

      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isPassed = currentStep > index;

        return (
          <div
            key={index}
            className="group relative flex cursor-pointer items-start space-x-6 rounded-lg border p-5 transition-all duration-300 select-none"
            onClick={() => setCurrentStep(index)}
            style={{
              borderColor: isActive ? "#FC466B" : dark ? "#E2E8F0" : "#2D3142",
              backgroundColor: isActive
                ? dark
                  ? "#FFF5F7"
                  : "#141622"
                : "transparent",
              opacity: isActive ? 1 : dark ? 0.7 : 0.4,
            }}
          >
            <div
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border transition-all duration-300"
              style={{
                borderColor: isActive ? "#FC466B" : "#3F5EFB",
                backgroundColor: isActive
                  ? "#FC466B"
                  : isPassed
                    ? "#3F5EFB"
                    : "transparent",
                color: isActive || isPassed ? "#FFFFFF" : "#3F5EFB",
              }}
            >
              {isPassed ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                  />
                </svg>
              ) : (
                step.icon
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span
                className="mb-1 block text-[10px] font-bold tracking-wider"
                style={{ color: isActive ? "#FC466B" : "#3F5EFB" }}
              >
                {step.phase}
              </span>
              <h4
                className="mb-2 font-sans text-sm font-bold tracking-tight uppercase"
                style={{ color: dark ? "#1A202C" : "#FFFFFF" }}
              >
                {step.title}
              </h4>
              <p
                className="max-w-3xl font-sans text-xs leading-relaxed normal-case"
                style={{ color: dark ? "#4A5568" : "#A0AEC0" }}
              >
                {step.desc}
              </p>

              {isActive && (
                <div
                  className="mt-4 grid grid-cols-1 gap-6 border-t border-dashed pt-4 md:grid-cols-2"
                  style={{ borderColor: dark ? "#E2E8F0" : "#2D3142" }}
                >
                  <div>
                    <span
                      className="mb-2 block text-[9px] font-bold tracking-wider uppercase"
                      style={{ color: "#3F5EFB" }}
                    >
                      What We Handle:
                    </span>
                    <ul
                      className="space-y-1 font-sans text-xs normal-case"
                      style={{ color: dark ? "#4A5568" : "#CBD5E0" }}
                    >
                      {step.whatWeDo.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span
                            className="mr-2 text-xs"
                            style={{ color: "#FC466B" }}
                          >
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span
                      className="mb-2 block text-[9px] font-bold tracking-wider uppercase"
                      style={{ color: "#FC466B" }}
                    >
                      What You Receive:
                    </span>
                    <div className="flex flex-col space-y-1">
                      {step.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="rounded border px-2 py-0.5 font-sans text-xs font-medium"
                          style={{
                            backgroundColor: dark ? "#FFFFFF" : "#10121C",
                            borderColor: "#FC466B",
                            color: dark ? "#1A202C" : "#FFFFFF",
                          }}
                        >
                          <span
                            className="mr-1.5 font-bold"
                            style={{ color: "#FC466B" }}
                          >
                            ✓
                          </span>{" "}
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkflowWalkthrough;
