'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number // delay in ms
  className?: string
  noTransform?: boolean // Use opacity only (for components with fixed-position tooltips)
}

export default function FadeIn({ children, delay = 0, className = '', noTransform = true }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Only animate once
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const style = noTransform
    ? {
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.6s ease-out ${delay}ms`,
    }
    : {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
