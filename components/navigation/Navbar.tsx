'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/cart/CartContext'
import MobileMenu from './MobileMenu'
import { FREE_SHIPPING_THRESHOLD } from '@/components/cart/CartContext'
import { formatPrice } from '@/lib/utils'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/ritual-lab', label: 'Ritual Lab' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)
  const { totalItems, openCart, subtotal } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bounce cart icon on item count change
  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true)
      const t = setTimeout(() => setCartBounce(false), 400)
      return () => clearTimeout(t)
    }
  }, [totalItems])

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[8000] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-cormorant text-xl font-light tracking-[0.25em] text-cream hover:text-cream/80 transition-colors uppercase"
          >
            Tokuhā
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Free shipping ticker */}
            {remaining > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:block font-mono-custom text-[10px] text-cream/40 tracking-wider"
              >
                {formatPrice(remaining)} to free shipping
              </motion.span>
            )}
            {remaining === 0 && subtotal > 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden lg:block font-mono-custom text-[10px] text-matcha-light tracking-wider"
              >
                Free shipping unlocked
              </motion.span>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-cream/70 hover:text-cream transition-colors"
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M1 1H3.5L5.5 13H16L18 5H5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="16.5" r="1.25" fill="currentColor" />
                <circle cx="14" cy="16.5" r="1.25" fill="currentColor" />
              </svg>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-matcha-core flex items-center justify-center font-mono-custom text-[9px] text-cream ${cartBounce ? 'badge-bounce' : ''}`}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 text-cream/70 hover:text-cream transition-colors"
              aria-label="Open menu"
            >
              <span className="block w-5 h-px bg-current" />
              <span className="block w-3.5 h-px bg-current" />
              <span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
