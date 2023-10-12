import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';

// @ts-ignore
export default function BlogPage({ params }) {
  console.log(allBlogs)
  const blogs = allBlogs
    .filter((blog) => blog.isPublished === true)
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt))
        return -1;
      return 1;
    })

  return (
    <div className=''>
      <div className='mb-8 space-y-3'>
        <div className='text-2xl font-bold'>
          all blogs
        </div>
        <div className='relative max-w-sm'>
          <input type="text" placeholder='search...' className='block w-full p-1 text-black dark:text-white bg-gray-300 dark:bg-neutral-700 border rounded-md border-gray-300 dark:border-neutral-700 focus:outline-none focus:border-yellow-500 focus:ring focus:ring-yellow-500' />
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
                  {/* <div className="font-bold px-1">&middot;</div> */}
                  <div className=''>views</div>
                </div>
                {/* <ViewCounter
                allViews={allViews}
                slug={post.slug}
                trackView={false}
              /> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
