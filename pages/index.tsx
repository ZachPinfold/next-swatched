import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import { useEffect, useState } from "react";
import { startLoadUser } from "../actions/auth";
import ModalWrapper from "../components/auth/Modal/ModalWrapper";

export default function Home() {
  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  const [modal, showModal] = useState(false);

  return (
    <div>
      <Provider store={store}>
        <h1>Get started by editing</h1>
        <Signup />
        <ModalWrapper Component={<Login />} showModal={showModal} />
        <button onClick={() => showModal(true)}></button>
      </Provider>
    </div>
  );
}
