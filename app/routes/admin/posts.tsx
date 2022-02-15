import { Button, Text } from "@nextui-org/react"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "remix"
import { db } from "~/lib/firebase.config"

export default () => {

  const [posts, setPosts] = useState<Post[] | any[]>([])

  useEffect(() => {

    getDocs(collection(db, "posts_remix"))
      .then(snap => {
        snap.forEach(doc => {
          setPosts(posts => [...posts, { id: doc.id, ...doc.data() }])
        })
      })

  }, [])

  return (
    <section className="w-full overflow-auto">
      {
        posts.map(post => (
          <CardPost post={{ description: post.description, title: post.title, id: post.id }} />
        ))
      }
    </section>
  )
}

interface Post {
  title: string
  description: string
  id: string
}

const CardPost = ({ post }: { post: Post }) => {
  return (
    <div className="hover:bg-blue-600 px-6 rounded py-2 w-full mx-auto max-w-2xl transition-all flex items-center my-2 justify-between">
      <div>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <Link to={"/admin/edit/" + post.id}>
        <Button flat auto rounded css={{ color: '#94f9f0', bg: '#94f9f026' }}>
          <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
            Edit
          </Text>
        </Button>
      </Link>
    </div>
  )
}
