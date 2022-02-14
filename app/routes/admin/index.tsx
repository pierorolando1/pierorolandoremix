import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import MarkdownMonaco from "~/components/markdown_with_monaco";
import { AddNewPostModal } from "~/components/modals";
import { log } from "~/utils";

export default () => {

  const [addModal, setAddModal] = useState(false)

  const adminState = useSelector(state => (state as any).admin);

  const initialValue = `---
meta:
  title: Title
  description: Description
---`
  return (
    <>
      <AddNewPostModal open={addModal} setOpen={setAddModal} />
      <MarkdownMonaco initialValue={initialValue} />
      <Button onClick={() => {
        setAddModal(true)
        log(adminState.content)
      }}>Save</Button>
    </>
  )
}

