import { allBlogs } from 'content-collections'
// import Link from 'next/link';
import { Link } from 'next-view-transitions'
import { formatDate } from '@/lib/formatDate';
import ViewCounter from '@/components/viewCounter';
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';

export function generateMetadata(): Metadata {
  return {
    title: 'Blogs',
    description: 'My Blogs',
  };
}

export default function BlogPage() {
  console.log(allBlogs)
  const blogs = getBlogs()

  return (
    <div className=''>
      <div className='mb-4 space-y-3'>
        <div className='font-bold'>
          writings
        </div>
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
                  <ViewCounter slug={blog?.slug} />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
