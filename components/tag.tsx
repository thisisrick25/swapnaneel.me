import Link from "next/link"
import githubSlugger from "github-slugger"

//@ts-ignore
export default function Tag({ blog }) {
  const slugger = new githubSlugger()

  return (
    <div className="text-neutral-600 dark:text-neutral-400 text-base rounded-lg mb-4 overflow-hidden overflow-y-auto ">
      {//@ts-ignore
        blog.tags.map((tag, index) => {
          return (
            <>
              <Link href={`/categories/${slugger.slug(tag)}`}>
                <span className="hover:underline">{`#${tag}`}</span>
              </Link>
              {index !== blog.tags.length - 1 && ", "} {/* Add a comma after each tag except the last one */}
            </>
          )
        })
      }
    </div>
  )
}