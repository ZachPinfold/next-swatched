import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import store from "../store";
import Login from "../components/auth/Login";
import { useEffect } from "react";
import { startLoadUser } from "../actions/auth";

export default function Home() {
  useEffect(() => {
    store.dispatch(startLoadUser() as any);
  }, []);

  return (
    <div>
      <Provider store={store}>
        <h1>Helloyou upate</h1>
        <Login />
      </Provider>
    </div>
  );
}
