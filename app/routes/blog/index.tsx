import { CardItem } from "~/components/carditem"

import { useLoaderData } from "remix"

import path from './path.server'
import fs from './fs.server'
import { getAllPosts, log } from "~/utils"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeTitle, unSetBackButton } from "~/redux/blog.actions"
import { Post } from "~/interfaces/post"

export const loader = async () => {

  log(await fs.readdir(path.resolve(__dirname, '../../')))

  const root = path.resolve(__dirname, '../../public/posts')

  log(__dirname)

  let files: string[] = await fs.readdir(root)
  //fs.readdirSync()

  files = files.map(f => removeExtension(f))


  return {
    posts: await getAllPosts(files)
  }
}

const removeExtension = (file: string) => {
  return file.replace(/\.[^/.]+$/, "")
}

export default function Blog() {
  const dispatch = useDispatch()
  const { posts }: { posts: Post[] } = useLoaderData()

  useEffect(() => {
    dispatch(unSetBackButton())
    dispatch(changeTitle("Posts"))
  }, [])

  return (
    <>
      <section>
        {
          posts.map((post, i) => (
            <CardItem
              key={i}
              description={post.description}
              slug={post.slug}
              title={post.title}
            //link={`/blog/${post}`}
            />
          ))
        }
      </section >
    </>
  )
}
