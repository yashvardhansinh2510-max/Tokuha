'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "I've been a matcha snob for 5 years. I threw away every other tin in my cabinet after the Imperial arrived.",
    name: 'Priya M.',
    city: 'Mumbai',
    stars: 5,
    product: 'Ceremonial Imperial',
    accentColor: '#C9A84C',
  },
  {
    quote: "The Strawberry one? My entire office is obsessed. We order it in bulk now. Zero grass, all vibe.",
    name: 'Arjun S.',
    city: 'Bangalore',
    stars: 5,
    product: 'Strawberry Infused',
    accentColor: '#E8524A',
  },
  {
    quote: "Finally. Matcha that doesn't taste like a lawn. The Lemonade version iced is my summer personality.",
    name: 'Kavya R.',
    city: 'Delhi',
    stars: 5,
    product: 'Lemonade Infused',
    accentColor: '#F2C94C',
  },
  {
    quote: "The Rose Matcha is the most meditative thing I've put in my body. And I meditate every day.",
    name: 'Nisha P.',
    city: 'Chennai',
    stars: 5,
    product: 'Rose Infused',
    accentColor: '#E8A0B4',
  },
  {
    quote: "Ceremonial AAA is legit what they sell at Kyoto tea houses. At ₹899 for 50g, it's a steal.",
    name: 'Rahul K.',
    city: 'Pune',
    stars: 5,
    product: 'Ceremonial AAA',
    accentColor: '#3D6B4F',
  },
  {
    quote: "Dispatched the same day, arrived fresh. I could smell it before I opened the box. This is what matcha should be.",
    name: 'Ananya T.',
    city: 'Hyderabad',
    stars: 5,
    product: 'Ceremonial Imperial',
    accentColor: '#C9A84C',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#C9A84C">
          <path d="M5 0.5L6.27 3.5H9.5L6.89 5.61L7.85 8.77L5 6.97L2.15 8.77L3.11 5.61L0.5 3.5H3.73L5 0.5Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-obsidian overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-3">
            Social Proof
          </p>
          <h2
            className="font-cormorant font-light text-cream"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em', lineHeight: '1' }}
          >
            The People Have Spoken.
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="masonry-item"
            >
              <div
                className="rounded-2xl p-6 border"
                style={{
                  background: `linear-gradient(135deg, ${t.accentColor}06, rgba(17,17,17,0.8))`,
                  border: `1px solid ${t.accentColor}15`,
                }}
              >
                {/* Stars */}
                <StarRating count={t.stars} />

                {/* Quote */}
                <p
                  className="font-cormorant italic font-light text-cream/80 leading-relaxed mt-4 mb-5"
                  style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-dm text-sm text-cream/60 font-medium">{t.name}</p>
                    <p className="font-mono-custom text-[9px] text-cream/25 tracking-wider">{t.city}</p>
                  </div>
                  <div>
                    <span
                      className="font-mono-custom text-[9px] tracking-wider px-2 py-1 rounded-full"
                      style={{
                        color: t.accentColor,
                        background: `${t.accentColor}12`,
                        border: `1px solid ${t.accentColor}25`,
                      }}
                    >
                      {t.product}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
