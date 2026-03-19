import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/products'
import ProductDetail from '@/components/product/ProductDetail'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Tokuhā Matcha`,
    description: product.tagline,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
