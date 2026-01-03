import { Metadata } from 'next'
import PostCard from '@/components/postCard';
import { getAllTags, getBlogsByTag } from '@/utils/getBlogs'
import { getViewsCount } from '@/db/queries';
import { poppins } from "@/fonts";
import BackLink from '@/components/backLink';

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
  const allViews = await getViewsCount();

  return (
    <div className="py-16 sm:py-24 px-4">
      {/* Back links */}
      <div className="flex flex-col gap-1 mb-8">
        <BackLink href="/tags" text="Back to tags" className="" />
        <BackLink href="/" text="Back to home" className="" />
      </div>

      {/* Header */}
      <section className="mb-12">
        <h1
          className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${poppins.className}`}
          style={{ viewTransitionName: `tag-${tagSlug}` }}
        >
          #{tagSlug}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          {blogs.length} post{blogs.length !== 1 ? 's' : ''} tagged with #{tagSlug}
        </p>
      </section>

      {/* Posts Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {blogs.map((blog) => {
          const viewCount = allViews.find((v) => v.slug === blog.slug)?.count || 0;
          return (
            <PostCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.data.title}
              description={blog.data.description}
              publishedAt={blog.data.publishedAt}
              viewCount={viewCount}
              tags={blog.data.tags}
            />
          );
        })}
      </div>

    </div>
  );
}
