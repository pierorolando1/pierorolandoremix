import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "remix";
import Truncate from "react-truncate";
import { changeTitle, setBackButton, unSetBackButton } from "../redux/blog.actions";
import { Input, Modal, Spacer } from "@nextui-org/react";
import { closeModal, openModal } from "~/redux/modal.actions";

export default function Blog() {

  const dispatch = useDispatch()
  const blogState = useSelector((state: any) => state.blog)
  const modalState = useSelector((state: any) => state.modal)

  const handleBack = () => {
    dispatch(unSetBackButton())
    dispatch(changeTitle("Posts"))
  }

  useEffect(() => {
    location.pathname != "/blog" &&
      dispatch(setBackButton())
  }, [])

  return (
    <>
      <nav className="h-64 bg-black relative">
        <div className="absolute right-0 flex flex-col justify-end items-start left-0 w-full h-full z-50 max-w-5xl mx-auto">
          <div className="w-full h-full pt-5 flex">
            {
              blogState.backButton &&
              <Link
                onClick={handleBack}
                to="/blog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="m-4 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </Link>
            }
            <div onClick={() => dispatch(openModal())} className="cursor-pointer bg-black/50 rounded-full w-10 h-10 mr-1 hover:bg-black/70 ml-auto flex items-center justify-center transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-white/90 w-full md:text-5xl text-4xl px-6 xl:px-0 tracking-wide">
            <Truncate lines={1}>
              {blogState.title}
            </Truncate>
          </h1>
        </div>
        <div
          className="absolute top-0 left-0 z-0 opacity-40 w-full h-full"
          style={{
            background: 'url(https://miro.medium.com/max/3840/1*wP3wfQNALdIE_4ihdWEXAg.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      </nav>
      <section className="max-w-5xl mx-auto min-h-screen py-5">
        <Modal
          closeButton
          blur
          className="pb-5 pt-5"
          open={modalState.open}
          onClose={() => dispatch(closeModal())}
        >
          <Modal.Header>
            <Input autoFocus width="100%" labelPlaceholder="Search..." />
          </Modal.Header>
        </Modal>
        <Outlet />
        <Spacer y={3} />
        <Link to="/" className="text-center px-5 mt-24 w-full mx-auto max-w-5xl">Go home</Link>
      </section>
    </>
  )
}
