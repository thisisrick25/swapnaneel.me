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
      <h1 className={`text-xl font-bold mb-6 ${poppins.className}`} style={{ fontWeight: '700' }}>
        Tags
      </h1>
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