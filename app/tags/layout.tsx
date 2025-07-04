export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='grid grid-col-1'>
      {children}
    </div>
  )
}