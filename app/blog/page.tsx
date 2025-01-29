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
        <div className='text-xl font-bold'>
          all blogs
        </div>
        {/* <div className='relative max-w-sm'>
          <input type="text" placeholder='search...' className='block w-full p-1 text-black dark:text-white bg-gray-300 dark:bg-neutral-700 border rounded-md border-gray-300 dark:border-neutral-700 focus:outline-hidden focus:border-yellow-500 focus:ring-3 focus:ring-yellow-500' />
        </div> */}
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
                  {/* <div className="font-bold px-1">&middot;</div> */}
                  <ViewCounter slug={blog?.slug} />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
