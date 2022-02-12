import fs from 'fs'
import fsa from '../routes/blog/fs.server'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//@ts-ignore
import mdxPrism from 'mdx-prism'
import { log } from '~/utils'

import axios from 'axios'

const root = process.cwd()

export const getFileBySlug = async (slug: string) => {

  const file = path.resolve(__dirname, "../../public/posts/", `${slug}.mdx`)
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

