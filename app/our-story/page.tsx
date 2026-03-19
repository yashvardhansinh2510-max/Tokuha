import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story — Tokuhā Matcha',
  description: 'The story of how Tokuhā was born — premium Japanese matcha, made for India.',
}

const timeline = [
  {
    year: '2021',
    title: 'The Bitterness',
    content:
      'It started with a disappointing cup. Our founder Aryan — a matcha obsessive — bought what was marketed as "ceremonial grade" from an Indian wellness brand. It tasted like grass clippings. He knew there was better matcha in the world. He just needed to find it.',
  },
  {
    year: '2022',
    title: 'Uji, First Trip',
    content:
      'Six months of correspondence, two flights, and one taxi ride through Kyoto\'s fog later, Aryan found himself in a third-generation tea farm in Uji. He tasted shade-grown tencha straight from the mill. That was the moment. That was the standard.',
  },
  {
    year: '2023',
    title: 'The Infusion Problem',
    content:
      'Bringing pure ceremonial matcha to India was step one. But the vision was bigger — matcha that could be indulgent. That tasted like a dessert and performed like a ritual. The infusion technology took 18 months to perfect. Freeze-drying at -50°C. No heat. No compromise.',
  },
  {
    year: '2024',
    title: 'Tokuhā is Born',
    content:
      'トクハ — Special Leaf. Five expressions. Two series. One standard. Tokuhā launched to a waitlist of 3,000 people who believed, as we do, that matcha in India deserved better.',
  },
  {
    year: '2025',
    title: 'Unchained',
    content:
      'Today, every tin ships within 24 hours of milling. Every batch is source-verified. Every rupee you spend goes toward building a future where the best matcha in the world is accessible, indulgent, and unapologetically Indian.',
  },
]

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Hero */}
      <div
        className="relative min-h-[70vh] flex items-end pt-28 pb-20"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(61,107,79,0.12) 0%, transparent 60%), #0A0A0A',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 w-full">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-6">
            The Story
          </p>
          <h1
            className="font-cormorant font-light text-cream mb-8"
            style={{
              fontSize: 'clamp(52px, 8vw, 110px)',
              letterSpacing: '-0.02em',
              lineHeight: '0.95',
            }}
          >
            We didn&apos;t<br />
            <em className="italic">invent</em> matcha.<br />
            We freed it.
          </h1>
          <p
            className="font-dm font-light text-cream/40 max-w-xl"
            style={{ fontSize: '18px', lineHeight: '1.8' }}
          >
            Tokuhā was built on one belief: Indians deserve the same access to the world&apos;s finest matcha as anyone else.
            And they deserve it to taste extraordinary — not like obligation.
          </p>
        </div>
      </div>

      {/* Pull quote */}
      <div className="border-y border-white/5 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="font-cormorant italic font-light text-cream/70"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: '1.4' }}
          >
            &ldquo;The word for a mediocre cup of matcha is not
            &lsquo;an acquired taste.&rsquo; It&apos;s just a bad cup of matcha.&rdquo;
          </p>
          <p className="font-mono-custom text-[10px] text-cream/25 tracking-widest mt-6">
            — ARYAN MEHTA, FOUNDER
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-cream/30 uppercase mb-16 text-center">
            How We Got Here
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-16 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(61,107,79,0.3) 20%, rgba(61,107,79,0.3) 80%, transparent)' }}
            />

            <div className="flex flex-col gap-16">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-12">
                  {/* Year */}
                  <div className="flex-shrink-0 w-14 text-right">
                    <p
                      className="font-mono-custom text-[10px] tracking-widest"
                      style={{ color: 'rgba(61,107,79,0.7)' }}
                    >
                      {item.year}
                    </p>
                    {/* Dot */}
                    <div
                      className="w-2 h-2 rounded-full ml-auto mt-2 relative -right-[34px]"
                      style={{ background: i === timeline.length - 1 ? '#3D6B4F' : 'rgba(61,107,79,0.4)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <h3
                      className="font-cormorant font-light text-cream mb-3"
                      style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-dm font-light text-cream/45 leading-relaxed" style={{ fontSize: '15px' }}>
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second pull quote */}
      <div
        className="py-24"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0D1F17 50%, #0A0A0A 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="font-cormorant italic font-light text-cream/70 mb-8"
            style={{ fontSize: 'clamp(22px, 3vw, 38px)', lineHeight: '1.5' }}
          >
            &ldquo;Every tin that leaves our facility is a small act of defiance
            against mediocrity. We take that seriously.&rdquo;
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { number: '5', label: 'Expressions' },
              { number: '2', label: 'Origins' },
              { number: '24h', label: 'Ship window' },
              { number: '4,200+', label: 'Rituals served' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <p
                  className="font-cormorant font-light text-cream"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.02em' }}
                >
                  {number}
                </p>
                <p className="font-mono-custom text-[9px] text-cream/25 tracking-widest mt-1">
                  {label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center border-t border-white/5">
        <p className="font-cormorant text-2xl font-light text-cream mb-6">
          Ready to begin your ritual?
        </p>
        <a
          href="/products"
          className="inline-block px-10 py-4 bg-matcha-core text-cream font-dm text-sm font-medium rounded-xl hover:bg-matcha-core/80 transition-all duration-300 hover:shadow-glow-green"
        >
          Shop the Collection
        </a>
      </div>
    </div>
  )
}
