import { Button } from "@nextui-org/react"
import { ProtectedPage } from "~/components/protected_page"
import Editor, { useMonaco } from '@monaco-editor/react'

import { useNavigate } from 'remix'
import { MDXRemote } from "next-mdx-remote"
import matter from "gray-matter"
import { useSelector } from "react-redux"
import { serialize } from "next-mdx-remote/serialize"
//@ts-ignore
import mdxPrism from 'mdx-prism'
import { useEffect, useState } from "react"
import { getSourceFromSource } from "~/lib/mdx"

export default () => {

  const navigate = useNavigate()

  const monaco = useMonaco()
  monaco?.editor.defineTheme('my-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],

    colors: {
      'editor.background': '#000000',
    },
  });

  const initialValue = `---
meta:
  title: Title
  description: Description
headers:
  Cache-Control: no-cache
---`
  return (
    <ProtectedPage>
      <div className="h-[20vh] flex min-h-screen items-center justify-center flex-col">
        <h1>Hi Admin</h1>
        <Button.Group ghost color="primary" bordered>
          <Button
            onClick={() => {
              navigate('/admin')
            }}
          >Add post</Button>
          <Button
            onClick={() => navigate('/admin/posts')}
          >See posts</Button>
        </Button.Group>
        <div className="flex w-full h-full">
          <Editor
            height="80vh"
            width="100%"
            className="h-full w-full mx-10"
            language="markdown"
            theme="my-theme"
            value={initialValue}
            options={{
              minimap: {
                lineNumbers: 'off',
                glyphMargin: false,
                folding: false,
                // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882         
                enabled: false
              },
              scrollBeyondLastLine: false,
            }}
          />
          <Preview />
        </div>
      </div>

    </ProtectedPage>
  )
}

const Preview = () => {

  const [sourceState, setSourceState] = useState<any>({
    loading: true,
    source: null
  })

  const adminState = useSelector((state: any) => state.admin)

  useEffect(() => {

    (async () => {
      const { source } = await getSourceFromSource(adminState.content)
      setSourceState({
        loading: false,
        source
      })
    })()

  }, [])

  return (
    <div className="bg-red-500 w-full h-full mr-5">
      {
        //!sourceState.loading && <MDXRemote {...sourceState.source} />
      }
    </div>
  )
}

