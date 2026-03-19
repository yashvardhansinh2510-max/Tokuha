export type Packaging = 'tin' | 'pouch'
export type ProductSeries = 'infused' | 'ceremonial'

export interface Product {
  id: string
  slug: string
  code: string
  name: string
  series: ProductSeries
  tagline: string
  description: string
  flavorNotes: string[]
  price: { tin: number; pouch: number | null }
  weightG: number
  accentColor: string
  glowColor: string
  origin: string
  grade: string
  availablePackaging: Packaging[]
  badge?: string
  brewGuide?: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'strawberry-infused-matcha',
    code: 'TKH-STR-01',
    name: 'Strawberry Infused Matcha',
    series: 'infused',
    tagline: 'Sun-dried Uji matcha fused with Himalayan freeze-dried strawberries.',
    description:
      'Bright, berryed, zero grass. This is matcha for people who thought they hated matcha. The Himalayan strawberries bring a natural sweetness that lifts the umami base into something entirely new — tart, sun-warm, and completely addictive.',
    flavorNotes: ['Sweet berry', 'Umami base', 'Clean finish'],
    price: { tin: 699, pouch: 699 },
    weightG: 50,
    accentColor: '#E8524A',
    glowColor: 'rgba(232, 82, 74, 0.15)',
    origin: 'Uji, Kyoto',
    grade: 'Ceremonial',
    availablePackaging: ['tin', 'pouch'],
    brewGuide: [
      'Sift 2g of powder into your bowl',
      'Add 60ml water at 75°C (not boiling — never boiling)',
      'Whisk in a W-motion for 30 seconds until frothy',
      'Top with 100ml oat milk, iced or steamed',
      'No sweetener needed. Trust us.',
    ],
  },
  {
    id: '2',
    slug: 'lemonade-infused-matcha',
    code: 'TKH-LMN-02',
    name: 'Lemonade Infused Matcha',
    series: 'infused',
    tagline: 'Ceremonial-grade powder married to Sicilian lemon crystals.',
    description:
      'Tart. Alive. Effortlessly cool. Your iced matcha just grew up. Cold-pressed Sicilian lemon crystals fused at the molecular level into our Uji base — the result is a matcha that tastes like summer and focuses like ceremony.',
    flavorNotes: ['Citrus spark', 'Umami depth', 'Lingering brightness'],
    price: { tin: 699, pouch: 699 },
    weightG: 50,
    accentColor: '#F2C94C',
    glowColor: 'rgba(242, 201, 76, 0.15)',
    origin: 'Uji, Kyoto',
    grade: 'Ceremonial',
    availablePackaging: ['tin', 'pouch'],
    brewGuide: [
      'Sift 2g into a glass',
      'Add 30ml cold water and whisk to a paste',
      'Fill glass with ice',
      'Pour 150ml sparkling water over ice',
      'Finish with a squeeze of fresh lemon. Perfection.',
    ],
  },
  {
    id: '3',
    slug: 'rose-infused-matcha',
    code: 'TKH-RSE-03',
    name: 'Rose Infused Matcha',
    series: 'infused',
    tagline: 'Cold-process Kannauj rose petals meet single-origin Uji grade.',
    description:
      'Floral but never sweet. Meditative but never boring. The roses come from Kannauj — India\'s perfume capital — cold-processed to preserve every aromatic compound. This is the matcha you make when you want the world to slow down.',
    flavorNotes: ['Petal bloom', 'Earth base', 'Quiet elegance'],
    price: { tin: 699, pouch: 699 },
    weightG: 50,
    accentColor: '#E8A0B4',
    glowColor: 'rgba(232, 160, 180, 0.15)',
    origin: 'Uji, Kyoto',
    grade: 'Ceremonial',
    availablePackaging: ['tin', 'pouch'],
    brewGuide: [
      'Sift 1.5g into your bowl (lighter hand for rose)',
      'Add 70ml water at 70°C',
      'Whisk gently — let the rose bloom, not fight',
      'Serve as-is or with a splash of whole milk',
      'Optional: single dried rose petal as garnish',
    ],
  },
  {
    id: '4',
    slug: 'ceremonial-aaa-matcha',
    code: 'TKH-CER-04',
    name: 'Ceremonial AAA Matcha',
    series: 'ceremonial',
    tagline: 'First-harvest Uji shade-grown. Stone-milled the morning it ships.',
    description:
      'No ceremony required. Just the finest accessible matcha we could source. First-harvest tencha, shade-grown for 21 days to concentrate L-theanine and amino acids. Stone-milled on granite at 40g per hour. The way it\'s been done for 800 years.',
    flavorNotes: ['Vegetal depth', 'Creamy umami', 'Long finish'],
    price: { tin: 899, pouch: 899 },
    weightG: 50,
    accentColor: '#3D6B4F',
    glowColor: 'rgba(61, 107, 79, 0.2)',
    origin: 'Uji, Kyoto',
    grade: 'AAA Ceremonial',
    availablePackaging: ['tin', 'pouch'],
    brewGuide: [
      'Sift 2g into a warmed bowl',
      'Add 60ml water at 75°C',
      'Whisk vigorously in a W-motion for 30 seconds',
      'Drink immediately to catch the peak froth',
      'No milk. This one deserves to be experienced pure.',
    ],
  },
  {
    id: '5',
    slug: 'ceremonial-imperial-matcha',
    code: 'TKH-IMP-05',
    name: 'Ceremonial Imperial Matcha',
    series: 'ceremonial',
    tagline: 'Pre-harvest tencha from a single farm in Nishio. Reserved. Allocated.',
    description:
      'The apex. Pre-harvest tencha from a single farm in Nishio — reserved, allocated, and worth every rupee. The finest matcha available in India. Harvested 7 days before the official first flush, when the leaves are at their most concentrated, most complex, most alive.',
    flavorNotes: ['Intense umami', 'Silk texture', 'Complex sweetness'],
    price: { tin: 1299, pouch: null },
    weightG: 50,
    accentColor: '#C9A84C',
    glowColor: 'rgba(201, 168, 76, 0.15)',
    origin: 'Nishio, Aichi',
    grade: 'Imperial',
    availablePackaging: ['tin'],
    badge: 'Most Exclusive',
    brewGuide: [
      'Warm your best bowl with hot water, then discard',
      'Sift 1.5g — this is not a powder-heavy drink',
      'Add 50ml water at precisely 70°C',
      'Whisk for exactly 40 seconds',
      'Sit. Breathe. This is why you came here.',
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(currentId: string, count = 3): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, count)
}
