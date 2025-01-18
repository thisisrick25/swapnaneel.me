import { allBlogs } from "content-collections";
import { slug } from "github-slugger"
// import Link from "next/link";
import { Link } from 'next-view-transitions'
import { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Categories',
    description: 'Browse posts by category',
  };
}

export default function Page() {
  const allCategories: string[] = [];
  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags?.forEach((tag) => {
        let slugified = slug(tag);
        if (!allCategories.includes(slugified)) {
          allCategories.push(slugified);
        }
      });
    }
  })

  return (
    <div>
      <div className='mb-8 space-y-3 text-2xl font-bold'>
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