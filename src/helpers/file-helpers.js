import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import React from "react";

export async function getBlogPostList() {
  const fileNames = await readDirectory("/content");

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
}

export const loadBlogPost = React.cache(async function loadBlogPost(slug) {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});

export async function getHeadings(content) {
  // Regular expression to match h1 and h2 headings
  const headingRegex = /^(#+)\s+(.*?)$/gm; // Matches lines that start with one or more '#' characters

  // Array to store extracted headings
  const headings = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Calculate heading level based on the number of '#' characters
    const text = match[2]; // Extract the heading text
    const id = text.toLowerCase().replace(/\s+/g, "-"); // Generate a slug from the heading text
    headings.push({ level, text, id });
  }

  console.log(headings);

  return headings;
}

function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

// Function to capitalize the first letter of each word and remove spaces
function capitalizeWords(originalText) {
  const words = originalText.split(/\s+/);
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join('');
}