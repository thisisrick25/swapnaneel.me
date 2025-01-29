// import Link from "next/link"
import { Link } from "next-view-transitions"
import { HEADER_LINKS } from '@/config/links'
import ThemeSwitch from "./themeSwitch"

export default function Header() {
  return (
    <header className='w-1/4 h-full fixed z-20 right-0 top-0 flex flex-col justify-center '>

        <nav className="flex flex-col space-y-4">
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
          <ThemeSwitch />
        </nav>
    </header>
  )
}