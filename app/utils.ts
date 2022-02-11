import { Post } from "./interfaces/post"
import { getFileBySlug } from "./lib/mdx"

export const log = console.log

export const getAllPosts = async (files: string[]): Promise<Post[]> => {

  let posts: Post[] = []

  for (const file in files) {
    const { frontmatter, lastModified }: any = await getFileBySlug(files[file])

    log(lastModified)

    posts.push({
      slug: frontmatter.slug,
      title: frontmatter.meta.title ?? "",
      description: frontmatter.meta.description ?? ""
    })
  }

  return posts
}

