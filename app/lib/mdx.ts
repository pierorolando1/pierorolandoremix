import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//@ts-ignore
import mdxPrism from 'mdx-prism'
import { log } from '~/utils'

import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase.config'


export const getFileBySlug = async (slug: string) => {

  const querySnapshot = await getDocs(collection(db, 'posts_remix'))
  const posts = querySnapshot.docs.map(doc => doc.data())

  log(posts)

  //const file = path.join(root, 'content', slug + '.mdx')
  const file = path.resolve(__dirname, "../../public/posts/", `${slug}.mdx`)
  const mdxSource = fs.readFileSync(file, "utf8");

  const lastModified = fs.statSync(file).mtime

  const { data, content } = await matter(mdxSource);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles"), require("mdx-mermaid")],
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

export const getSourceFromSource = async (s: string) => {

  const { data, content } = await matter(s)

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles"), require("mdx-mermaid")],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    source,
    frontmatter: {
      ...data,
    },
  };
};

