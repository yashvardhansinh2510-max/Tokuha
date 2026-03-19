import { products } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products — Tokuhā Matcha',
  description: 'Five expressions of ceremonial-grade matcha. Shop the full Tokuhā collection.',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-3">
            The Collection
          </p>
          <h1
            className="font-cormorant font-light text-cream"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              letterSpacing: '-0.02em',
              lineHeight: '1',
            }}
          >
            Five Expressions.
          </h1>
          <p className="font-dm font-light text-cream/40 mt-4 max-w-md" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            Each one a world. Each one a ritual. Zero compromise, zero grass.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/5" />
          <span className="font-mono-custom text-[9px] text-cream/15 tracking-widest">
            {products.length} EXPRESSIONS
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-20 text-center">
          <p className="font-cormorant italic text-cream/20 text-xl">
            &ldquo;Every tin ships within 24 hours of milling.&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
