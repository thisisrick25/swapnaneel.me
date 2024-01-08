import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger"
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: 'Tags',
    description: 'All tags',
  };
}

export default function Page() {
  const allTags: string[] = [];
  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags?.forEach((tag) => {
        let slugified = slug(tag);
        if (!allTags.includes(slugified)) {
          allTags.push(slugified);
        }
      });
    }
  })

  return (
    <div>
      <div className='mb-8 space-y-3 text-2xl font-bold'>
        all tags
      </div>
      <div>
        {
          allTags.map((tag, index) => {
            return (
              <>
                <Link href={`/categories/${tag}`}>
                  <span className="hover:underline">{`#${tag}`}</span>
                </Link>
                {index !== allTags.length - 1 && ", "} {/* Add a comma after each tag except the last one */}
              </>
            )
          })
        }
      </div>
    </div>
  )
}