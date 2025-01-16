import Link from "next/link"
import githubSlugger from "github-slugger"

interface BlogType {
  tags: string[]
}

export default function Tag({ blog }: { blog: BlogType }) {
  const slugger = new githubSlugger()

  return (
    <div className="text-neutral-600 dark:text-neutral-400 text-base rounded-lg mb-4 overflow-hidden overflow-y-auto">
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