'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/lib/products'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/lib/utils'
import { toast } from 'sonner'

const milks = ['Oat Milk', 'Almond Milk', 'Whole Milk', 'Water (Traditional)']
const temps = ['Hot (75°C)', 'Iced', 'Cold Brew (8h)']

const recipeMap: Record<string, Record<string, Record<string, string[]>>> = {
  'strawberry-infused-matcha': {
    'Oat Milk': {
      'Hot (75°C)': [
        'Sift 2g Strawberry Matcha into a warmed bowl',
        'Add 60ml water at 75°C, whisk until frothy',
        'Steam 120ml oat milk to 65°C',
        'Pour milk over matcha — watch the swirl happen',
        'No sugar needed. The strawberry does the work.',
      ],
      Iced: [
        'Sift 2g into a glass with a dash of cold water',
        'Whisk to a paste — no lumps',
        'Load the glass with ice',
        'Pour 150ml cold oat milk slowly over the ice',
        'Stir once. Photograph it. Then drink it.',
      ],
      'Cold Brew (8h)': [
        'Mix 1.5g Strawberry Matcha with 200ml cold oat milk',
        'Whisk until fully dissolved',
        'Refrigerate for 8 hours (overnight is ideal)',
        'The strawberry matures into something extraordinary',
        'Serve over ice. No sweeter morning exists.',
      ],
    },
    'Whole Milk': {
      'Hot (75°C)': ['Sift 2g matcha', 'Whisk with 60ml hot water', 'Steam 120ml whole milk', 'Combine and enjoy'],
      Iced: ['Paste the matcha with cold water', 'Add ice and 150ml cold whole milk', 'Stir and serve'],
      'Cold Brew (8h)': ['Mix with 200ml cold whole milk', 'Refrigerate overnight', 'Serve cold'],
    },
    'Almond Milk': {
      'Hot (75°C)': ['Sift 2g and whisk with hot water', 'Warm almond milk gently', 'Combine — slightly nuttier profile'],
      Iced: ['Paste, add ice, pour almond milk', 'The nuttiness pairs beautifully with strawberry'],
      'Cold Brew (8h)': ['Cold brew with almond milk — 8h refrigerate'],
    },
    'Water (Traditional)': {
      'Hot (75°C)': ['Sift 2g', 'Add 80ml at 75°C', 'Whisk vigorously in W-motion', 'Drink immediately, pure'],
      Iced: ['Double the matcha to 2.5g', 'Whisk with 40ml water', 'Pour over heavy ice'],
      'Cold Brew (8h)': ['1g matcha in 200ml cold water', 'Steep 8h in fridge', 'The gentlest way to know this matcha'],
    },
  },
}

function getRecipe(productSlug: string, milk: string, temp: string): string[] {
  const productRecipes = recipeMap[productSlug]
  if (productRecipes?.[milk]?.[temp]) {
    return productRecipes[milk][temp]
  }
  // Generic fallback
  const isIced = temp === 'Iced'
  const isColdBrew = temp === 'Cold Brew (8h)'
  const product = products.find((p) => p.slug === productSlug)
  return [
    `Sift ${isColdBrew ? '1.5' : '2'}g ${product?.name ?? 'matcha'} into your vessel`,
    isIced ? 'Whisk with 30ml cold water to a smooth paste' : `Whisk with 60ml water at ${temp.includes('75') ? '75°C' : '80°C'}`,
    isColdBrew ? `Add 200ml ${milk} and refrigerate for 8 hours` : `Add ${milk === 'Water (Traditional)' ? 'no milk — drink pure' : `120ml ${milk}`}`,
    isIced ? 'Pour over ice' : '',
    'Close your eyes on the first sip.',
  ].filter(Boolean)
}

