import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import DateDisplay from '@/components/dateDisplay';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogs, getBlogBySlug, Blog } from '@/utils/getBlogs';
import { Metadata } from 'next'
import { poppins, inter, jetbrains_mono } from '@/fonts'
import { cache } from "react";
import { getViewsCountBySlug } from '@/db/queries';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>
}

// Cache the function that fetches and processes a single blog post
const getBlogData = cache(async (slug: string): Promise<Blog | undefined> => {
  const blog = await getBlogBySlug(slug);
  return blog;
});

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogData(slug)
  if (!blog) notFound()

  return {
    title: blog.data.title,
    description: blog.data.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogData(slug)
  if (!blog) notFound()

  const headings = extractHeadings(blog.rawContent) // Extract headings from the raw mdx content
  const viewCount = await getViewsCountBySlug(slug)

  return (
    <article>
      <div>
        <p className={`${poppins.className}`} style={{ fontWeight: '500' }}>{blog.data.title}</p>
        <div className={`${inter.className} grid grid-cols-2 text-sm mb-2 text-gray-600 dark:text-gray-400`} style={{ fontWeight: '300' }}>
          <DateDisplay date={blog.data.publishedAt} />
          <ViewCounter slug={slug} count={viewCount} />
        </div>
        <Tag tags={blog.data.tags} />
        <TableOfContents headings={headings} />
        <div className={`${poppins.variable} ${inter.variable} ${jetbrains_mono.variable} max-w-max prose dark:prose-invert`}>
          {blog.content}
        </div>
      </div>
    </article>
  )
}
