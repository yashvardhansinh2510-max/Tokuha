'use client'

import { motion } from 'framer-motion'

const rows = [
  {
    label: 'Source Grade',
    regular: 'Culinary / unknown',
    others: 'Ceremonial (marketed)',
    tokuha: 'Verified AAA–Imperial',
  },
  {
    label: 'Infusion Method',
    regular: 'None',
    others: 'Artificial flavouring',
    tokuha: 'Freeze-dried at -50°C',
  },
  {
    label: 'Flavour Profile',
    regular: 'Bitter, grassy',
    others: 'Synthetic sweetness',
    tokuha: 'Complex, indulgent, clean',
  },
  {
    label: 'Freshness',
    regular: 'Unknown mill date',
    others: 'Months in warehouse',
    tokuha: 'Stone-milled, ships in 24h',
  },
  {
    label: 'Indian Availability',
    regular: 'Rarely found',
    others: 'Limited options',
    tokuha: 'Born for India',
  },
]

export default function WhyTokuha() {
  return (
    <section className="py-24" style={{ background: '#0D0D0D' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-3">
            Why Tokuhā
          </p>
          <h2
            className="font-cormorant font-light text-cream"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em', lineHeight: '1' }}
          >
            The Honest Table.
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            {/* Header row */}
            <thead>
              <tr>
                <th className="text-left pb-5 pr-4 font-mono-custom text-[9px] tracking-[0.2em] text-cream/20 uppercase w-1/4">
                  Criterion
                </th>
                <th className="text-left pb-5 px-4 font-mono-custom text-[9px] tracking-[0.2em] text-cream/20 uppercase w-1/4">
                  Regular Matcha
                </th>
                <th className="text-left pb-5 px-4 font-mono-custom text-[9px] tracking-[0.2em] text-cream/20 uppercase w-1/4">
                  Other Brands
                </th>
                <th
                  className="text-left pb-5 px-4 font-mono-custom text-[9px] tracking-[0.2em] uppercase w-1/4"
                  style={{ color: '#7BAF8E' }}
                >
                  Tokuhā
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/5"
                >
                  <td className="py-4 pr-4">
                    <span className="font-dm text-sm font-light text-cream/60">
                      {row.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-dm text-sm font-light text-cream/25">
                      {row.regular}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-dm text-sm font-light text-cream/25">
                      {row.others}
                    </span>
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ borderLeft: '2px solid rgba(61,107,79,0.3)', background: 'rgba(61,107,79,0.04)' }}
                  >
                    <span className="font-dm text-sm font-medium text-cream">
                      {row.tokuha}
                    </span>
                    <span className="ml-2 text-matcha-light text-xs">✓</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-cormorant italic text-cream/30 text-lg mt-10"
        >
          &ldquo;No compromises. No apologies.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
