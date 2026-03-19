'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import TrustBadges from '@/components/ui/TrustBadges'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 gradient-mesh opacity-90"
        style={{ willChange: 'background-position' }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        <ParticleCanvas color="#7BAF8E" secondaryColor="#C9A84C" count={50} />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-custom text-[10px] tracking-[0.4em] text-cream/40 uppercase mb-8"
        >
          4,200+ rituals served · Premium Indian DTC Matcha
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic font-light text-cream leading-[0.9]"
            style={{
              fontSize: 'clamp(72px, 12vw, 140px)',
              letterSpacing: '-0.02em',
            }}
          >
            Matcha,
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-cream leading-[0.9]"
            style={{
              fontSize: 'clamp(72px, 12vw, 140px)',
              letterSpacing: '-0.02em',
            }}
          >
            Unchained.
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-dm font-light text-cream/50 mb-12 max-w-lg mx-auto"
          style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', lineHeight: '1.7' }}
        >
          Five expressions. Zero compromise.<br />
          Free from the grass, faithful to the ritual.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/products"
            className="group relative px-8 py-4 bg-matcha-core text-cream font-dm text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow-green"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-matcha-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/our-story"
            className="px-8 py-4 border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/40 font-dm text-sm font-medium rounded-lg transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex justify-center"
        >
          <TrustBadges />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-custom text-[9px] tracking-[0.3em] text-cream/20 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-cream/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
