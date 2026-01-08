import Image from "next/image"
import Link from "next/link"
import { siteMetadata } from "@/utils/siteMetadata"
import { poppins } from "@/fonts"
import { SiGithub, SiLinkedin } from "react-icons/si"
import { LuFileText } from "react-icons/lu"

export default function HeroSection() {
  return (
    <section className="mb-12" id="top">
      <div className="flex items-start gap-5 mb-8">
        <Image
          src="https://github.com/thisisrick25.png"
          alt="Swapnaneel Patra"
          width={88}
          height={88}
          className="profile-image"
          priority
        />
        <div>
          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-1 ${poppins.className}`}>
            Swapnaneel Patra
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            M.Tech at IIT Patna · AI & Data Science
          </p>
        </div>
      </div>

      <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
        AI/ML grad student at IIT Patna. Open source contributor.
      </p>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <SiGithub className="w-4 h-4" />
          GitHub
        </Link>
        <Link
          href={siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <SiLinkedin className="w-4 h-4" />
          LinkedIn
        </Link>
        <Link
          href={siteMetadata.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <LuFileText className="w-4 h-4" />
          CV
        </Link>
      </div>
    </section>
  )
}
