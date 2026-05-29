"use client"

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface ShinyCardProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  spotlightColor?: string
}

/**
 * ShinyCard - A card component with cursor-following shine effect
 * Inspired by GitHub card styles and ReactBits spotlight card effect
 */
export default function ShinyCard({
  children,
  className = '',
  containerClassName = '',
  spotlightColor = 'rgba(59, 130, 246, 0.6)',
}: ShinyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  // 3D Tilt values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Map position to rotation limits (-7 to 7 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    setPosition({
      x: mouseX,
      y: mouseY,
    })
    
    // Tilt calculations
    const width = rect.width
    const height = rect.height
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => setOpacity(1)
  
  const handleMouseLeave = () => {
    setOpacity(0)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Blue spotlight gradient effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className={`relative ${className}`} style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
