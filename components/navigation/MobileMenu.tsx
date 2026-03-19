'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/ritual-lab', label: 'Ritual Lab' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItems, openCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9000] bg-obsidian flex flex-col"
          style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)' }}
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/5">
            <Link
              href="/"
              onClick={onClose}
              className="font-cormorant text-xl font-light tracking-[0.2em] text-cream"
            >
              TOKUHĀ
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-cormorant text-[52px] font-light text-cream/80 hover:text-cream transition-colors leading-tight hover:translate-x-2 transition-transform duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => { onClose(); openCart() }}
                className="block font-cormorant text-[52px] font-light text-cream/80 hover:text-cream transition-colors leading-tight text-left"
              >
                Cart {totalItems > 0 && <span className="text-matcha-light text-3xl">({totalItems})</span>}
              </button>
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-8 pb-10 border-t border-white/5 pt-6"
          >
            <p className="font-mono-custom text-xs text-cream/30 tracking-widest">
              MATCHA, UNCHAINED.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
