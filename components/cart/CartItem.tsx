'use client'

import { motion } from 'framer-motion'
import { CartItem as CartItemType } from './CartContext'
import { useCart } from './CartContext'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQty } = useCart()
  const price = item.packaging === 'tin'
    ? item.product.price.tin
    : (item.product.price.pouch ?? item.product.price.tin)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 py-5 border-b border-white/5"
    >
      {/* Color accent strip + Product mockup */}
      <div className="flex-shrink-0 relative">
        {/* Accent strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
          style={{ background: item.product.accentColor }}
        />
        {/* Mini tin */}
        <div
          className="w-14 h-18 rounded-lg ml-2 flex items-center justify-center text-xs font-cormorant font-light"
          style={{
            background: `linear-gradient(160deg, ${item.product.accentColor}20, ${item.product.accentColor}08)`,
            border: `1px solid ${item.product.accentColor}25`,
            minHeight: '72px',
          }}
        >
          <span style={{ color: item.product.accentColor, fontSize: '8px', opacity: 0.7 }}>
            {item.packaging === 'tin' ? '⬡' : '▭'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-cormorant text-base font-light text-cream leading-tight mb-0.5 truncate">
          {item.product.name}
        </p>
        <p className="font-mono-custom text-[10px] text-cream/30 mb-2 tracking-wide">
          {item.product.code} · {item.packaging.toUpperCase()} · {item.product.weightG}g
        </p>

        {/* Qty + Remove */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 border border-white/10 rounded-md overflow-hidden">
            <button
              onClick={() => updateQty(item.product.id, item.packaging, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/5 transition-colors"
            >
              −
            </button>
            <span className="w-7 text-center font-mono-custom text-xs text-cream">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.product.id, item.packaging, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-cream/50 hover:text-cream hover:bg-white/5 transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.product.id, item.packaging)}
            className="font-mono-custom text-[10px] text-cream/20 hover:text-cream/50 transition-colors tracking-wider"
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <p className="font-mono-custom text-sm text-cream">{formatPrice(price * item.quantity)}</p>
        {item.quantity > 1 && (
          <p className="font-mono-custom text-[10px] text-cream/30">{formatPrice(price)} each</p>
        )}
      </div>
    </motion.div>
  )
}
