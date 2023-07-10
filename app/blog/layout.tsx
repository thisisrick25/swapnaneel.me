export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-3">{children}</section>
  )
}