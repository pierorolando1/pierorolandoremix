import { DataFunctionArgs } from "@remix-run/server-runtime";
import { MDXRemote } from "next-mdx-remote"
import { useLoaderData } from "remix"
import { getSourceFromSource } from "~/lib/mdx";
import { log } from "~/utils";

export const loader = async (ctx: DataFunctionArgs) => {

  log(ctx.request.query)

  const { source } = await getSourceFromSource(adminState.content)
  return { source };
}


export default () => {
  const { source } = useLoaderData()

  return (
    <MDXRemote {...source} />
  )
}
