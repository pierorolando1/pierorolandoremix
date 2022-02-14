import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/lib/firebase.config";
import { Loading } from "@nextui-org/react";
import { log } from "~/utils";

/**
* If the user is auth, redirect to admin, else, show the content
*/
export const PublicPage = ({ children }: any) => {

  const [state, setState] = useState({
    isAuth: false,
    isLoading: true,
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      log(user)
      if (user) {
        setState({ isAuth: true, isLoading: false })
      } else {
        setState({ isAuth: false, isLoading: false })
      }
    });

  }, [])


  return (
    <>
      {
        state.isLoading ?
          <div className="h-screen flex items-center justify-center w-full"><Loading type="spinner" size="lg" /></div>
          :
          !state.isAuth ?
            children
            :
            <Redirect to="/admin" />
      }
    </>
  );
}

const Redirect = ({ to }: any) => {

  useEffect(() => {
    window.location.href = to;
  }, [to])

  return null
}
