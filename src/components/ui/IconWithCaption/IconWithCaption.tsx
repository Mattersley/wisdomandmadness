import React from 'react'

const IconWithCaption = ({
  iconPaths,
  caption,
  current,
  onClick
}: {
  iconPaths: React.ReactNode;
  caption: string;
  current: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className="relative flex flex-col items-center justify-center text-white"
      disabled={current === caption}
      onClick={onClick}
      type="button"
    >
      <svg
        className="z-10 size-5"
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
      <span className="z-10 mt-2 text-center text-xs">{caption}</span>
    </button>
  )
}

export default IconWithCaption
