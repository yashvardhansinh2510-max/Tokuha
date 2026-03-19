'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, Product } from '@/lib/products'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import TrustBadges from '@/components/ui/TrustBadges'

function ProductMockup({ product, packaging = 'tin' }: { product: Product; packaging: 'tin' | 'pouch' }) {
  const isTin = packaging === 'tin'

  return (
    <div
      className="relative mx-auto"
      style={{
        width: isTin ? 180 : 130,
        height: isTin ? 240 : 280,
        willChange: 'transform',
      }}
    >
      {/* Main body */}
      <div
        className="w-full h-full rounded-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg,
            ${product.accentColor}25 0%,
            rgba(10,10,10,0.9) 60%,
            rgba(10,10,10,1) 100%)`,
          border: `1px solid ${product.accentColor}30`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${product.accentColor}20`,
        }}
      >
        {/* Lid (tin only) */}
        {isTin && (
          <div
            className="absolute top-0 left-0 right-0 h-10 rounded-t-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(180deg, ${product.accentColor}40, ${product.accentColor}20)`,
              borderBottom: `1px solid ${product.accentColor}20`,
            }}
          >
            <div
              className="w-8 h-1 rounded-full opacity-40"
              style={{ background: product.accentColor }}
            />
          </div>
        )}

        {/* Shimmer stripe */}
        <div
          className="absolute left-0 right-0 top-[40%] h-px opacity-20"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)` }}
        />

        {/* Label area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
          {/* Brand mark */}
          <p
            className="font-cormorant text-[10px] tracking-[0.35em] uppercase opacity-60"
            style={{ color: product.accentColor }}
          >
            TOKUHĀ
          </p>

          {/* Product circle icon */}
          <div
            className="w-12 h-12 rounded-full border flex items-center justify-center"
            style={{ borderColor: `${product.accentColor}40`, background: `${product.accentColor}10` }}
          >
            <span className="text-lg" style={{ color: product.accentColor, opacity: 0.7 }}>
              {product.series === 'infused' ? '❋' : '◈'}
            </span>
          </div>

          {/* Product name lines */}
          <div className="text-center mt-1">
            <p
              className="font-cormorant font-light leading-tight text-center"
              style={{
                color: '#F5F0E8',
                fontSize: '11px',
                opacity: 0.9,
                letterSpacing: '0.05em',
              }}
            >
              {product.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </p>
          </div>

          {/* Weight */}
          <p
            className="font-mono-custom text-[8px] tracking-widest opacity-40 mt-1"
            style={{ color: product.accentColor }}
          >
            50g
          </p>
        </div>

        {/* Shimmer overlay animation */}
        <div
          className="absolute inset-0 shimmer opacity-30 rounded-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}15, transparent)` }}
        />

        {/* Pouch tie */}
        {!isTin && (
          <div
            className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center gap-1"
            style={{
              background: `linear-gradient(0deg, ${product.accentColor}30, transparent)`,
              borderTop: `1px solid ${product.accentColor}15`,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-3 rounded-full opacity-30"
                style={{ background: product.accentColor }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Base shadow */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-xl opacity-40"
        style={{
          width: isTin ? 120 : 90,
          height: 20,
          background: product.accentColor,
        }}
      />
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function FlavorSelector() {
  const defaultProduct = products[4] // Imperial
  const [active, setActive] = useState<Product>(defaultProduct)
  const [packaging, setPackaging] = useState<'tin' | 'pouch'>('tin')
  const { addItem } = useCart()
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleSelect = (product: Product) => {
    setActive(product)
    // If selected product doesn't have pouch, force tin
    if (!product.availablePackaging.includes(packaging)) {
      setPackaging('tin')
    }
  }

  const handleAddToCart = () => {
    addItem(active, packaging)
    toast.success(`🍵 ${active.name} added to your bag`, {
      description: `${packaging.charAt(0).toUpperCase() + packaging.slice(1)} · ${formatPrice(
        packaging === 'tin' ? active.price.tin : (active.price.pouch ?? active.price.tin)
      )}`,
      style: {
        background: '#111111',
        border: `1px solid ${active.accentColor}40`,
        borderLeft: `3px solid ${active.accentColor}`,
        color: '#F5F0E8',
      },
    })
  }

  const currentPrice = packaging === 'tin' ? active.price.tin : (active.price.pouch ?? active.price.tin)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse at 50% 100%, ${active.glowColor} 0%, rgba(10,10,10,0.9) 60%), #0A0A0A`,
      }}
    >
      {/* Particles colored by product */}
      <div className="absolute inset-0 opacity-60">
        <ParticleCanvas
          color={active.accentColor}
          secondaryColor="#C9A84C"
          count={35}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-4">
            Five Expressions
          </p>
          <h2
            className="font-cormorant font-light text-cream"
            style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '-0.02em', lineHeight: '1' }}
          >
            Choose Your Poison.
          </h2>
        </motion.div>

        {/* Product Selector Circles */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          {/* Desktop: horizontal row */}
          <div className="hidden md:flex items-center justify-center gap-4 w-full">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="group relative flex flex-col items-center gap-3 transition-all duration-300"
              >
                {/* Circle */}
                <div
                  className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: active.id === product.id ? product.accentColor : `${product.accentColor}40`,
                    background: active.id === product.id ? `${product.accentColor}20` : `${product.accentColor}08`,
                    boxShadow: active.id === product.id ? `0 0 30px ${product.accentColor}40` : 'none',
                    transform: active.id === product.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ background: product.accentColor, opacity: active.id === product.id ? 1 : 0.5 }}
                  />

                  {/* Imperial crown */}
                  {product.badge && (
                    <div className="absolute -top-2 -right-2 text-[10px]">👑</div>
                  )}
                </div>

                {/* Label */}
                <div className="text-center">
                  <p
                    className="font-dm text-xs transition-colors duration-300"
                    style={{ color: active.id === product.id ? product.accentColor : 'rgba(245,240,232,0.4)' }}
                  >
                    {product.name.split(' ')[0]}
                  </p>
                  {product.badge && (
                    <p className="font-mono-custom text-[8px] text-gold/60 tracking-wider">
                      LIMITED
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex-shrink-0 snap-center flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: active.id === product.id ? product.accentColor : `${product.accentColor}30`,
                    background: `${product.accentColor}12`,
                    boxShadow: active.id === product.id ? `0 0 20px ${product.accentColor}40` : 'none',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ background: product.accentColor }}
                  />
                </div>
                <p className="font-mono-custom text-[9px] text-cream/50 tracking-wide">
                  {product.name.split(' ')[0].toUpperCase()}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[480px]">
          {/* Left: Mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="flex justify-center"
              style={{ willChange: 'transform' }}
            >
              <ProductMockup product={active} packaging={packaging} />
            </motion.div>
          </AnimatePresence>

          {/* Right: Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + '-info'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              {/* Code + Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <span className="font-mono-custom text-[10px] text-cream/30 tracking-widest">
                  {active.code}
                </span>
                {active.badge && (
                  <span
                    className="font-mono-custom text-[9px] tracking-widest px-3 py-1 rounded-full border"
                    style={{ color: active.accentColor, borderColor: `${active.accentColor}40`, background: `${active.accentColor}10` }}
                  >
                    {active.badge.toUpperCase()}
                  </span>
                )}
                {active.badge && (
                  <span className="font-mono-custom text-[10px] text-gold/70 tracking-wider">
                    · Only 47 units left
                  </span>
                )}
              </motion.div>

              {/* Name */}
              <motion.h3
                variants={itemVariants}
                className="font-cormorant font-light text-cream"
                style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', lineHeight: '1.05', letterSpacing: '-0.01em' }}
              >
                {active.name}
              </motion.h3>

              {/* Tagline */}
              <motion.p variants={itemVariants} className="font-dm font-light text-cream/60 text-base leading-relaxed max-w-md">
                {active.tagline}
              </motion.p>

              {/* Flavor notes */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {active.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="flavor-pill"
                    style={{ color: active.accentColor, borderColor: `${active.accentColor}40`, background: `${active.accentColor}08` }}
                  >
                    {note}
                  </span>
                ))}
              </motion.div>

              {/* Origin + Grade */}
              <motion.div variants={itemVariants} className="flex gap-6">
                <div>
                  <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-1">ORIGIN</p>
                  <p className="font-dm text-sm text-cream/70">{active.origin}</p>
                </div>
                <div>
                  <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-1">GRADE</p>
                  <p className="font-dm text-sm text-cream/70">{active.grade}</p>
                </div>
                <div>
                  <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-1">NET</p>
                  <p className="font-dm text-sm text-cream/70">{active.weightG}g</p>
                </div>
              </motion.div>

              {/* Packaging toggle */}
              {active.availablePackaging.length > 1 && (
                <motion.div variants={itemVariants} className="flex gap-2">
                  {(['tin', 'pouch'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setPackaging(pkg)}
                      disabled={!active.availablePackaging.includes(pkg)}
                      className="px-4 py-2 rounded-lg border font-mono-custom text-[10px] tracking-widest transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                      style={{
                        borderColor: packaging === pkg ? active.accentColor : 'rgba(255,255,255,0.1)',
                        background: packaging === pkg ? `${active.accentColor}15` : 'transparent',
                        color: packaging === pkg ? active.accentColor : 'rgba(245,240,232,0.4)',
                      }}
                    >
                      {pkg.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Price + CTA */}
              <motion.div variants={itemVariants} className="flex items-center gap-6 mt-2">
                <div>
                  <p className="font-mono-custom text-[10px] text-cream/25 tracking-widest mb-1">PRICE</p>
                  <p className="font-mono-custom text-2xl text-cream">{formatPrice(currentPrice)}</p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-4 rounded-lg font-dm text-sm font-medium text-cream transition-all duration-300"
                  style={{
                    background: active.accentColor,
                    boxShadow: `0 0 0 0 ${active.accentColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${active.accentColor}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${active.accentColor}`
                  }}
                >
                  Add to Bag
                </motion.button>
              </motion.div>

              {/* Buy 2 save */}
              <motion.p variants={itemVariants} className="font-mono-custom text-[10px] text-cream/25 tracking-wider">
                Buy 2, save ₹100
              </motion.p>

              <motion.div variants={itemVariants}>
                <TrustBadges />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
