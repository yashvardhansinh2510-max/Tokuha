import Hero from '@/components/home/Hero'
import FlavorSelector from '@/components/home/FlavorSelector'
import ProcessScroll from '@/components/home/ProcessScroll'
import ProductGrid from '@/components/home/ProductGrid'
import WhyTokuha from '@/components/home/WhyTokuha'
import Testimonials from '@/components/home/Testimonials'
import RitualLab from '@/components/home/RitualLab'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlavorSelector />
      <ProcessScroll />
      <ProductGrid />
      <WhyTokuha />
      <Testimonials />
      <RitualLab />
      <Newsletter />
    </>
  )
}
