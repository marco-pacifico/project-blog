import BlogHero from "@/components/BlogHero";
import BlogBody from "@/components/BlogBody";
import { BLOG_TITLE } from "@/constants";
import { loadBlogPost, getHeadings } from "@/helpers/file-helpers";
import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/helpers/mdx-components";


export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} | ${BLOG_TITLE}}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  const initialHeadings = await getHeadings(content);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <BlogBody initialHeadings={initialHeadings}>
        <MDXRemote source={content} components={MDXComponents} />
      </BlogBody>
     
    </article>
  );
}

export default BlogPost;
