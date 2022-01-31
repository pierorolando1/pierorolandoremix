import { useSelector } from "react-redux";
import { Outlet } from "remix";

export default function Blog() {

  const blogState = useSelector((state: any) => state.blog)

  return (
    <>
      <nav className="h-64 bg-black relative">
        <div className="absolute right-0 flex flex-col justify-end items-start left-0 w-full h-full z-50 max-w-5xl mx-auto">
          <div className="w-full h-full pt-5">
            <div className="bg-black/80 rounded-full w-10 h-10 ml-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <h1>
            {blogState.title}
          </h1>
        </div>
        <div
          className="absolute top-0 left-0 z-0 opacity-40 w-full h-full"
          style={{
            background: 'url(https://miro.medium.com/max/3840/1*wP3wfQNALdIE_4ihdWEXAg.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundClip: 'cover'
          }}
        />
      </nav>
      <section className="max-w-5xl mx-auto min-h-screen py-5">

        <Outlet />
      </section>
    </>
  )
}
