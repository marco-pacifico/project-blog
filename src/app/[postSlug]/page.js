import BlogHero from '@/components/BlogHero';
import { BLOG_TITLE } from '@/constants';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';
import MDXComponents from '@/helpers/mdx-components';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} | ${BLOG_TITLE}}`,
    description: frontmatter.abstract,
  }
};


async function BlogPost({ params }) {

  const {frontmatter, content} = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={MDXComponents} />
      </div>
    </article>
  );
}

export default BlogPost;
