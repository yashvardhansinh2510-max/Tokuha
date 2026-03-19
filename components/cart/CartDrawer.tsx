'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart, FREE_SHIPPING_THRESHOLD } from './CartContext'
import CartItem from './CartItem'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { state, closeCart, subtotal } = useCart()
  const { isOpen, items } = state

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[8500] cart-overlay"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 z-[8600] w-full max-w-[420px] bg-ink flex flex-col"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div>
                <h2 className="font-cormorant text-xl font-light text-cream tracking-wide">
                  Your Bag
                </h2>
                {items.length > 0 && (
                  <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest mt-0.5">
                    {items.reduce((s, i) => s + i.quantity, 0)} ITEM{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 'S' : ''}
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-cream/40 hover:text-cream transition-colors"
                aria-label="Close cart"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                  <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="px-6 py-3 border-b border-white/5">
              <div className="flex justify-between mb-2">
                <span className="font-mono-custom text-[10px] text-cream/30 tracking-wider">
                  {remaining > 0
                    ? `${formatPrice(remaining)} away from free shipping`
                    : '🌿 Free shipping unlocked!'}
                </span>
                <span className="font-mono-custom text-[10px] text-cream/30">
                  {Math.round(shippingProgress)}%
                </span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-matcha-core rounded-full shipping-progress-fill"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-5xl opacity-30">🍵</span>
                  <p className="font-cormorant text-xl font-light text-cream/40">
                    Your bag is empty.
                  </p>
                  <p className="font-dm text-sm text-cream/25">
                    The ritual awaits.
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem
                      key={`${item.product.id}-${item.packaging}`}
                      item={item}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-white/5">
                {/* Buy 2 save message */}
                {items.reduce((s, i) => s + i.quantity, 0) === 1 && (
                  <p className="font-mono-custom text-[10px] text-cream/30 tracking-wider text-center mb-4">
                    Add 1 more item — save ₹100
                  </p>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="font-dm text-sm text-cream/60">Subtotal</span>
                  <span className="font-mono-custom text-lg text-cream">{formatPrice(subtotal)}</span>
                </div>

                <p className="font-mono-custom text-[10px] text-cream/25 tracking-wider text-center mb-4">
                  Taxes & shipping calculated at checkout
                </p>

                <button className="w-full py-4 bg-matcha-core hover:bg-matcha-light/80 text-cream font-dm text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-glow-green">
                  Proceed to Checkout
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-3 mt-2 text-cream/40 hover:text-cream font-dm text-sm transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
