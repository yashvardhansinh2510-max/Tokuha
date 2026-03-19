'use client'

import { motion } from 'framer-motion'
import { Packaging } from '@/lib/products'

interface PackagingToggleProps {
  available: Packaging[]
  selected: Packaging
  onChange: (pkg: Packaging) => void
  accentColor: string
}

const labels: Record<Packaging, { label: string; desc: string; icon: string }> = {
  tin: { label: 'Tin', desc: 'Magnetic closure, reusable', icon: '⬡' },
  pouch: { label: 'Pouch', desc: 'Resealable, lightweight', icon: '▭' },
}

export default function PackagingToggle({
  available,
  selected,
  onChange,
  accentColor,
}: PackagingToggleProps) {
  return (
    <div className="flex gap-3">
      {(['tin', 'pouch'] as Packaging[]).map((pkg) => {
        const isAvailable = available.includes(pkg)
        const isSelected = selected === pkg
        const info = labels[pkg]

        return (
          <button
            key={pkg}
            onClick={() => isAvailable && onChange(pkg)}
            disabled={!isAvailable}
            className="relative flex-1 p-4 rounded-xl border text-left transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: isSelected ? accentColor : 'rgba(255,255,255,0.08)',
              background: isSelected ? `${accentColor}10` : 'rgba(17,17,17,0.5)',
            }}
          >
            {isSelected && (
              <motion.div
                layoutId="pkg-indicator"
                className="absolute inset-0 rounded-xl"
                style={{ background: `${accentColor}08` }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-lg"
                  style={{ color: isSelected ? accentColor : 'rgba(245,240,232,0.3)' }}
                >
                  {info.icon}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: accentColor }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </div>
              <p
                className="font-dm text-sm font-medium"
                style={{ color: isSelected ? '#F5F0E8' : 'rgba(245,240,232,0.5)' }}
              >
                {info.label}
              </p>
              <p className="font-mono-custom text-[9px] text-cream/25 tracking-wide mt-0.5">
                {info.desc}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
