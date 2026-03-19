'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

const shopLinks = [
  { href: '/products/strawberry-infused-matcha', label: 'Strawberry Matcha' },
  { href: '/products/lemonade-infused-matcha', label: 'Lemonade Matcha' },
  { href: '/products/rose-infused-matcha', label: 'Rose Matcha' },
  { href: '/products/ceremonial-aaa-matcha', label: 'Ceremonial AAA' },
  { href: '/products/ceremonial-imperial-matcha', label: 'Imperial — Limited' },
]

const companyLinks = [
  { href: '/our-story', label: 'Our Story' },
  { href: '/ritual-lab', label: 'Ritual Lab' },
  { href: '/products', label: 'All Products' },
]

const socialLinks = [
  {
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" strokeWidth="0" />
      </svg>
    ),
  },
  {
    label: 'Twitter/X',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-ink border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="font-cormorant text-2xl font-light tracking-[0.2em] text-cream block mb-3">
              TOKUHĀ
            </Link>
            <p className="font-dm text-sm text-cream/40 font-light leading-relaxed mb-6">
              Matcha, Unchained.<br />
              Five expressions. Zero compromise.<br />
              Free from the grass, faithful to the ritual.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="text-cream/40 hover:text-cream transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Shop */}
          <div>
            <h4 className="font-mono-custom text-[10px] tracking-[0.2em] text-cream/30 uppercase mb-5">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-cream/50 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="font-mono-custom text-[10px] tracking-[0.2em] text-cream/30 uppercase mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-cream/50 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="font-mono-custom text-[10px] tracking-[0.2em] text-cream/30 uppercase mb-5">
              Stay in the leaf
            </h4>
            <p className="font-dm text-sm text-cream/40 font-light mb-4 leading-relaxed">
              Monthly drops, exclusive batches, rituals for the irreverent.
            </p>

            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono-custom text-xs text-matcha-light tracking-wider"
              >
                You&apos;re in the leaf. ✦
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="leaf-input flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-cream placeholder-cream/25 font-dm"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-matcha-core text-cream text-xs font-dm rounded hover:bg-matcha-core/80 transition-colors"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-custom text-[10px] text-cream/20 tracking-[0.15em]">
            © TOKUHĀ 2025
          </p>
          <p className="font-mono-custom text-[10px] text-cream/20 tracking-[0.15em]">
            MADE IN INDIA · SOURCED FROM JAPAN
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono-custom text-[10px] text-cream/20 hover:text-cream/40 transition-colors tracking-wider">
              Privacy
            </a>
            <a href="#" className="font-mono-custom text-[10px] text-cream/20 hover:text-cream/40 transition-colors tracking-wider">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
