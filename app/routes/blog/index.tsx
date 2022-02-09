import { CardItem } from "~/components/carditem"

import { useLoaderData } from "remix"

import fs from './fs.server'
import { log } from "~/utils"

export const loader = async () => {

  const root = process.cwd()

  log(root)
  const files = await fs.readdir(root + "/posts")
  //fs.readdirSync()

  return {
    posts: files
  }
}

export default function Blog() {

  const a = useLoaderData()

  log(a)

  return (
    <>
      <section>
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
        <CardItem slug="1" title="Hola" description="Valerie te amo" />
      </section >
    </>
  )
}
