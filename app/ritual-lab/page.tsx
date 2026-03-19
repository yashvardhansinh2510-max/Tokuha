import type { Metadata } from 'next'
import RitualLab from '@/components/home/RitualLab'

export const metadata: Metadata = {
  title: 'Ritual Lab — Tokuhā Matcha',
  description: 'Build your perfect matcha ritual. Choose your base, milk, and temperature.',
}

export default function RitualLabPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero banner */}
      <div
        className="py-20 text-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(61,107,79,0.1) 0%, transparent 60%), #0A0A0A',
        }}
      >
        <p className="font-mono-custom text-[10px] tracking-[0.4em] text-cream/30 uppercase mb-4">
          Ritual Lab
        </p>
        <h1
          className="font-cormorant font-light text-cream"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            letterSpacing: '-0.02em',
            lineHeight: '1',
          }}
        >
          Build Your<br /><em className="italic">Perfect Cup.</em>
        </h1>
        <p className="font-dm font-light text-cream/40 mt-4 max-w-md mx-auto" style={{ fontSize: '16px', lineHeight: '1.7' }}>
          Every matcha deserves a ritual. Tell us what you&apos;re working with — we&apos;ll tell you exactly how to make it extraordinary.
        </p>
      </div>

      {/* Lab component */}
      <RitualLab />
    </div>
  )
}
