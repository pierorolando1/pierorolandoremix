import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { changeContent } from "~/redux/admin.duck";

export default ({ initialValue }: { initialValue: string }) => {

  const adminState = useSelector((state: any) => state.admin)

  const dispatch = useDispatch()

  const [totalLoading, setTotalLoading] = useState(false)

  useEffect(() => {
    setTotalLoading(true)
  }, [])

  const monaco = useMonaco()
  monaco?.editor.defineTheme('my-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [],

    colors: {
      'editor.background': '#000000',
    },
  });

  return (
    <div className="flex w-full">
      <Editor
        height="80vh"
        width="100%"
        className="h-full w-full mx-10"
        language="markdown"
        theme="my-theme"
        value={initialValue ?? adminState.content}
        onChange={(value) => {
          dispatch(changeContent(value as string))
        }}
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
      {
        totalLoading &&
        <ReactMarkdown className="h-[80vh] overflow-auto w-full" children={deleteMetaLines(adminState.content)} />
      }
      {/*<Button>Preview</Button>*/}
    </div>
  )
}

const deleteMetaLines = (str: string) => {
  const lines = str.split('\n')
  const firstTreeLines = lines.slice(0, 4)

  const newLines = lines.filter((line) => !firstTreeLines.includes(line))
  return newLines.join('\n')
}

