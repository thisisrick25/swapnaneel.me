import { allBlogs } from 'contentlayer/generated'
import { formatDate } from "@/lib/formatDate";
import MDXContent from "@/components/mdxContent";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';
import Tag from '@/components/tag';

export async function generateStaticParams() {
  return allBlogs
    .filter((p) => p.isPublished != false)
    .map((p) => ({
      slug: p.slug,
    }));
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug)
  if (!blog) {
    return;
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

// @ts-ignore
export default function Page({ params }) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article>
      <div>
        <p className='text-2xl font-bold'>{blog?.title}</p>
        <div className='mb-4 grid grid-cols-2 text-lg text-neutral-600 dark:text-neutral-400'>
          <p>{formatDate(blog?.publishedAt)}</p>
          <p className='justify-self-end'>views</p>
        </div>
        <Tag blog={blog} />
        <TableOfContents blog={blog} />
        <MDXContent code={blog?.body.code}/>
      </div>
    </article>
  )
}
