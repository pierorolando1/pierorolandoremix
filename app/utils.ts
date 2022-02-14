import { collection, getDocs } from "firebase/firestore"
import { Post } from "./interfaces/post"
import { db } from "./lib/firebase.config"

export const log = console.log

export const getAllPosts = async (): Promise<Post[]> => {

  let posts: Post[] = []
  const postsSnap = await getDocs(collection(db, "posts_remix"))
  postsSnap.forEach(doc => {
    posts.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description
    })
  })
  return posts
}

export const validateEmail = (email: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
