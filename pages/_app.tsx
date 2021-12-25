import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import NavBar from "../components/nav/NavBar";
import { useEffect, useState } from "react";
import ToTopImage from "../assets/images/to_top_swatch.svg";

function MyApp({ Component, pageProps }: AppProps) {
  const [compact, setCompact] = useState(false);

  console.log(compact);

  const trackScroll = () => {
    if (typeof window === "undefined") {
      return;
    } else {
      setCompact(window.scrollY >= 75);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScroll);

    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavBar compact={compact} />
      <Component {...pageProps} />
      <img
        style={{ opacity: compact ? "1" : "0" }}
        className="to_top_img"
        src={ToTopImage.src}
        alt="back_to_top_img"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </Provider>
  );
}
export default MyApp;
