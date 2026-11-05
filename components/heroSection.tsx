import Link from "next/link"
import Image from "next/image"
import { siteMetadata } from "@/utils/siteMetadata"
import { space_grotesk } from "@/fonts"
import { LuArrowUpRight } from "react-icons/lu"

const HERO_LINKS = [
  { href: siteMetadata.github, label: "GitHub" },
  { href: siteMetadata.gitlab, label: "GitLab" },
  { href: siteMetadata.linkedin, label: "LinkedIn" },
  { href: siteMetadata.resume, label: "Resume" },
] as const

export default function HeroSection() {
  return (
    <section className="mb-12" id="top">
      <div className="flex items-start gap-5 mb-8">
        <Image
          src="/avatar.svg"
          alt="Me"
          width={88}
          height={88}
          className="profile-image"
          priority
        />
        <div>
          <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-1 ${space_grotesk.className}`}>
            Swapnaneel Patra
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            M.Tech at IIT Patna · AI & Data Science
          </p>
        </div>
      </div>

      <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
        AI/ML grad student at IIT Patna building practical tools with data, machine learning, and open source.
      </p>

      {/* External profiles */}
      <div className="flex flex-wrap gap-5 mt-4">
        {HERO_LINKS.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            {label}
            <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  )
}
