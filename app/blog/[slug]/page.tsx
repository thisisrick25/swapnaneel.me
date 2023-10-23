import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { getBlog, getAllBlogs } from "lib/content";
import { formatDate } from "@/lib/formatDate";
import MDXContent from "@/components/mdxContent";
import { notFound } from 'next/navigation';
import TableOfContents from '@/components/tableOfContents';

export async function generateStaticParams() {
  return allBlogs
    .filter((p) => p.isPublished != false)
    .map((p) => {
      slug: p.slug;
    });
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  return {
    title: `${blog.title}`,
    description: blog.description,
    authors: {
      name: "Swapnaneel Patra",
      url: "https://swapnaneel.me",
    },
    // keywords: blog.tags?.map((tag) => tag.title),
    creator: "Swapnaneel Patra",
    twitter: {
      card: "summary_large_image",
      creator: "@thisisrick25",
    },
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
        <div className='pb-2 mb-2 grid grid-cols-2 text-lg text-neutral-600 dark:text-neutral-400'>
          <p>{formatDate(blog?.publishedAt)}</p>
          <p className='justify-self-end'>views</p>
        </div>
        <TableOfContents blog={blog} />
        <MDXContent code={blog?.body.code}/>
      </div>
    </article>
  )
}
