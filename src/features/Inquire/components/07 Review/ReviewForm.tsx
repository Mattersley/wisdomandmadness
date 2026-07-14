import { useFormContext } from 'react-hook-form'

// 1. Move Row OUTSIDE the ReviewForm component
interface RowProps {
  label: string;
  value: any;
}

const Row = ({ label, value }: RowProps) => (
  <div className="flex flex-col border-b border-neutral-100 py-2.5 text-sm sm:flex-row sm:justify-between">
    <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
      {label}
    </span>
    <span className="mt-0.5 font-medium text-neutral-800 sm:mt-0">
      {Array.isArray(value)
        ? value.join(', ') || 'None Selected'
        : value || '—'}
    </span>
  </div>
)

const ReviewForm = () => {
  const { watch } = useFormContext()
  const formData = watch()

  // Cleaned up double evaluation guard
  const targetPetImageName = formData?.petImage?.name || null

  return (
    <div className="mx-auto w-full max-w-xl space-y-5 pb-6">
      <div className="border-l-2 border-indigo-500 py-0.5 pl-4">
        <h3 className="text-xl font-bold tracking-tight text-neutral-900">
          Final Verification
        </h3>
        <p className="mt-0.5 font-mono text-xs text-neutral-500">
          Please inspect your project data profile parameters.
        </p>
      </div>

      <div className="space-y-1 rounded-2xl border border-neutral-200/60 bg-neutral-50/60 p-5 backdrop-blur-sm">
        <Row label="Client Identifier" value={formData.name} />
        <Row label="Digital Mail" value={formData.email} />
        <Row label="Communication Line" value={formData.phone} />
        <Row label="Requested Services" value={formData.services} />
        <Row label="Financial Threshold" value={`$${formData.budget}`} />
        <Row label="Operational Windows" value={formData.timeline} />

        {/* Dynamic Branching Specifications Parser Loop with Custom Fallbacks */}
        {formData.services?.length > 0 && formData.serviceDetails && (
          <div className="mt-4 space-y-2 border-t border-dashed border-neutral-200 pt-3">
            <p className="font-mono text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
              // Granular Service Configurations
            </p>
            {formData.services.map((serviceId: string) => {
              const specs = formData.serviceDetails[serviceId]
              if (!specs) return null

              return Object.entries(specs).map(([subFieldKey, value]) => {
                if (!value || subFieldKey.endsWith('_custom')) return null

                // If 'Other' was selected, append the write-in value to the output display
                const displayValue =
                  value === 'Other' && specs[`${subFieldKey}_custom`]
                    ? `Other (${specs[`${subFieldKey}_custom`]})`
                    : value

                const cleanLabel = `${serviceId} → ${subFieldKey.replace(/([A-Z])/g, ' $1')}`
                return (
                  <Row
                    key={subFieldKey}
                    label={cleanLabel}
                    value={displayValue}
                  />
                )
              })
            })}
          </div>
        )}

        {/* CEO Review Data Inject */}
        {(formData.petName || targetPetImageName || formData.petBio) && (
          <div className="-mx-5 mt-4 space-y-1 rounded-b-2xl border-t border-dashed border-pink-200 bg-pink-50/30 px-5 py-2 pt-3">
            <p className="mb-1 font-mono text-[10px] font-bold tracking-widest text-pink-500 uppercase">
              // CEO Vibe Check Data
            </p>
            <Row label="Officer Name" value={formData.petName} />
            <Row label="Evidence Attachment" value={targetPetImageName} />
            <Row label="Officer Bio" value={formData.petBio} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewForm
