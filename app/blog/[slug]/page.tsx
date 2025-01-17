import { allBlogs } from 'content-collections'
import { formatDate } from "@/lib/formatDate";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogBySlug } from '@/utils/getBlogs';
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allBlogs
    .filter((p) => p.isPublished)
    .map((p) => ({
      slug: p.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(allBlogs, slug)
  if (!blog) notFound()

  return {
    title: blog.title,
    description: blog.description,
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(allBlogs, slug)
  if (!blog) notFound()
  
  const headings = extractHeadings(blog.content)
  
  return (
    <article>
      <div>
        <p className='text-2xl font-bold'>{blog.title}</p>
        <div className='grid grid-cols-2 mb-4 text-lg text-neutral-600 dark:text-neutral-400'>
          <p>{formatDate(blog.publishedAt)}</p>
          <ViewCounter slug={blog.slug} />
        </div>
        <Tag blog={blog} />
        <TableOfContents headings={headings} />
        <div className="max-w-max prose prose-neutral dark:prose-invert">
          {blog.content}
        </div>
      </div>
    </article>
  )
}
