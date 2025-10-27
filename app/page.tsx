import { poppins, inter } from '@/fonts'

export default function Home() {
  return (
    <div>
      <h1 className={`text-xl font-bold mb-4 ${poppins.className}`}>
        Swapnaneel
      </h1>
      <div className={`${inter.className}`}>
        engineer, idealist and always learning
      </div>
    </div>
  )
}
