'use client'

import { Link } from 'next-view-transitions'
import { LuArrowRight } from 'react-icons/lu'
import { ibm_plex_mono } from '@/fonts'

interface ViewAllLinkProps {
  href: string
  text?: string
}

export default function ViewAllLink({ href, text = 'View all' }: ViewAllLinkProps) {
  return (
    <Link
      href={href}
      className={`text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group flex items-center gap-1 ${ibm_plex_mono.className}`}
    >
      {text}
      <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
