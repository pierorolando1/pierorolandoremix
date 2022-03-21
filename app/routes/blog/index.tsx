import { CardItem } from "~/components/carditem"

import { useLoaderData } from "remix"

import { getAllPosts } from "~/utils"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { changeTitle, unSetBackButton } from "~/redux/blog.actions"
import { Post } from "~/interfaces/post"

export const loader = async () => {

  return {
    posts: await getAllPosts()
  }
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
              post={post}
            //link={`/blog/${post}`}
            />
          ))
        }
      </section>
    </>
  )
}
