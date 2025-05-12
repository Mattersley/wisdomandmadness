const IconWithCaption = ({
  iconPaths,
  caption
}: {
  iconPaths: React.ReactNode;
  caption: string;
}) => {
  return (
    <div className="px-2 flex flex-col justify-center items-center text-white">
      <svg
        className="size-5"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        {iconPaths}
      </svg>
      <span className="mt-2 text-xs text-center">{caption}</span>
    </div>
  )
}

export default IconWithCaption
