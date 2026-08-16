import React from 'react'

// WING 01: SYSTEMS (Digital Infrastructure & Code)
// A precise, sharp grid circuit system emphasizing backend logic and database stacks.
export const SystemsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect height="6" rx="0.5" width="6" x="2" y="3" />
      <rect height="6" rx="0.5" width="6" x="16" y="3" />
      <rect height="6" rx="0.5" width="6" x="9" y="15" />
      <path d="M5 9v3h4M19 9v3h-4M12 12v3" strokeDasharray="2 2" />
      <path d="M2 15h4M18 15h4" />
    </svg>
  )
}

// WING 02: ARTIFACTS (Physical Branding & Tactile Craft)
// Interlocking geometric planes and material cross-sections that mimic paper folds and structural angles.
export const ArtifactsIcon = ({
  className = 'w-6 h-6'
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" strokeDasharray="3 1" />
      <line strokeDasharray="1 1" x1="12" x2="12" y1="7" y2="22" />
    </svg>
  )
}

// WING 03: REALITIES (Creative Direction & Concept)
// A raw, abstract orbit / frequency alignment model representing sensory chaos, cocktail mixology, and auteur theory.
export const RealitiesIcon = ({
  className = 'w-6 h-6'
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" x2="12" y1="1" y2="23" />
      <line x1="1" x2="23" y1="12" y2="12" />
      <path d="M6 6l12 12M6 18L18 6" opacity="0.4" />
    </svg>
  )
}
