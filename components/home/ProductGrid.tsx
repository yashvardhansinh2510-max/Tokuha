'use client'

import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'

export default function ProductGrid() {
  return (
    <section className="py-24 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-3">
              All Expressions
            </p>
            <h2
              className="font-cormorant font-light text-cream"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em', lineHeight: '1' }}
            >
              The Collection.
            </h2>
          </div>
          <Link
            href="/products"
            className="font-mono-custom text-[10px] tracking-[0.2em] text-cream/40 hover:text-cream transition-colors uppercase border-b border-transparent hover:border-cream/20 pb-0.5"
          >
            View All →
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
