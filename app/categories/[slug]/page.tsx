import { formatDate } from "@/lib/formatDate";
import { allBlogs } from "content-collections";
import { slug } from "github-slugger"
import Link from "next/link";

export async function generateStaticParams() {
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
  return allTags.map((tag) => ({
    slug: tag,
  }));
}

//@ts-ignore
export default function Page({ params }) {
  const allTags: string[] = [];
  const blogs = allBlogs.filter((blog) => {
    return blog.tags?.some((tag) => {
      let slugified = slug(tag);
      if (!allTags.includes(slugified)) {
        allTags.push(slugified);
      }
      return slugified === params.slug;
    });
  });

  return (
    <>
      <div className='mb-8 space-y-3 text-2xl font-bold'>
        {`#${params.slug}`}
      </div>
      <div>
        {blogs
          .map((blog) => (
            <Link
              key={blog.slug}
              className="grid grid-cols-1 mb-4"
              href={`/blog/${blog.slug}`}
            >
              <div className="w-full">
                <div>
                  {blog.title}
                </div>
                <div className=' grid grid-cols-2 text-base text-neutral-600 dark:text-neutral-400'>
                  <div>{formatDate(blog?.publishedAt)}</div>
                  <div className=''>views</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}