import { Link } from "next-view-transitions";
import { slug } from "github-slugger"
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';
import { poppins, ibm_plex_mono } from '@/fonts';
import BackLink from '@/components/backLink';

export function generateMetadata(): Metadata {
  return {
    title: 'Tags',
    description: 'Browse posts by tag',
  };
}

export default async function Page() {
  const tagCounts: Record<string, number> = {};
  const allBlogs = await getBlogs();

  allBlogs.forEach((blog) => {
    if (blog.data.isPublished) {
      blog.data.tags?.forEach((tag) => {
        const slugified = slug(tag);
        tagCounts[slugified] = (tagCounts[slugified] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="py-16 sm:py-24 px-4">
      {/* Header */}
      <section className="mb-12">
        <BackLink />
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-2 ${poppins.className}`}>Tags</h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Browse posts by topic.
        </p>
      </section>

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all ${ibm_plex_mono.className}`}
            style={{ viewTransitionName: `tag-${tag}` }}
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">#{tag}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">({count})</span>
          </Link>
        ))}
      </div>

    </div>
  )
}
