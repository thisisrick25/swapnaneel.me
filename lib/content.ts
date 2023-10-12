import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export function getAllBlogs() {
  const blogs = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  if (process.env.NODE_ENV === "development") {
    return blogs;
  } else {
    return blogs.filter((p) => p.isPublished === true);
  }
}

export function getBlog(slug: string) {
  const blog = allBlogs.find((blog) => blog.slug === slug);
  if (blog != null) {
    return blog;
  } else {
    throw Error("Unable to Retrieve blog");
  }
}

// export function getSeries(title: string, current: string) {
//   return {
//     title: title,
//     posts: allBlogs
//       .filter((p) => p.series?.title === title)
//       .sort(
//         (a, b) =>
//           Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
//       )
//       .map((p) => {
//         return {
//           title: p.title,
//           slug: p.slug,
//           status: p.status,
//           isCurrent: p.slug === current,
//         };
//       }),
//   };
// }