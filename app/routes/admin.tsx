import { Button } from "@nextui-org/react"
import { ProtectedPage } from "~/components/protected_page"
import { useMonaco } from '@monaco-editor/react'

import { Outlet, useNavigate } from 'remix'

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
        <Outlet />
      </div>

    </ProtectedPage>
  )
}

