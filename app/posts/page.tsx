import PostItem from '@/components/postItem';
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';
import { getViewsCount } from '@/db/queries';
import { poppins } from '@/fonts';

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
      <h1 className={`text-lg font-bold mb-6 ${poppins.className}`} style={{ fontWeight: '700' }}>
        Posts
      </h1>
      <div>
        {blogs
          .map((blog) => {
            const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0;
            return (
              <PostItem
                key={blog.slug}
                title={blog.data.title}
                date={blog.data.publishedAt}
                viewCount={viewCount}
                slug={blog.slug}
              />
            );
          })}
      </div>
    </>
  )
}
