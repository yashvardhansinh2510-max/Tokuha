'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PowderBurst() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(61,107,79,0.4) 0%, transparent 70%)',
      }}
    />
  )
}

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowBurst(true)
      setTimeout(() => {
        setShowBurst(false)
        setSubscribed(true)
      }, 800)
    }
  }

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0D1F17 50%, #0A0A0A 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(61,107,79,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-custom text-[10px] tracking-[0.4em] text-cream/30 uppercase mb-4">
            The Leaf Letter
          </p>
          <h2
            className="font-cormorant font-light text-cream mb-4"
            style={{ fontSize: 'clamp(42px, 6vw, 80px)', letterSpacing: '-0.02em', lineHeight: '1' }}
          >
            Stay in the leaf.
          </h2>
          <p className="font-dm font-light text-cream/40 mb-10" style={{ fontSize: '16px', lineHeight: '1.7' }}>
            Monthly drops, exclusive batches, rituals for the irreverent.<br />
            No spam. Just matcha.
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-matcha-core/20 border border-matcha-core/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍵</span>
                </div>
                <p className="font-cormorant text-2xl font-light text-cream mb-1">
                  You&apos;re in the leaf.
                </p>
                <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest">
                  FIRST DROP COMING SOON
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 relative"
              >
                {showBurst && <PowderBurst />}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@ritual.com"
                  className="leaf-input flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-cream placeholder-cream/20 font-dm text-center sm:text-left"
                  required
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-8 py-4 bg-matcha-core hover:bg-matcha-core/80 text-cream font-dm text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-glow-green whitespace-nowrap"
                >
                  Join the Leaf
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!subscribed && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-mono-custom text-[9px] text-cream/15 tracking-widest mt-4"
            >
              UNSUBSCRIBE ANYTIME · NO SPAM EVER · JUST GOOD MATCHA
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
