import { MDXRemote } from "next-mdx-remote";
import { useLoaderData } from "remix";
import { getFileBySlug } from "~/lib/mdx";

export const loader = async ({ params }: any) => {
  const { source, frontmatter } = await getFileBySlug("hola");
  return { source, frontmatter };
}

export default () => {

  const { source, frontmatter } = useLoaderData()
  return <MDXRemote {...source} />
}
