'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Product, Packaging, getRelatedProducts } from '@/lib/products'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'
import PackagingToggle from './PackagingToggle'
import ProductCard from './ProductCard'
import TrustBadges from '@/components/ui/TrustBadges'

type TabId = 'description' | 'flavor' | 'brew' | 'origin'

const tabs: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'flavor', label: 'Flavor Notes' },
  { id: 'brew', label: 'Brew Guide' },
  { id: 'origin', label: 'Origin' },
]

export default function ProductDetail({ product }: { product: Product }) {
  const [packaging, setPackaging] = useState<Packaging>(product.availablePackaging[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<TabId>('description')
  const [stickyVisible, setStickyVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  const isImperial = product.id === '5'
  const currentPrice = packaging === 'tin' ? product.price.tin : (product.price.pouch ?? product.price.tin)
  const related = getRelatedProducts(product.id, 3)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom
        setStickyVisible(bottom < 0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, packaging)
    }
    toast.success(`🍵 ${product.name} × ${quantity} added to your bag`, {
      style: {
        background: '#111111',
        border: `1px solid ${product.accentColor}30`,
        borderLeft: `3px solid ${product.accentColor}`,
        color: '#F5F0E8',
      },
    })
  }

  return (
    <>
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${product.glowColor} 0%, rgba(10,10,10,0.95) 60%), #0A0A0A`,
        }}
      >
        {/* Breadcrumb */}
        <div className="absolute top-24 left-6 flex items-center gap-2">
          <Link
            href="/"
            className="font-mono-custom text-[9px] text-cream/25 hover:text-cream/50 tracking-widest transition-colors"
          >
            HOME
          </Link>
          <span className="text-cream/15 text-xs">›</span>
          <Link
            href="/products"
            className="font-mono-custom text-[9px] text-cream/25 hover:text-cream/50 tracking-widest transition-colors"
          >
            PRODUCTS
          </Link>
          <span className="text-cream/15 text-xs">›</span>
          <span className="font-mono-custom text-[9px] text-cream/40 tracking-widest">
            {product.code}
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Large Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={packaging}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="relative"
                style={{ willChange: 'transform' }}
              >
                {/* Large tin/pouch mockup */}
                <div
                  className="rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
                  style={{
                    width: packaging === 'tin' ? 260 : 200,
                    height: packaging === 'tin' ? 340 : 400,
                    background: `linear-gradient(160deg, ${product.accentColor}30 0%, rgba(10,10,10,0.95) 70%)`,
                    border: `1px solid ${product.accentColor}30`,
                    boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${product.accentColor}25`,
                  }}
                >
                  {/* Lid */}
                  {packaging === 'tin' && (
                    <div
                      className="absolute top-0 left-0 right-0 h-14 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(180deg, ${product.accentColor}50, ${product.accentColor}20)`,
                        borderBottom: `1px solid ${product.accentColor}25`,
                      }}
                    >
                      <div className="w-12 h-1.5 rounded-full opacity-30" style={{ background: product.accentColor }} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col items-center gap-4">
                    <p
                      className="font-cormorant text-[11px] tracking-[0.5em] uppercase"
                      style={{ color: product.accentColor, opacity: 0.7 }}
                    >
                      TOKUHĀ
                    </p>

                    <div
                      className="w-20 h-20 rounded-full border flex items-center justify-center"
                      style={{ borderColor: `${product.accentColor}40`, background: `${product.accentColor}10` }}
                    >
                      <span className="text-3xl" style={{ color: product.accentColor, opacity: 0.8 }}>
                        {product.series === 'infused' ? '❋' : '◈'}
                      </span>
                    </div>

                    <div className="text-center px-6">
                      {product.name.split(' ').map((word, i) => (
                        <p
                          key={i}
                          className="font-cormorant font-light leading-tight"
                          style={{ color: '#F5F0E8', fontSize: '16px', opacity: 0.9 }}
                        >
                          {word}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <p
                        className="font-mono-custom text-[9px] tracking-[0.3em]"
                        style={{ color: product.accentColor, opacity: 0.5 }}
                      >
                        {product.grade.toUpperCase()}
                      </p>
                      <p
                        className="font-mono-custom text-[8px] tracking-widest"
                        style={{ color: product.accentColor, opacity: 0.35 }}
                      >
                        {product.weightG}g · {product.origin}
                      </p>
                    </div>
                  </div>

                  {/* Shimmer */}
                  <div className="absolute inset-0 shimmer opacity-20 rounded-3xl" />

                  {/* Pouch tie */}
                  {packaging === 'pouch' && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-1"
                      style={{ borderTop: `1px solid ${product.accentColor}15` }}
                    >
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-0.5 h-4 rounded-full opacity-20" style={{ background: product.accentColor }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Shadow */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-40"
                  style={{ width: 180, height: 24, background: product.accentColor }}
                />

                {/* Imperial crown + badge */}
                {isImperial && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">👑</div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Code + Badge */}
            <div className="flex items-center gap-3">
              <span className="font-mono-custom text-[10px] text-cream/30 tracking-widest">
                {product.code}
              </span>
              {product.badge && (
                <>
                  <span
                    className="font-mono-custom text-[9px] px-3 py-1 rounded-full border tracking-widest"
                    style={{ color: product.accentColor, borderColor: `${product.accentColor}40`, background: `${product.accentColor}10` }}
                  >
                    {product.badge.toUpperCase()}
                  </span>
                  <span className="font-mono-custom text-[10px] text-gold/60 tracking-wider">
                    · Only 47 left
                  </span>
                </>
              )}
            </div>

            {/* Name */}
            <h1
              className="font-cormorant font-light text-cream"
              style={{ fontSize: 'clamp(36px, 4vw, 60px)', lineHeight: '1', letterSpacing: '-0.02em' }}
            >
              {product.name}
              {isImperial && ' 👑'}
            </h1>

            {/* Tagline */}
            <p className="font-dm font-light text-cream/50 text-lg leading-relaxed">
              {product.tagline}
            </p>

            {/* Flavor notes */}
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="flavor-pill"
                  style={{ color: product.accentColor, borderColor: `${product.accentColor}40`, background: `${product.accentColor}08` }}
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Packaging */}
            <PackagingToggle
              available={product.availablePackaging}
              selected={packaging}
              onChange={setPackaging}
              accentColor={product.accentColor}
            />

            {/* Price */}
            <div>
              <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-1">PRICE</p>
              <p className="font-mono-custom text-3xl text-cream">{formatPrice(currentPrice)}</p>
              <p className="font-mono-custom text-[10px] text-cream/20 mt-1">Per {product.weightG}g · Inc. all taxes</p>
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3">
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/5 transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-mono-custom text-sm text-cream">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/5 transition-colors"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="flex-1 py-3 rounded-xl font-dm text-sm font-medium text-cream transition-all duration-300"
                style={{ background: product.accentColor }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Add to Bag — {formatPrice(currentPrice * quantity)}
              </motion.button>
            </div>

            {/* Buy 2 save */}
            <p className="font-mono-custom text-[10px] text-cream/25 tracking-wider">
              Buy 2, save ₹100 · Free shipping on orders ₹999+
            </p>

            <TrustBadges />
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="bg-ink py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Tab nav */}
          <div className="flex gap-1 border-b border-white/5 mb-12 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-3 font-dm text-sm transition-all duration-200 whitespace-nowrap relative"
                style={{ color: activeTab === tab.id ? '#F5F0E8' : 'rgba(245,240,232,0.35)' }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: product.accentColor }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === 'description' && (
                <div>
                  <p className="font-cormorant italic font-light text-cream/80 text-2xl leading-relaxed mb-6">
                    &ldquo;{product.tagline}&rdquo;
                  </p>
                  <p className="font-dm font-light text-cream/50 text-base leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'flavor' && (
                <div className="flex flex-col gap-6">
                  {product.flavorNotes.map((note, i) => (
                    <div key={note} className="flex items-center gap-6">
                      <span className="font-mono-custom text-[9px] text-cream/20 w-6">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex-1 h-px bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${70 + i * 10}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ background: product.accentColor }}
                        />
                      </div>
                      <span className="font-cormorant text-xl font-light text-cream/80">{note}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'brew' && (
                <ol className="flex flex-col gap-6">
                  {(product.brewGuide ?? ['Sift 2g into your bowl', 'Add 60ml water at 75°C', 'Whisk until frothy', 'Enjoy immediately']).map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <span
                        className="font-mono-custom text-[10px] mt-1 flex-shrink-0 w-6"
                        style={{ color: product.accentColor, opacity: 0.5 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-dm text-base text-cream/60 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'origin' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Origin', value: product.origin },
                    { label: 'Grade', value: product.grade },
                    { label: 'Series', value: product.series === 'infused' ? 'Infused Series' : 'Ceremonial Series' },
                    { label: 'Net Weight', value: `${product.weightG}g` },
                    { label: 'Processing', value: product.series === 'infused' ? 'Stone-milled + Freeze-dried infusion' : 'Stone-milled' },
                    { label: 'Harvest', value: 'First flush' },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-white/5 pb-4">
                      <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-2 uppercase">{label}</p>
                      <p className="font-dm text-sm text-cream/70">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-obsidian py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-2">
              You Might Also Love
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Related Expressions.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart Bar */}
      <div
        className={`sticky-cart-bar fixed bottom-0 left-0 right-0 z-[7000] ${stickyVisible ? 'visible' : ''}`}
        style={{
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-cormorant text-lg font-light text-cream">{product.name}</p>
            <p className="font-mono-custom text-[10px] text-cream/30 tracking-wider">{product.code}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-mono-custom text-xl text-cream">{formatPrice(currentPrice)}</p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="px-6 py-3 rounded-xl font-dm text-sm font-medium text-cream"
              style={{ background: product.accentColor }}
            >
              Add to Bag
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}
