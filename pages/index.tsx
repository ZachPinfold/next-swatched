import styles from "../styles/Home.module.css";
import { Provider } from "react-redux";
import store from "../store";
// import Login from "../components/auth/Login";

export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <h1>Helloyou upate</h1>
        {/* <Login /> */}
      </Provider>
    </div>
  );
}
