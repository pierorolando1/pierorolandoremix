import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//@ts-ignore
import mdxPrism from 'mdx-prism'

const root = process.cwd()

export const getFileBySlug = async (slug: string) => {

  const mdxSource = fs.readFileSync(path.join(root, "posts", `${slug}.mdx`), "utf8");

  const { data, content } = await matter(mdxSource);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    source,
    frontmatter: {
      slug: slug || null,
      ...data,
    },
  };
};

