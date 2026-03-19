'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExitIntent() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('tokuha-exit-seen')
    if (hasSeenPopup) return

    let triggered = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered && !dismissed) {
        triggered = true
        setShow(true)
        sessionStorage.setItem('tokuha-exit-seen', '1')
      }
    }

    // Only add on desktop
    if (window.innerWidth >= 768) {
      const timer = setTimeout(() => {
        document.addEventListener('mouseleave', handleMouseLeave)
      }, 3000)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [dismissed])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setShow(false)
        setDismissed(true)
      }, 2000)
    }
  }

  const handleClose = () => {
    setShow(false)
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99000] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-ink border border-white/10 rounded-2xl p-10 max-w-md w-full text-center"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(61,107,79,0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-cream/30 hover:text-cream transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="w-12 h-12 rounded-full bg-matcha-core/10 border border-matcha-core/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🍵</span>
            </div>

            {!submitted ? (
              <>
                <h3 className="font-cormorant text-3xl font-light text-cream mb-2">
                  Wait — one last thing.
                </h3>
                <p className="font-dm text-sm text-cream/50 mb-1">
                  Here&apos;s 10% off your first ritual.
                </p>
                <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest mb-8">
                  No strings. Just matcha.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="leaf-input w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-cream placeholder-cream/25 font-dm text-center"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-matcha-core hover:bg-matcha-core/80 text-cream rounded-lg font-dm text-sm font-medium transition-colors"
                  >
                    Claim my 10% off
                  </button>
                </form>

                <button
                  onClick={handleClose}
                  className="mt-4 font-mono-custom text-[10px] text-cream/20 hover:text-cream/40 transition-colors tracking-widest"
                >
                  No thanks, I prefer paying full price
                </button>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <p className="font-cormorant text-3xl font-light text-cream mb-2">You&apos;re in.</p>
                <p className="font-dm text-sm text-cream/50">
                  Check your inbox for your code.
                </p>
                <p className="font-mono-custom text-matcha-light text-sm mt-4 tracking-wider">
                  LEAF10
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
