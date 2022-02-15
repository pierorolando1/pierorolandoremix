import { Button } from "@nextui-org/react"
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useLoaderData } from "remix";
import MarkdownMonaco from "~/components/markdown_with_monaco"
import { db } from "~/lib/firebase.config";

export const loader = async ({ params }: DataFunctionArgs) => {
  const docRef = doc(db, "posts_remix", params.id as string)
  const docSnap = await getDoc(docRef);

  return {
    content: docSnap.data()!.content,
    params
  }
}

export default () => {

  const { content } = useSelector(state => (state as any).admin)

  const loaderData = useLoaderData()

  const handleUpdate = async () => {
    const postRef = doc(db, "posts_remix", loaderData.params.id as string)

    // Set the "capital" field of the city 'DC'
    await updateDoc(postRef, {
      content
    })
  }

  return (
    <>
      <MarkdownMonaco initialValue={loaderData.content} />
      <Button
        onClick={handleUpdate}
      >Update</Button>
    </>
  )
}

