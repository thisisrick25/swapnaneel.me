//@ts-ignore
export default function TableOfContents({ blog }) {
  return (
    <details className="bg-gray-100 dark:bg-neutral-900 text-dark dark:text-light rounded-lg p-4 top-6 max-h-[80vh] overflow-hidden overflow-y-auto">
      <summary className="cursor-pointer">table of content</summary>
      <ul className="pl-4 text-base">
        {//@ts-ignore
          blog.headings.map((heading) => {
            return (
              <li key={`#${heading.slug}`} className="">
                <a href={`#${heading.slug}`}
                  data-level={heading.level}
                  className="data-[level='2']:pl-0 data-[level='2']:pt-2  data-[level='3']:pl-4 sm:data-[level='3']:pl-6 flex items-center justify-start"
                >
                  {heading.level === 3 ? (
                    <span className="h-2 w-2">
                      &nbsp;
                    </span>
                  ) : null}
                  <span className="pl-4 hover:underline">{heading.text}</span>

                </a>
              </li>
            )
          })
        }
      </ul>
    </details>
  )
}
