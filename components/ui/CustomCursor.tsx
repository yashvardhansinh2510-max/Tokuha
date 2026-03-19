'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Cursor follows instantly
      cursor.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px)`

      // Ring follows with lag
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12
      ring.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px)`

      rafId = requestAnimationFrame(animate)
    }

    const onMouseEnterInteractive = () => {
      document.body.classList.add('cursor-hover')
    }

    const onMouseLeaveInteractive = () => {
      document.body.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    // Apply hover state to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    // Observe DOM changes to add listeners to new interactive elements
    const observer = new MutationObserver(() => {
      const newInteractive = document.querySelectorAll('a, button, [role="button"]')
      newInteractive.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
