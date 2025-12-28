import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import DateDisplay from '@/components/dateDisplay';
import { extractHeadings } from '@/utils/extractHeadings';
import { getBlogs, getBlogBySlug, Blog } from '@/utils/getBlogs';
import { getReadingTime } from '@/utils/getReadingTime';
import { Metadata } from 'next'
import { poppins, inter, ibm_plex_mono } from '@/fonts'
import { cache } from 'react';
import { getViewsCountBySlug } from '@/db/queries';
import { LuArrowLeft, LuClock } from 'react-icons/lu';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>
}

// Cache the function that fetches and processes a single blog post (per-request cache)
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

  const headings = extractHeadings(blog.rawContent)
  const viewCount = await getViewsCountBySlug(slug)
  const readingTime = getReadingTime(blog.rawContent)

  return (
    <article className="py-16 sm:py-24 px-4">
      {/* Back link */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <LuArrowLeft className="w-4 h-4" />
        Back to posts
      </Link>

      {/* Post header */}
      <header className="mb-8">
        <h1
          className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${poppins.className}`}
          style={{ viewTransitionName: `post-title-${slug}` }}
        >
          {blog.data.title}
        </h1>

        {blog.data.description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {blog.data.description}
          </p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <DateDisplay date={blog.data.publishedAt} />
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="flex items-center gap-1">
            <LuClock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <ViewCounter slug={slug} trackView={true} count={viewCount} />
        </div>

        {/* Updated date */}
        {blog.data.updatedAt && blog.data.updatedAt !== blog.data.publishedAt && (
          <p className="text-xs text-gray-400 mt-2">
            Updated <DateDisplay date={blog.data.updatedAt} />
          </p>
        )}

        {/* Tags */}
        {blog.data.tags && blog.data.tags.length > 0 && (
          <div className="mt-4">
            <Tag tags={blog.data.tags} />
          </div>
        )}
      </header>

      {/* Table of contents */}
      {headings.length > 0 && (
        <TableOfContents headings={headings} />
      )}

      {/* Post content */}
      <div className={`${poppins.variable} ${inter.variable} ${ibm_plex_mono.variable} prose dark:prose-invert prose-lg max-w-none`}>
        {blog.content}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <LuArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </footer>
    </article>
  )
}
