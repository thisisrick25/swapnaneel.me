import Link from "next/link"
import githubSlugger from "github-slugger"
import { poppins } from "@/fonts"

interface BlogType {
  tags: string[]
}

export default function Tag({ blog }: { blog: BlogType }) {
  const slugger = new githubSlugger()

  return (
    <div className={`${poppins.className} text-neutral-600 dark:text-neutral-400 text-xs rounded-lg mb-4 overflow-hidden overflow-y-auto`} style={{ fontWeight: '300' }}>
      {blog.tags.map((tag, index) => (
        <Link 
          key={`${tag}-${index}`}
          href={`/categories/${slugger.slug(tag)}`}
          className="hover:underline"
        >
          {`#${tag}`}
          {index !== blog.tags.length - 1 && ", "}
        </Link>
      ))}
    </div>
  )
}