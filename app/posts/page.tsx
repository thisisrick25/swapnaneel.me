import Link from 'next/link';
import DateDisplay from '@/components/dateDisplay';
import ViewCounter from '@/components/viewCounter';
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';
import { getViewsCount } from '@/db/queries';
import { poppins, inter } from '@/fonts';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
    description: 'My Posts',
  };
}

export default async function Page() {
  const blogs = await getBlogs()
  const allViews = await getViewsCount();

  return (
    <>
      <h1 className={`text-3xl font-bold mb-6 ${poppins.className}`} style={{ fontWeight: '700' }}>
        Posts
      </h1>
      <div>
        {blogs
          .map((blog) => {
            const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0;
            return (
              <Link
                key={blog.slug}
                className="grid grid-cols-1 w-full my-4"
                href={`/posts/${blog.slug}`}
              >
                <div className={`${poppins.className}`} style={{ fontWeight: '500' }}>
                  {blog.data.title}
                </div>
                <div className={`${inter.className} grid grid-cols-2 text-sm text-gray-600 dark:text-gray-400`} style={{ fontWeight: '300' }}>
                  <DateDisplay date={blog?.data.publishedAt} />
                  <ViewCounter slug={blog?.slug} trackView={false} count={viewCount} />
                </div>
              </Link>
            );
          })}
      </div>
    </>
  )
}
