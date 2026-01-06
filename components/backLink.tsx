'use client'

import { Link } from 'next-view-transitions'
import { LuArrowLeft } from 'react-icons/lu'
import { ibm_plex_mono } from '@/fonts'

interface BackLinkProps {
  href?: string
  text?: string
  className?: string
}

export default function BackLink({ href = '/', text = 'Back to home', className = 'mb-6' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 group ${ibm_plex_mono.className} ${className}`}
    >
      <LuArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      {text}
    </Link>
  )
}
