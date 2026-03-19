'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product, Packaging } from '@/lib/products'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [packaging, setPackaging] = useState<Packaging>(
    product.availablePackaging[0]
  )
  const { addItem } = useCart()

  const currentPrice =
    packaging === 'tin'
      ? product.price.tin
      : (product.price.pouch ?? product.price.tin)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, packaging)
    toast.success(`🍵 ${product.name} added`, {
      style: {
        background: '#111111',
        border: `1px solid ${product.accentColor}30`,
        borderLeft: `3px solid ${product.accentColor}`,
        color: '#F5F0E8',
      },
    })
  }

  const isImperial = product.id === '5'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/products/${product.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden transition-shadow duration-400"
          style={{
            background: '#111111',
            border: isImperial
              ? '1px solid rgba(201,168,76,0.35)'
              : '1px solid rgba(255,255,255,0.06)',
            boxShadow: isImperial ? '0 0 30px rgba(201,168,76,0.06)' : 'none',
            willChange: 'transform',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${product.glowColor}`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = isImperial ? '0 0 30px rgba(201,168,76,0.06)' : 'none'
          }}
        >
          {/* Product code + badge */}
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
            <span
              className="font-mono-custom text-[9px] tracking-widest opacity-30"
              style={{ color: '#F5F0E8' }}
            >
              {product.code}
            </span>
            {isImperial && (
              <span className="font-mono-custom text-[8px] px-2 py-0.5 rounded-full tracking-widest"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}>
                LIMITED
              </span>
            )}
          </div>

          {/* Imperial crown */}
          {isImperial && (
            <div className="absolute top-4 left-4 z-10 text-sm">👑</div>
          )}

          {/* Product mockup area */}
          <div
            className="relative h-52 flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${product.accentColor}12 0%, rgba(17,17,17,0) 100%)`,
            }}
          >
            {/* Mini tin mockup */}
            <div
              className="relative rounded-xl flex items-center justify-center"
              style={{
                width: packaging === 'tin' ? 90 : 70,
                height: packaging === 'tin' ? 120 : 140,
                background: `linear-gradient(160deg, ${product.accentColor}30, rgba(10,10,10,0.8))`,
                border: `1px solid ${product.accentColor}25`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${product.accentColor}15`,
              }}
            >
              <div className="text-center">
                <div
                  className="w-7 h-7 rounded-full border flex items-center justify-center mx-auto mb-2"
                  style={{ borderColor: `${product.accentColor}40`, background: `${product.accentColor}15` }}
                >
                  <span style={{ color: product.accentColor, fontSize: '12px' }}>
                    {product.series === 'infused' ? '❋' : '◈'}
                  </span>
                </div>
                <p
                  className="font-cormorant font-light leading-tight"
                  style={{ color: '#F5F0E8', fontSize: '8px', opacity: 0.7 }}
                >
                  TOKUHĀ
                </p>
              </div>

              {/* Shimmer */}
              <div className="absolute inset-0 shimmer rounded-xl opacity-20" />
            </div>

            {/* Base shadow */}
            <div
              className="absolute bottom-4 rounded-full blur-xl opacity-30"
              style={{ width: 80, height: 14, background: product.accentColor }}
            />
          </div>

          {/* Info */}
          <div className="p-5">
            {/* Name */}
            <h3
              className="font-cormorant font-light text-cream mb-1 group-hover:opacity-80 transition-opacity"
              style={{ fontSize: '20px', letterSpacing: '-0.01em' }}
            >
              {product.name}
              {isImperial && <span className="ml-2 text-base">👑</span>}
            </h3>

            {/* Tagline */}
            <p className="font-dm font-light text-cream/40 text-xs mb-3 leading-relaxed line-clamp-2">
              {product.tagline}
            </p>

            {/* Flavor tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="flavor-pill text-[9px]"
                  style={{
                    color: product.accentColor,
                    borderColor: `${product.accentColor}30`,
                    background: `${product.accentColor}08`,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Packaging toggle */}
            {product.availablePackaging.length > 1 && (
              <div className="flex gap-1.5 mb-4" onClick={(e) => e.preventDefault()}>
                {(['tin', 'pouch'] as Packaging[]).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={(e) => { e.preventDefault(); setPackaging(pkg) }}
                    disabled={!product.availablePackaging.includes(pkg)}
                    className="px-3 py-1.5 rounded-md border font-mono-custom text-[9px] tracking-widest transition-all duration-200 disabled:opacity-20"
                    style={{
                      borderColor: packaging === pkg ? product.accentColor : 'rgba(255,255,255,0.1)',
                      background: packaging === pkg ? `${product.accentColor}15` : 'transparent',
                      color: packaging === pkg ? product.accentColor : 'rgba(245,240,232,0.35)',
                    }}
                  >
                    {pkg.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mb-0.5">
                  PRICE
                </p>
                <p className="font-mono-custom text-base text-cream">{formatPrice(currentPrice)}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                className="px-5 py-2.5 rounded-lg font-dm text-xs font-medium text-cream transition-all duration-200"
                style={{ background: product.accentColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.85'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Add to Bag
              </motion.button>
            </div>

            {/* Imperial urgency */}
            {isImperial && (
              <p className="font-mono-custom text-[9px] text-gold/60 tracking-widest mt-3">
                ⚡ Only 47 units remaining
              </p>
            )}

            {/* Buy 2 save */}
            <p className="font-mono-custom text-[9px] text-cream/20 tracking-wider mt-1">
              Buy 2, save ₹100
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
