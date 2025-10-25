import Link from "next/link";
import { Metadata } from 'next'
import PostItem from '@/components/postItem';
import { getAllTags, getBlogsByTag } from '@/utils/getBlogs'
import { poppins } from "@/fonts";

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    slug: tag,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: tagSlug } = await params;

  return {
    title: `#${tagSlug}`,
    description: `Posts tagged with ${tagSlug}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug: tagSlug } = await params;
  const blogs = await getBlogsByTag(tagSlug);

  return (
    <>
      <div className={`mb-4 space-y-3 ${poppins.className}`} style={{ fontWeight: '700' }}>
        {`#${tagSlug}`}
      </div>
      <div>
        {blogs.map((blog) => (
          <PostItem
            key={blog.slug}
            title={blog.data.title}
            date={blog.data.publishedAt}
            slug={blog.slug}
          />
        ))}
      </div>
    </>
  );
}