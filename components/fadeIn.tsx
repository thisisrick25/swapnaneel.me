'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

interface FadeInProps {
  children: ReactNode
  delay?: number // delay in seconds
  className?: string
}

export default function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing (similar to ease-out)
      }}
    >
      {children}
    </motion.div>
  )
}
