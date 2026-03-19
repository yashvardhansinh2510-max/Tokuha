import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        ink: '#111111',
        'matcha-core': '#3D6B4F',
        'matcha-light': '#7BAF8E',
        cream: '#F5F0E8',
        gold: '#C9A84C',
        strawberry: '#E8524A',
        lemonade: '#F2C94C',
        rose: '#E8A0B4',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(60px, 8vw, 120px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(42px, 6vw, 90px)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(32px, 4vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(24px, 3vw, 48px)', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-dark': 'radial-gradient(ellipse at 20% 50%, #1A2E23 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #0D1F17 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, #111111 0%, transparent 60%)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'float-up': 'float-up 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'badge-bounce': 'badge-bounce 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'noise-drift': 'noise-drift 8s steps(10) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'badge-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'noise-drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-5%, -5%)' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 40px rgba(61, 107, 79, 0.3)',
        'glow-gold': '0 0 40px rgba(201, 168, 76, 0.3)',
        'glow-red': '0 0 40px rgba(232, 82, 74, 0.3)',
        'glow-yellow': '0 0 40px rgba(242, 201, 76, 0.3)',
        'glow-rose': '0 0 40px rgba(232, 160, 180, 0.3)',
        'card-lift': '0 20px 60px rgba(0,0,0,0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
