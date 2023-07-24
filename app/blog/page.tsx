import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className=''>
      <div className='py-8 space-y-3'>
        <div className='text-4xl font-bold'>
          all blogs
        </div>
        <div className='relative max-w-sm'>
          <input type="text" placeholder='search...' className='block w-full p-1 text-black dark:text-white bg-gray-300 dark:bg-neutral-700 border rounded-md border-gray-300 dark:border-neutral-700 focus:outline-none focus:border-yellow-500 focus:ring focus:ring-yellow-500' />
        </div>
      </div>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((blog) => (
            <Link
              key={blog.slug}
              className="grid grid-cols-1 space-y-1 mb-4"
              href={`/blog/${blog.slug}`}
            >
              <div className="w-full grid grid-cols-1">
                <div className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {blog.title}
                </div>
                <div className='w-fit grid grid-cols-3 '>
                  <div>date</div>
                  <div className='justify-self-center '>-</div>
                  <div>views</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
