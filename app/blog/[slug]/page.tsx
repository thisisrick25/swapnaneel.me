import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { getBlog, getAllBlogs, getSeries } from "lib/content";
import { formatDate } from "@/lib/formatDate";

export async function generateStaticParams() {
  return allBlogs
    .filter((p) => p.status != "draft")
    .map((p) => {
      slug: p.slug;
    });
}

// @ts-ignore
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  return {
    title: `${blog.title} | Swapnaneel`,
    description: blog.description,
    authors: {
      name: "Swapnaneel Patra",
      url: "https://swapnaneel.me",
    },
    keywords: blog.tags?.map((tag) => tag.title),
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

  return (
    <>
      <div>{blog?.title}</div>
      <div>{blog?.description}</div>
      <div>{formatDate(blog?.publishedAt)}</div>
      {/* <div>{blog?.publishedAtFormatted}</div> */}
    </>
  )
}
