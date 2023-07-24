import Link from 'next/link'
import Navbar from './navbar'
import { HomeLogo } from './homeLogo'

export default function Header() {
  return (
    <header className='w-full sticky z-20 top-0 grid grid-cols-6 justify-between py-3 bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 border-b border-gray-200 dark:border-neutral-700 backdrop-filter backdrop-saturate-150 backdrop-blur-lg'>
      <Link
        href='/'
        className='col-start-2 justify-self-start'
        aria-label='Homepage'
      >
        <HomeLogo />
      </Link>
      <div className='col-span-2 col-end-6 self-center'>
        <Navbar />
      </div>
    </header>
  )
}