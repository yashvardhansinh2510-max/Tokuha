'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
}

interface ParticleCanvasProps {
  color?: string
  secondaryColor?: string
  count?: number
  className?: string
}

export default function ParticleCanvas({
  color = '#7BAF8E',
  secondaryColor = '#C9A84C',
  count = 45,
  className = '',
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const colorRef = useRef(color)
  const secondaryColorRef = useRef(secondaryColor)

  // Update color refs when props change
  useEffect(() => {
    colorRef.current = color
    secondaryColorRef.current = secondaryColor
  }, [color, secondaryColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }
    resize()

    const createParticle = (): Particle => ({
      x: Math.random() * (canvas.width || 800),
      y: (canvas.height || 600) + Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.6 + 0.2),
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.7 ? secondaryColorRef.current : colorRef.current,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
    })

    particlesRef.current = Array.from({ length: count }, createParticle).map((p) => ({
      ...p,
      y: Math.random() * (canvas.height || 600),
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p, i) => {
        p.y += p.speedY
        p.x += p.speedX
        p.rotation += p.rotationSpeed

        // Use current color refs for smooth transition
        const isSecondary = i % 5 === 0
        const currentColor = isSecondary ? secondaryColorRef.current : colorRef.current

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        // Draw a tiny diamond/square
        ctx.fillStyle = currentColor
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)

        ctx.restore()

        // Reset particle when it goes off screen
        if (p.y < -20) {
          particlesRef.current[i] = createParticle()
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${className}`}
      style={{ willChange: 'transform' }}
    />
  )
}
