import Link from "next/link";
import { slug } from "github-slugger"
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';
import { poppins } from '@/fonts';

export function generateMetadata(): Metadata {
  return {
    title: 'Tags',
    description: 'Browse posts by tag',
  };
}

export default async function Page() {
  const allTags: string[] = [];
  const allBlogs = await getBlogs();
  allBlogs.forEach((blog) => {
    if (blog.data.isPublished) {
      blog.data.tags?.forEach((tag) => {
        let slugified = slug(tag);
        if (!allTags.includes(slugified)) {
          allTags.push(slugified);
        }
      });
    }
  })

  return (
    <div>
      <div className={`mb-4 space-y-3 ${poppins.className}`} style={{ fontWeight: '700' }}>
        Tags
      </div>
      <div>
        {allTags.map((tag, index) => (
          <Link
            key={`${tag}-${index}`}
            href={`/tags/${tag}`}
            className="hover:underline"
          >
            {`#${tag}`}
            {index !== allTags.length - 1 && ", "}
          </Link>
        ))}
      </div>
    </div>
  )
}