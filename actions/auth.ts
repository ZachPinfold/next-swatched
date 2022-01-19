import { Dispatch } from "redux";
import { AuthActionTypes } from "../types/types";
import app from "../firebase";

export const login = (UserID: string): AuthActionTypes => ({
  type: "LOGIN_AUTH",
  payload: { UserID },
});

export const signup = (UserID: string): AuthActionTypes => ({
  type: "SIGNUP_AUTH",
  payload: { UserID },
});

export const loadUser = (UserID: string): AuthActionTypes => ({
  type: "USER_LOADED",
  payload: { UserID },
});

export const authError = (): AuthActionTypes => ({
  type: "AUTH_ERROR",
});

export const startLoadUser =
  () => async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      app.auth().onAuthStateChanged((user: any) => {
        if (user === null) {
          dispatch(authError());
        } else {
          const { uid } = user;
          dispatch(loadUser(uid));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

export const startSignup =
  (email: string, password: string) => async (dispatch: any) => {
    // try {
    //   const data = await app
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password);
    //   const { uid } = data.user;
    //   dispatch(login(uid));
    // } catch (error) {
    //   console.log("error-" + error);
    // }
  };

export const startLogin =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const data = await app.auth().signInWithEmailAndPassword(email, password);
      const { uid } = data.user;
      dispatch(login(uid));
    } catch (error) {
      console.log("error-" + error);
    }
  };

export const startLogout =
  (email: string, password: string) => async (dispatch: any) => {};
