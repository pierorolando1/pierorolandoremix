import { collection, getDocs, orderBy, query } from "firebase/firestore"
import moment from "moment"
import { Post } from "./interfaces/post"
import { db } from "./lib/firebase.config"

export const log = console.log

export const getAllPosts = async (): Promise<Post[]> => {

  //let posts: Post[] = []
  const postsSnap = await getDocs(query(collection(db, "posts_remix"), orderBy("createdAt", "desc")))

  return postsSnap.docs.map(doc => {
    const post = doc.data() as Post
    post.id = doc.id
    return post
  })
  /*
  postsSnap.forEach(doc => {
    posts.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description
    })
  })
  return posts
    */
}

export const validateEmail = (email: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



export const diffTime = (time1: Date, time2: Date = moment().toDate()) => {
  const hourDiff = moment(time2).diff(time1, "hours")
  const daysDiff = moment(time2).diff(time1, "days")
  const weeksDiff = moment(time2).diff(time1, "weeks")
  const monthsDiff = moment(time2).diff(time1, "months")
  const yearsDiff = moment(time2).diff(time1, "years")

  if (hourDiff < 1) {
    return `Just now`
  } else if (hourDiff < 24) {
    return `${hourDiff} hours ago`
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`
  } else if (weeksDiff < 4) {
    return `${weeksDiff} weeks ago`
  } else if (monthsDiff < 12) {
    return `${monthsDiff} months ago`
  } else {
    return `${yearsDiff} years ago`
  }
}
