import { formatDate } from "@/lib/formatDate";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogs, getBlogBySlug } from '@/utils/getBlogs';
import { Metadata } from 'next'
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { ibm_plex_mono, montserrat, poppins, inter, outfit, raleway } from '@/fonts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  return {
    title: blog.data.title,
    description: blog.data.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()
  
  const headings = extractHeadings(blog.content)
  
  return (
    <article>
      <div>
        <p className={`${montserrat.className}`} style={{ fontWeight: '500' }}>{blog.data.title}</p>
        <div className={`${poppins.className} grid grid-cols-2 text-sm mb-2 text-neutral-600 dark:text-neutral-400`} style={{ fontWeight: '300' }}>
          <p>{formatDate(blog.data.publishedAt)}</p>
          <ViewCounter slug={blog.slug} />
        </div>
        <Tag blog={blog.data} />
        <TableOfContents headings={headings} />
        <div className={`${outfit.variable} ${inter.variable} ${ibm_plex_mono.variable} ${raleway.variable} max-w-max prose dark:prose-invert`}>
          <MDXRemote source={blog.content} />
        </div>
      </div>
    </article>
  )
}
