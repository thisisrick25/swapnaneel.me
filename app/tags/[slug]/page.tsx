import Link from "next/link";
import { Metadata } from 'next'
import PostItem from '@/components/postItem';
import { getAllTags, getBlogsByTag } from '@/utils/getBlogs'
import { getViewsCount } from '@/db/queries';
import { poppins } from "@/fonts";

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    slug: tag,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: tagSlug } = await params;

  return {
    title: `#${tagSlug}`,
    description: `Posts tagged with ${tagSlug}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug: tagSlug } = await params;
  const blogs = await getBlogsByTag(tagSlug);
  const allViews = await getViewsCount();

  return (
    <>
      <div className={`text-lg font-bold mb-6 ${poppins.className}`} style={{ fontWeight: '700' }}>
        {`#${tagSlug}`}
      </div>
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
  );
}