export default function RitualLab() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedMilk, setSelectedMilk] = useState(milks[0])
  const [selectedTemp, setSelectedTemp] = useState(temps[0])
  const [showRecipe, setShowRecipe] = useState(false)
  const [mixing, setMixing] = useState(false)
  const { addItem } = useCart()

  const recipe = getRecipe(selectedProduct.slug, selectedMilk, selectedTemp)

  const handleBrew = () => {
    setMixing(true)
    setTimeout(() => {
      setMixing(false)
      setShowRecipe(true)
    }, 1200)
  }

  const handleAddCombo = () => {
    addItem(selectedProduct, selectedProduct.availablePackaging[0])
    toast.success(`🍵 ${selectedProduct.name} added for your ritual`, {
      style: {
        background: '#111111',
        border: `1px solid ${selectedProduct.accentColor}30`,
        borderLeft: `3px solid ${selectedProduct.accentColor}`,
        color: '#F5F0E8',
      },
    })
  }

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
            Interactive
          </p>
          <h2
            className="font-cormorant font-light text-cream"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em', lineHeight: '1' }}
          >
            The Ritual Lab.
          </h2>
          <p className="font-dm text-sm text-cream/40 mt-3">
            Build your perfect cup. We&apos;ll tell you exactly how.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Builder */}
          <div className="flex flex-col gap-6">
            {/* Step 1: Choose matcha */}
            <div>
              <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest mb-4 uppercase">
                01 · Choose your matcha
              </p>
              <div className="grid grid-cols-1 gap-2">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => { setSelectedProduct(product); setShowRecipe(false) }}
                    className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200"
                    style={{
                      borderColor: selectedProduct.id === product.id ? product.accentColor : 'rgba(255,255,255,0.06)',
                      background: selectedProduct.id === product.id ? `${product.accentColor}08` : 'rgba(17,17,17,0.5)',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ background: product.accentColor }}
                    />
                    <span className="font-dm text-sm text-cream/70">{product.name}</span>
                    <span className="font-mono-custom text-[9px] text-cream/20 ml-auto">
                      {formatPrice(product.price.tin)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Milk */}
            <div>
              <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest mb-4 uppercase">
                02 · Choose your milk
              </p>
              <div className="grid grid-cols-2 gap-2">
                {milks.map((milk) => (
                  <button
                    key={milk}
                    onClick={() => { setSelectedMilk(milk); setShowRecipe(false) }}
                    className="p-3 rounded-xl border font-dm text-sm transition-all duration-200 text-left"
                    style={{
                      borderColor: selectedMilk === milk ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)',
                      background: selectedMilk === milk ? 'rgba(255,255,255,0.05)' : 'rgba(17,17,17,0.5)',
                      color: selectedMilk === milk ? '#F5F0E8' : 'rgba(245,240,232,0.4)',
                    }}
                  >
                    {milk}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Temperature */}
            <div>
              <p className="font-mono-custom text-[10px] text-cream/30 tracking-widest mb-4 uppercase">
                03 · Choose temperature
              </p>
              <div className="grid grid-cols-3 gap-2">
                {temps.map((temp) => (
                  <button
                    key={temp}
                    onClick={() => { setSelectedTemp(temp); setShowRecipe(false) }}
                    className="p-3 rounded-xl border font-dm text-xs transition-all duration-200 text-center"
                    style={{
                      borderColor: selectedTemp === temp ? selectedProduct.accentColor : 'rgba(255,255,255,0.06)',
                      background: selectedTemp === temp ? `${selectedProduct.accentColor}10` : 'rgba(17,17,17,0.5)',
                      color: selectedTemp === temp ? selectedProduct.accentColor : 'rgba(245,240,232,0.4)',
                    }}
                  >
                    {temp.split(' ')[0]}
                    <br />
                    <span className="text-[10px] opacity-60">
                      {temp.includes('(') ? temp.match(/\(([^)]+)\)/)?.[1] : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brew button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBrew}
              disabled={mixing}
              className="w-full py-4 rounded-xl font-dm text-sm font-medium text-cream transition-all duration-300 relative overflow-hidden"
              style={{ background: selectedProduct.accentColor }}
            >
              {mixing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⚗
                  </motion.span>
                  Brewing your ritual...
                </span>
              ) : (
                'Generate My Ritual'
              )}
            </motion.button>
          </div>

          {/* Right: Recipe output */}
          <div>
            <AnimatePresence mode="wait">
              {showRecipe ? (
                <motion.div
                  key="recipe"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-8 border"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProduct.accentColor}08, rgba(17,17,17,0.9))`,
                    border: `1px solid ${selectedProduct.accentColor}20`,
                  }}
                >
                  {/* Recipe header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${selectedProduct.accentColor}20` }}
                    >
                      <span style={{ color: selectedProduct.accentColor }}>⚗</span>
                    </div>
                    <div>
                      <p className="font-cormorant text-xl font-light text-cream">
                        Your Ritual
                      </p>
                      <p className="font-mono-custom text-[9px] text-cream/30 tracking-wider">
                        {selectedProduct.name} · {selectedMilk} · {selectedTemp.split(' ')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Steps */}
                  <ol className="flex flex-col gap-4">
                    {recipe.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex gap-4"
                      >
                        <span
                          className="font-mono-custom text-[10px] mt-1 flex-shrink-0 opacity-40"
                          style={{ color: selectedProduct.accentColor }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="font-dm text-sm text-cream/70 leading-relaxed">{step}</p>
                      </motion.li>
                    ))}
                  </ol>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="font-mono-custom text-[10px] text-cream/25 tracking-wider mb-4">
                      Don&apos;t have {selectedProduct.name}?
                    </p>
                    <button
                      onClick={handleAddCombo}
                      className="w-full py-3 rounded-lg border font-dm text-sm text-cream transition-all duration-200 hover:border-opacity-60"
                      style={{ border: `1px solid ${selectedProduct.accentColor}40`, background: `${selectedProduct.accentColor}08` }}
                    >
                      Add {selectedProduct.name} to Bag — {formatPrice(selectedProduct.price.tin)}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-80 text-center p-8"
                  style={{ background: 'rgba(17,17,17,0.5)' }}
                >
                  <motion.div
                    animate={mixing ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
                    transition={mixing ? { duration: 1, repeat: Infinity } : {}}
                    className="text-4xl mb-4 opacity-30"
                  >
                    ⚗
                  </motion.div>
                  <p className="font-cormorant italic text-cream/30 text-xl">
                    Your ritual awaits.
                  </p>
                  <p className="font-mono-custom text-[10px] text-cream/15 tracking-wider mt-2">
                    Configure and generate above
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
