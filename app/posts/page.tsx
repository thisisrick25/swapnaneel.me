import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import ViewCounter from '@/components/viewCounter';
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
    description: 'My Posts',
  };
}

export default function BlogPage() {
  const blogs = getBlogs()
  console.log(blogs)

  return (
    <div className=''>
      <div className='mb-4 space-y-3'>
        Posts
      </div>
      <div>
        {blogs
          .map((blog) => (
            <Link
              key={blog.slug}
              className="grid grid-cols-1 mb-4"
              href={`/posts/${blog.slug}`}
            >
              <div className="w-full">
                <div>
                  {blog.data.title}
                </div>
                <div className='grid grid-cols-2 text-sm text-neutral-600 dark:text-neutral-400'>
                  <time dateTime={blog.data.publishedAt}>
                    {formatDate(blog?.data.publishedAt)}
                  </time>
                  <ViewCounter slug={blog?.slug} trackView={false} />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
