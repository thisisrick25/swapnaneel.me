import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export function getAllPosts() {
  const posts = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.publishedAt), new Date(b.publishedAt));
  });
  if (process.env.NODE_ENV === "development") {
    return posts;
  } else {
    return posts.filter((p) => p.status === "published");
  }
}

export function getPost(slug: string) {
  const post = allBlogs.find((post) => post.slug === slug);
  if (post != null) {
    return post;
  } else {
    throw Error("Unable to Retrieve Post");
  }
}

export function getSeries(title: string, current: string) {
  return {
    title: title,
    posts: allBlogs
      .filter((p) => p.series?.title === title)
      .sort(
        (a, b) =>
          Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
      )
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          status: p.status,
          isCurrent: p.slug === current,
        };
      }),
  };
}