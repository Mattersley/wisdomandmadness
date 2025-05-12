import WisdomAndMadnessLogo from '@/assets/WisdomLogo'

const Portfolio = () => (
  <div className="h-[100vh] bg-white w-screen flex flex-col items-center justify-start pt-20 px-2 sm:px-10 sm:pt-30 md:px-30">
    <div className="relative h-16 w-full items-center justify-between border-gray-200 border-y gap-2 px-2 flex flex-row">
      <div className="flex flex-row items-center gap-2 text-xs">
        <p>Web App</p>
        <p>UI/UX</p>
        <p>F&B</p>
        <p>Branding</p>
        <p>Packaging</p>
      </div>
      <div className="size-10 sm:left-[49.5%] absolute text-gray-500">
        <WisdomAndMadnessLogo />
      </div>
      <div className="flex flex-row">
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
      </div>
    </div>
  </div>
)

export default Portfolio