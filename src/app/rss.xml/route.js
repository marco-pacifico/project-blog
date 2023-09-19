import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
const RSS = require("rss");

export async function GET() {
  const blogPostList = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: "A blog about web development and other stuff",
  });

  blogPostList.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `https://www.example.com/${post.slug}`,
      date: post.publishedAt,
    });
  });

  const xml = feed.xml();

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
  
}
