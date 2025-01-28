import Navbar from './navbar'

export default function Header() {
  return (
    <header className='w-full sticky z-20 top-0 grid grid-cols-2 justify-between py-3 bg-white/30 dark:bg-black/30 backdrop-filter backdrop-saturate-150 backdrop-blur-lg mb-12'>
      <div className='self-center'>
        <Navbar />
      </div>
    </header>
  )
}