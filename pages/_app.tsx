import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import NavBar from "../components/nav/NavBar";

import ToTopImage from "../assets/images/to_top_swatch.svg";
import { useState } from "react";
import Footer from "../components/footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [compact, setCompact] = useState(false);

  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
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
