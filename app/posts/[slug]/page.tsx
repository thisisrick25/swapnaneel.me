import { formatDate } from "@/lib/formatDate";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogs, getBlogBySlug, Blog } from '@/utils/getBlogs';
import { Metadata } from 'next'
import { ibm_plex_mono, montserrat, poppins, inter, outfit, raleway } from '@/fonts'
import { cache } from "react";
import { Suspense } from 'react';

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

  return (
    <article>
      <div>
        <p className={`${montserrat.className}`} style={{ fontWeight: '500' }}>{blog.data.title}</p>
        <div className={`${poppins.className} grid grid-cols-2 text-sm mb-2 text-neutral-600 dark:text-neutral-400`} style={{ fontWeight: '300' }}>
          <p>{formatDate(blog.data.publishedAt)}</p>
          <Suspense fallback={<div>Loading views...</div>}>
            <ViewCounter slug={slug} />
          </Suspense>
        </div>
        <Tag tags={blog.data.tags} />
        <TableOfContents headings={headings} />
        <div className={`${outfit.variable} ${inter.variable} ${ibm_plex_mono.variable} ${raleway.variable} max-w-max prose dark:prose-invert`}>
          {blog.content}
        </div>
      </div>
    </article>
  )
}
