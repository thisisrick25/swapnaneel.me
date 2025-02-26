import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compareDesc } from 'date-fns'
import { slug as slugify } from 'github-slugger'

export interface BlogData {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  isPublished: boolean
  tags: string[]
}

export interface Blog {
  data: BlogData
  slug: string
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Function to read and parse all blog files
function getAllBlogs(): Blog[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const slug = slugify(data.title)

    return {
      data,
      slug,
      content,
    } as Blog
  })
}

// Get all blogs, showing drafts only in development
export function getBlogs(): Blog[] {
  const allBlogs = getAllBlogs()
    const blogs = allBlogs.sort((a, b) => 
    compareDesc(new Date(a.data.publishedAt), new Date(b.data.publishedAt))
  )
  if (process.env.NODE_ENV === "development") {
    return blogs  // Show all blogs, including drafts
  }
  return blogs.filter((blog) => blog.data.isPublished)  // Only published blogs in production
}

// Get blogs by tag/category
export function getBlogsByTag(tag: string): Blog[] {
  return getBlogs().filter((blog) => 
    blog.data.tags?.some((t) => slugify(t) === tag)
  )
}

// Get a single blog by slug
export function getBlogBySlug(slug: string): Blog | undefined {
  return getBlogs().find((blog) => blog.slug === slug)
}

// Get all unique tags from published blogs
export function getAllTags(): string[] {
  const allBlogs = getBlogs()
  const tags: string[] = []
  allBlogs.forEach((blog) => {
    if (blog.data.isPublished) {
      blog.data.tags?.forEach((tag) => {
        const slugified = slugify(tag)
        if (!tags.includes(slugified)) {
          tags.push(slugified)
        }
      })
    }
  })
  return tags
} 