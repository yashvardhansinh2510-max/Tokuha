'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const frames = [
  {
    number: '01',
    headline: 'We start with shade.',
    description:
      'First-harvest tencha, shade-grown for 21 days. The canopy forces the leaf to concentrate every last gram of chlorophyll, L-theanine, and amino acid. The result is a deeper green than you\'ve ever seen.',
    gradient: 'linear-gradient(135deg, #0D1F17 0%, #1A2E23 50%, #0A0A0A 100%)',
    accent: '#3D6B4F',
    label: 'Uji, Kyoto · First Harvest',
  },
  {
    number: '02',
    headline: 'We stone-mill at dawn.',
    description:
      'Cold granite wheels, turning at exactly the right RPM. 40 grams of matcha per hour. Any faster and heat builds — oxidation sets in and the flavour dies. We refuse to rush.',
    gradient: 'linear-gradient(135deg, #1A1A0D 0%, #2E2E1A 50%, #0A0A0A 100%)',
    accent: '#C9A84C',
    label: 'Stone-Milled · 40g/Hour',
  },
  {
    number: '03',
    headline: 'We infuse the impossible.',
    description:
      'Freeze-drying technology at -50°C. Zero heat, zero water loss, zero compromised flavour. Himalayan strawberries. Sicilian lemon crystals. Kannauj rose petals. Locked forever into the powder.',
    gradient: 'linear-gradient(135deg, #1F0D0D 0%, #2E1A1A 50%, #0A0A0A 100%)',
    accent: '#E8524A',
    label: 'Freeze-Dried · -50°C',
  },
  {
    number: '04',
    headline: 'We ship it the next morning.',
    description:
      'Freshness-sealed and nitrogen-flushed within hours of milling. Your order dispatched within 24 hours. No warehouse sitting. No oxidation. Just the morning\'s matcha, at your door.',
    gradient: 'linear-gradient(135deg, #0D1620 0%, #1A2530 50%, #0A0A0A 100%)',
    accent: '#7BAF8E',
    label: 'Dispatched · 24h Freshness',
  },
]

export default function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal movement: 0% to -75% across the 4 panels (each 100vw)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${frames.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section label */}
        <div className="absolute top-20 left-6 z-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/20 uppercase"
          >
            The Process
          </motion.p>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute top-0 left-0 right-0 h-px z-20 bg-white/5">
          <motion.div
            className="h-full bg-matcha-core"
            style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
          />
        </div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x, willChange: 'transform' }}
          className="flex h-full"
        >
          {frames.map((frame, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-screen h-screen flex items-center px-6 md:px-16"
              style={{ background: frame.gradient }}
            >
              {/* Large number background */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 font-cormorant select-none pointer-events-none leading-none"
                style={{
                  fontSize: 'clamp(200px, 25vw, 380px)',
                  color: frame.accent,
                  opacity: 0.04,
                  letterSpacing: '-0.05em',
                  right: '-0.02em',
                }}
              >
                {frame.number}
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-2xl">
                {/* Number */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="font-mono-custom mb-6"
                  style={{ color: frame.accent, fontSize: '11px', letterSpacing: '0.2em' }}
                >
                  {frame.number} / {String(frames.length).padStart(2, '0')}
                </motion.p>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant font-light text-cream mb-6"
                  style={{
                    fontSize: 'clamp(42px, 5vw, 80px)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {frame.headline}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-dm font-light text-cream/50 mb-8 max-w-lg leading-relaxed"
                  style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}
                >
                  {frame.description}
                </motion.p>

                {/* Label chip */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                  style={{
                    borderColor: `${frame.accent}30`,
                    background: `${frame.accent}08`,
                    color: frame.accent,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: frame.accent }}
                  />
                  <span className="font-mono-custom text-[10px] tracking-widest">{frame.label}</span>
                </motion.div>
              </div>

              {/* Next hint (on all but last) */}
              {i < frames.length - 1 && (
                <div className="absolute right-8 bottom-12 text-cream/20 text-xs font-mono-custom tracking-widest">
                  NEXT ›
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
