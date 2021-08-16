import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";
import { useEffect } from "react";
import { startLoadUser } from "../actions/auth";

export default function Home() {
  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  return (
    <div>
      <Provider store={store}>
        <h1>Get started by editing</h1>
        <Login />
        <Signup />
      </Provider>
    </div>
  );
}
