import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import ViewCounter from '@/components/viewCounter';
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';
import { montserrat, poppins } from '@/fonts';

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
    description: 'My Posts',
  };
}

export default async function Page() {
  const blogs = await getBlogs()

  return (
    <>
      <h1 className={`text-3xl font-bold mb-6 ${montserrat.className}`} style={{ fontWeight: '700' }}>
        Posts
      </h1>
      <div>
        {blogs
          .map((blog) => (
            <Link
              key={blog.slug}
              className="grid grid-cols-1 w-full my-4"
              href={`/posts/${blog.slug}`}
            >
              <div className={`${montserrat.className}`} style={{ fontWeight: '500' }}>
                {blog.data.title}
              </div>
              <div className={`${poppins.className} grid grid-cols-2 text-sm text-neutral-600 dark:text-neutral-400`} style={{ fontWeight: '300' }}>
                <time dateTime={blog.data.publishedAt}>
                  {formatDate(blog?.data.publishedAt)}
                </time>
                <ViewCounter slug={blog?.slug} trackView={false} />
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
