import { Dispatch } from "redux";
import { AuthActionTypes } from "../types/types";
import app from "../firebase";
import { NextRouter } from "next/router";
import { showModal } from "./layout";
import { initialUserArray } from "../misc/misc";
import { SetStateAction } from "react";
const { v4 } = require("uuid");

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

export const logout = (): AuthActionTypes => ({
  type: "LOGOUT",
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
    try {
      const data = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { uid } = data.user;
      dispatch(login(uid));
      initialUserArray.forEach((swatch) => {
        app
          .firestore()
          .collection("swatches")
          .doc(uid)
          .collection("userSwatches")
          .add(swatch);
      });
    } catch (error) {
      console.log("error-" + error);
    }
  };

export const startLogin =
  (
    email: string,
    password: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>> | null
  ) =>
  async (dispatch: any) => {
    try {
      const data = await app.auth().signInWithEmailAndPassword(email, password);
      const { uid } = data.user;
      dispatch(login(uid));
      dispatch(showModal(false, ""));
      if (uid && setLoading) setLoading(false);
    } catch (error) {
      console.log("error-" + error);
    }
  };

export const startLogout =
  (router: NextRouter) => async (dispatch: Dispatch) => {
    try {
      app.auth().signOut();
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
