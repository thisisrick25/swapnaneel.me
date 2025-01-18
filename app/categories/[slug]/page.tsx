import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Metadata } from 'next'
import { getAllTags, getBlogsByTag } from '@/utils/getBlogs'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: categorySlug } = await params;
  
  return {
    title: `#${categorySlug}`,
    description: `Posts tagged with ${categorySlug}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug: categorySlug } = await params;
  const blogs = getBlogsByTag(categorySlug);

  return (
    <>
      <div className='mb-8 space-y-3 text-2xl font-bold'>
        {`#${categorySlug}`}
      </div>
      <div>
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            className="grid grid-cols-1 mb-4"
            href={`/blog/${blog.slug}`}
          >
            <div className="w-full">
              <div>
                {blog.title}
              </div>
              <div className='grid grid-cols-2 text-base text-neutral-600 dark:text-neutral-400'>
                <div>{formatDate(blog.publishedAt)}</div>
                <div className=''>views</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}