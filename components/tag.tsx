import Link from "next/link"
import githubSlugger from "github-slugger"
import { poppins } from "@/fonts"

interface Tag {
  tags: string[]
}

export default function Tag({ tags }: Tag) {
  const slugger = new githubSlugger()

  return (
    <div className={`${poppins.className} text-neutral-600 dark:text-neutral-400 text-xs rounded-lg mb-4 overflow-hidden overflow-y-auto`} style={{ fontWeight: '300' }}>
      {tags.map((tag, index) => (
        <Link 
          key={`${tag}-${index}`}
          href={`/tags/${slugger.slug(tag)}`}
          className="hover:underline"
        >
          {`#${tag}`}
          {index !== tags.length - 1 && ", "}
        </Link>
      ))}
    </div>
  )
}