import Link from "next/link";
import { slug } from "github-slugger"
import { Metadata } from 'next'
import { getBlogs } from '@/utils/getBlogs';

export function generateMetadata(): Metadata {
  return {
    title: 'Categories',
    description: 'Browse posts by category',
  };
}

export default function Page() {
  const allCategories: string[] = [];
  const allBlogs = getBlogs()
  allBlogs.forEach((blog) => {
    if (blog.data.isPublished) {
      blog.data.tags?.forEach((tag) => {
        let slugified = slug(tag);
        if (!allCategories.includes(slugified)) {
          allCategories.push(slugified);
        }
      });
    }
  })

  return (
    <div>
      <div className='mb-8 space-y-3'>
        all categories
      </div>
      <div>
        {allCategories.map((category, index) => (
          <Link 
            key={`${category}-${index}`}
            href={`/categories/${category}`}
            className="hover:underline"
          >
            {`#${category}`}
            {index !== allCategories.length - 1 && ", "}
          </Link>
        ))}
      </div>
    </div>
  )
}