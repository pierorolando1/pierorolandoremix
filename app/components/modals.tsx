import { Button, Input, Modal } from "@nextui-org/react"
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "~/lib/firebase.config";

export const AddNewPostModal = ({ open, setOpen }: { open: boolean, setOpen: Function }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const { content } = useSelector((state: any) => state.admin)

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "posts_remix"), {
        title,
        description,
        content,
        createdAt: new Date(),
      })
    } catch (error) {
      console.log(error)
    }

    setOpen(false)

  }

  return <Modal blur preventClose className="p-5" open={open}>
    <Input
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title" />
    <Input
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description" />
    <Button onClick={handleSave} className="mt-5">Save</Button>
  </Modal>
}
