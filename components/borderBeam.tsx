import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface BorderBeamProps {
  children: ReactNode
  /** Whether the beam is active/visible */
  active?: boolean
  /** Additional classes for the outer container */
  className?: string
  /** Duration of one full rotation in seconds (default: 3) */
  duration?: number
}

/**
 * BorderBeam - A reusable animated border beam component with rounded-full styling
 * 
 * Wraps children with an animated meteor/comet beam border effect.
 * Always uses pill-shaped (rounded-full) borders.
 * 
 * @example
 * ```tsx
 * <BorderBeam active={isSelected}>
 *   <button>Click me</button>
 * </BorderBeam>
 * ```
 */
export default function BorderBeam({
  children,
  active = true,
  className = '',
  duration = 3,
}: BorderBeamProps) {
  if (!active) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative rounded-full ${className}`}>
      {/* Rotating glow that follows the beam head */}
      <motion.span
        className="absolute -inset-3 rounded-full opacity-50 blur-lg"
        initial={{ "--border-beam-angle": "0deg" } as any}
        animate={{ "--border-beam-angle": "360deg" } as any}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          background: 'conic-gradient(from var(--border-beam-angle), transparent 0%, transparent 5%, #3b82f6 25%, #8b5cf6 50%, #e879f9 75%, #f472b6 93%, transparent 100%)',
        }}
      />
      {/* Animated gradient border with bright meteor head */}
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={{ "--border-beam-angle": "0deg" } as any}
        animate={{ "--border-beam-angle": "360deg" } as any}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          background: 'conic-gradient(from var(--border-beam-angle), transparent 0%, transparent 5%, #3b82f6 20%, #60a5fa 35%, #a78bfa 50%, #c084fc 65%, #e879f9 78%, #f472b6 88%, #ec4899 96%, transparent 100%)',
        }}
      />
      {/* Inner background */}
      <span className="absolute inset-0.5 rounded-full bg-gray-900 dark:bg-white" />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
