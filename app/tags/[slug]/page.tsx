import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import { Metadata } from 'next'
import ViewCounter from '@/components/viewCounter';
import { getAllTags, getBlogsByTag } from '@/utils/getBlogs'
import { montserrat, poppins } from "@/fonts";

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

  return (
    <>
      <div className={`mb-4 space-y-3 ${montserrat.className}`} style={{ fontWeight: '700' }}>
        {`#${tagSlug}`}
      </div>
      <div>
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            className="grid grid-cols-1 mb-4"
            href={`/blog/${blog.slug}`}
          >
            <div className="w-full">
              <div className={`${montserrat.className}`} style={{ fontWeight: '500' }}>
                {blog.data.title}
              </div>
              <div className={`${poppins.className} grid grid-cols-2 text-sm text-neutral-600 dark:text-neutral-400`} style={{ fontWeight: '300' }}>
                <div>{formatDate(blog.data.publishedAt)}</div>
                <ViewCounter slug={blog?.slug} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}