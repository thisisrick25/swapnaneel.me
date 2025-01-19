import { allBlogs } from 'content-collections'
import { compareDesc } from 'date-fns'
import type { Blog } from 'content-collections'
import { slug as slugify } from 'github-slugger'

// Get all blogs, showing drafts only in development
export function getBlogs(): Blog[] {
  const blogs = allBlogs.sort((a, b) => 
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  )
  if (process.env.NODE_ENV === "development") {
    return blogs  // Show all blogs, including drafts
  }
  return blogs.filter((blog) => blog.isPublished)  // Only published blogs in production
}

// Get blogs by tag/category
export function getBlogsByTag(tag: string): Blog[] {
  return getBlogs().filter((blog) => 
    blog.tags?.some((t) => slugify(t) === tag)
  )
}

// Get a single blog by slug
export function getBlogBySlug(slug: string): Blog | undefined {
  return getBlogs().find((blog) => blog.slug === slug)
}

// Get all unique tags from published blogs
export function getAllTags(): string[] {
  const tags: string[] = []
  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags?.forEach((tag) => {
        const slugified = slugify(tag)
        if (!tags.includes(slugified)) {
          tags.push(slugified)
        }
      })
    }
  })
  return tags
} 