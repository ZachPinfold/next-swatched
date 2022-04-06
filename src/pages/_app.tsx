import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import NavBar from "../components/nav/NavBar";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import PrivateRoute from "../components/routing/PrivateRoute";
import { startLoadUser, startLogin } from "../actions/auth";

const authAllowId = process.env.NEXT_PUBLIC_AUTH_ALLOW_ID;
const authAllowEmail = process.env.NEXT_PUBLIC_AUTH_ALLOW_EMAIL;
const authAllowPassword = process.env.NEXT_PUBLIC_AUTH_ALLOW_PASSWORD;

function MyApp({ Component, pageProps }: AppProps) {
  const [authLoading, setLoading] = useState(true);

  const router = useRouter();

  // Here we check to see if the folio query has been passed
  // If so, we log the user in as a test user from the .env variables

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const sessionId = urlSearchParams.get("authAllow");

    if (sessionId === authAllowId && authAllowEmail && authAllowPassword) {
      store.dispatch(
        startLogin(authAllowEmail, authAllowPassword, setLoading, null) as any
      );
    } else if (!sessionId) {
      setLoading(false);
    } else setLoading(false);
  }, []);

  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  return authLoading ? (
    <></>
  ) : (
    <Provider store={store}>
      <NavBar />
      {router.pathname === "/swatches" ? (
        <PrivateRoute Component={<Component {...pageProps} />}></PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )}

      <Footer />
    </Provider>
  );
}
export default MyApp;
