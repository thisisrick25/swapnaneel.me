export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='grid grid-col-1 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto px-4 sm:px-6 xl:px-0 gap-10 sm:gap-14'>
      {children}
    </div>
  )
}