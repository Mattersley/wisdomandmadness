const SystemMatrix: React.FC = () => {
  const systems = [
    { id: 'LS-01', label: 'LIFE SUPPORT', val: '98%', status: 'OK' },
    { id: 'RC-09', label: 'REACTOR CORE', val: '4120K', status: 'HOT' },
    { id: 'GR-12', label: 'GRAVITY GEN', val: '1.0G', status: 'NOM' },
    { id: 'CM-04', label: 'COMM ARRAY', val: '0.00', status: 'ERR' }
  ]

  return (
    <div className="border border-gray-800 bg-[#050505] p-4 font-mono text-[10px] uppercase">
      <div className="mb-2 grid grid-cols-4 gap-4 border-b border-gray-700 pb-2 text-gray-500">
        <span>ID</span>
        <span>SYSTEM</span>
        <span>VAL</span>
        <span>STAT</span>
      </div>
      {systems.map((s) => (
        <div
          key={s.id}
          className="grid grid-cols-4 gap-4 border-b border-gray-900 py-1 last:border-0"
        >
          <span className="text-[#ffb400]">{s.id}</span>
          <span className="text-white">{s.label}</span>
          <span className="text-white">{s.val}</span>
          <span
            className={
              s.status === 'ERR'
                ? 'animate-pulse text-red-600'
                : 'text-[#00ff41]'
            }
          >
            [{s.status}]
          </span>
        </div>
      ))}
      <div className="mt-4 border border-dashed border-gray-700 bg-[#1a1a1a] p-2 text-center text-[8px] text-gray-400">
        SECURE CHANNEL MU/TH/UR ACCESS ONLY
      </div>
    </div>
  )
}

export default SystemMatrix