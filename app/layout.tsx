import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/cart/CartContext'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/ui/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import CustomCursor from '@/components/ui/CustomCursor'
import ExitIntent from '@/components/ui/ExitIntent'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Tokuhā — Matcha, Unchained.',
  description:
    'Premium Indian DTC matcha. Five expressions. Zero compromise. Free from the grass, faithful to the ritual.',
  openGraph: {
    title: 'Tokuhā — Matcha, Unchained.',
    description: 'Five expressions of ceremonial-grade matcha. Born in Kyoto. Made for India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian text-cream antialiased">
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <ExitIntent />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#F5F0E8',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
