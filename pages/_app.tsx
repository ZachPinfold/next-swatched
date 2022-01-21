import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import NavBar from "../components/nav/NavBar";

import ToTopImage from "../assets/images/to_top_swatch.svg";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import PrivateRoute from "../components/routing/PrivateRoute";
import { startLoadUser } from "../actions/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  return (
    <Provider store={store}>
      <NavBar />
      {Component.displayName && Component.displayName.includes("Home") ? (
        <Component {...pageProps} />
      ) : (
        <PrivateRoute Component={<Component {...pageProps} />}></PrivateRoute>
      )}

      <img
        style={{ opacity: compact ? "1" : "0" }}
        className="to_top_img"
        src={ToTopImage.src}
        alt="back_to_top_img"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <Footer />
    </Provider>
  );
}
export default MyApp;
