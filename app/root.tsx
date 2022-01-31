import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import { createTheme, NextUIProvider } from "@nextui-org/react";

import styles from "./tailwind.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {

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
