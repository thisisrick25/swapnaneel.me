import { allBlogs } from 'content-collections'
import { formatDate } from "@/lib/formatDate";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';
import ViewCounter from '@/components/viewCounter';
import { extractHeadings } from '@/lib/utils/extractHeadings';

export async function generateStaticParams() {
  return allBlogs
    .filter((p) => p.isPublished != false)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);
  if (!blog) {
    return;
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = allBlogs.find((blog) => blog.slug === slug);
  if (!blog) {
    notFound();
  }

  const headings = extractHeadings(blog.content);

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
