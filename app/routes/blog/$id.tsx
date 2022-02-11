import { MDXRemote } from "next-mdx-remote";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "remix";
import { getFileBySlug } from "~/lib/mdx";
import { changeTitle, setBackButton } from "~/redux/blog.actions";
import { log } from "~/utils";

export const loader = async ({ params }: any) => {

  log(params)

  const { source, frontmatter } = await getFileBySlug(params.id);
  return { source, frontmatter };
}

export default () => {
  const dispatch = useDispatch()

  const handleChangeToPost = () => {
    log(frontmatter)
    dispatch(changeTitle(frontmatter.meta.title))
    dispatch(setBackButton())
  }

  useEffect(() => {
    handleChangeToPost()
  }, [])

  const { source, frontmatter } = useLoaderData()
  return <article className="xl:px-0 px-5 py-5">
    <MDXRemote {...source} />
  </article>
}
