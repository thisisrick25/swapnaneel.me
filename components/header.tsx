import Navbar from './navbar'

export default function Header() {
  return (
    <header className='w-1/4 h-full fixed z-20 right-0 top-0 flex flex-col justify-center py-3'>
      <div className='self-center'>
        <Navbar />
      </div>
    </header>
  )
}