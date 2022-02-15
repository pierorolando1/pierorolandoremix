import { Button, Modal } from "@nextui-org/react"
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
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

  const [modal, setModal] = useState({ open: false, message: "", color: "text-green-500" })

  const loaderData = useLoaderData()

  const handleUpdate = async () => {
    try {
      const postRef = doc(db, "posts_remix", loaderData.params.id as string)
      await updateDoc(postRef, {
        content
      })

      setModal({ open: true, message: "Post updated", color: "text-green-500" })
    } catch (error) {
      setModal({ open: true, message: error + '', color: "text-red-500" })
      console.error(error)
    }
  }

  return (
    <>
      <Modal open={modal.open} blur className="py-5">
        <h3>{modal.message}</h3>
        <h2 className={modal.color}>👍</h2>
      </Modal>
      <MarkdownMonaco initialValue={loaderData.content} />
      <Button
        onClick={handleUpdate}
      >Update</Button>
    </>
  )
}

