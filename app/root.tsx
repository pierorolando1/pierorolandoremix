import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition
} from "remix";
import type { MetaFunction } from "remix";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import styles from "./tailwind.css";
import globalStyles from './styles.css'

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";

import Nprogress from 'nprogress';
import nprogressStyles from 'nprogress/nprogress.css';

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: nprogressStyles }
  ];
}

export const meta: MetaFunction = () => {
  return { title: "Piero Rolando", description: "Personal website and blog of Piero Rolando" }
}

export default function App() {

  const transition = useTransition();

  useEffect(() => {
    if (transition.state === 'loading' || transition.state === 'submitting') {
      Nprogress.start();
    } else {
      Nprogress.done();
    }
  }, [transition.state]);

  const darkTheme = createTheme({
    type: "dark"
  })

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <NextUIProvider theme={darkTheme}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === "development" && <LiveReload />}
          </NextUIProvider>
        </Provider>
      </body>
    </html>
  );
}
