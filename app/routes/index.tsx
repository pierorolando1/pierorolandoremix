import { Button } from "@nextui-org/react";
import { Link } from "remix";

export default function Index() {
  return (
    <>
      <NavBar />
      <section className="flex flex-col items-center justify-center min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
        <h1>Hello world, I'm Piero Rolando</h1>
        <div className="my-10 flex max-w-4xl justify-center w-full mx-auto h-7">
          <a href="https://gitlab.com/piero_rolando" target="_blank" className="w-20 h-7">
            <img className="grayscale w-full h-full opacity-70" src="https://cdn.svgporn.com/logos/gitlab.svg" />
          </a>
          <a href="https://github.com/pierorolando1" target="_blank" className="w-20 h-7">
            <img className="grayscale w-full h-full opacity-50" style={{ filter: 'invert(1)' }} src="https://cdn.svgporn.com/logos/github-icon.svg" />
          </a>
          <a href="https://stackoverflow.com/users/15279700/piero-rolando" target="_blank" className="w-20 h-7">
            <img className="grayscale w-full h-full opacity-70" src="https://cdn.svgporn.com/logos/stackoverflow-icon.svg" />
          </a>
          <a href="https://www.linkedin.com/in/piero-rolando-8770ba203/" target="_blank" className="w-20 h-7">
            <img className="grayscale w-full h-full" src="https://cdn.svgporn.com/logos/linkedin-icon.svg" />
          </a>
        </div>
        <Link to={"/blog"}>
          <Button shadow>Go to Blog</Button>
        </Link>
      </section>
      <section className="min-h-screen">
        <h2>Proyects</h2>
      </section>
    </>
  );
}

const NavBar = () => {
  return (
    <nav className="fixed px-2 h-20 bg-black/70 backdrop-blur-md w-full" style={{ zIndex: 1000 }}>
      <div
        className="flex items-center mx-auto max-w-5xl justify-between h-full"
      >
        <h4></h4>
        <a href="https://twitter.com/pierorolando1_" target="_blank">Follow me</a>
      </div>
    </nav>
  )
}
