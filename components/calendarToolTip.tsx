"use client"

import { useState } from 'react'

export type TooltipData = {
  x: number
  y: number
  content: string
}

export type TooltipState = TooltipData | null

export function useCalendarTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState>(null)

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>, count: number, date: string) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      content: `${count} contribution${count !== 1 ? 's' : ''} on ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    })
  }

  const onMouseLeave = () => {
    setTooltip(null)
  }

  return { tooltip, onMouseEnter, onMouseLeave }
}

export default function CalendarToolTip({ x, y, content }: TooltipData) {
  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap shadow-lg"
      style={{
        left: x,
        top: y - 8, // 8px Offset above the target
      }}
    >
      {content}
      {/* Layout arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
    </div>
  )
}