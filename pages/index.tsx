import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import { useEffect, useState } from "react";
import { startLoadUser } from "../actions/auth";
import ModalWrapper from "../components/auth/Modal/ModalWrapper";
import SwatchPicker from "../components/SwatchPicker/SwatchPicker";
import axios from "axios";

interface InitialSwatch {
  swatches: number[][];
}

export default function Home({ swatches }: InitialSwatch) {
  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  const [modal, showModal] = useState(false);

  return (
    <div>
      <Provider store={store}>
        <SwatchPicker swatches={swatches} />
        {/* <h1>Get started by editing</h1> */}
        {/* <Signup /> */}
        {/* {modal && <ModalWrapper Component={<Login />} showModal={showModal} />} */}
        {/* <button onClick={() => showModal(true)}>Login</button> */}
      </Provider>
    </div>
  );
}

export async function getStaticProps() {
  let result;

  try {
    const url = "http://colormind.io/api/";
    const data = {
      model: "default",
    };
    const headers = {
      "Content-Type": "text/plain",
    };
    const colorPallete = await axios.post(url, data, { headers });
    result = colorPallete.data.result;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      swatches: result,
    }, // will be passed to the page component as props
  };
}
