import Link from "next/link"
import { usePathname } from 'next/navigation'

import { HEADER_LINKS } from '@/config/links'
import ThemeSwitch from "./themeSwitch"

export default function Navbar() {
  // const pathname = usePathname()

  return (
    <nav className="grid grid-cols-5 px-8 justify-items-center ">
      {
        HEADER_LINKS.map((link) => (
          <Link
            className=""
            key={link.href}
            href={link.href}
          >
            {link.text}
          </Link>
        ))
      }
      <>
      <ThemeSwitch />
      </>
    </nav>
  )
}
