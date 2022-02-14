import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
//@ts-ignore
import mdxPrism from 'mdx-prism'

import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase.config'


export const getFileBySlug = async (slug: string) => {

  const docRef = doc(db, "posts_remix", slug);
  const docSnap = await getDoc(docRef);

  const { data, content } = await matter(docSnap.data()!.content)

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles"), require("mdx-mermaid")],
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

