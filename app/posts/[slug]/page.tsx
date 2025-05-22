import { formatDate } from "@/lib/formatDate";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogs, getBlogBySlug } from '@/utils/getBlogs';
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getBlogs().map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) notFound()

  return {
    title: blog.data.title,
    description: blog.data.description,
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)
  if (!blog) notFound()
  
  const headings = extractHeadings(blog.content)
  const { default: MDXContent } = await import(`@/content/posts/${slug}.mdx`)
  
  return (
    <article>
      <div>
        <p className=''>{blog.data.title}</p>
        <div className='grid grid-cols-2 mb-4 text-neutral-600 dark:text-neutral-400'>
          <p>{formatDate(blog.data.publishedAt)}</p>
          <ViewCounter slug={blog.slug} />
        </div>
        <Tag blog={blog.data} />
        <TableOfContents headings={headings} />
        <div className="max-w-max prose dark:prose-invert">
          <MDXContent />
        </div>
      </div>
    </article>
  )
}
