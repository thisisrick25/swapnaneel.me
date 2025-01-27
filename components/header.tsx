import Link from 'next/link'
import Navbar from './navbar'
import { HomeLogo } from './homeLogo'

export default function Header() {
  return (
    <header className='w-full sticky z-20 top-0 grid grid-cols-2 justify-between py-3 bg-white/30 dark:bg-black/30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg mb-12'>
      <Link
        href='/' aria-label='Homepage'>
        <HomeLogo />
      </Link>
      <div className='self-center'>
        <Navbar />
      </div>
    </header>
  )
}