const Toolbar = () => {
  return (
    <div className="flex justify-between w-full">
      <button className="text-shadow-crt w-40 cursor-pointer px-6 py-1 text-2xl tracking-widest uppercase transition duration-150 ease-in-out hover:bg-[#3ea34b] hover:text-[#0e1111] sm:w-32">
        Wisdom
      </button>
      <button className="text-shadow-crt w-40 cursor-pointer px-6 py-1 text-2xl tracking-widest uppercase transition duration-150 ease-in-out hover:bg-[#3ea34b] hover:text-[#0e1111] sm:w-32">
        Madness
      </button>
    </div>
  )
}