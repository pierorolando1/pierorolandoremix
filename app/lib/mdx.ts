import fs from 'fs'
import fsa from '../routes/blog/fs.server'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//@ts-ignore
import mdxPrism from 'mdx-prism'
import { log } from '~/utils'

const root = process.cwd()

export const getFileBySlug = async (slug: string) => {


  log(__dirname)
  log(root)

  const file = path.join(root, "posts", `${slug}.mdx`)
  const mdxSource = fs.readFileSync(file, "utf8");

  const lastModified = fs.statSync(file).mtime

  const { data, content } = await matter(mdxSource);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    source,
    lastModified,
    frontmatter: {
      slug: slug || null,
      ...data,
    },
  };
};

