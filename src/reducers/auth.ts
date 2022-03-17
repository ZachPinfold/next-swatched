import { AuthActionTypes } from "../types/types";
import { Auth } from "../types/Auth";

const inititalState: Auth = {
  isAuthenticated: false,
  loading: true,
  username: "",
  UserID: "",
};

const auth = (state: Auth = inititalState, action: AuthActionTypes): Auth => {
  switch (action.type) {
    case "LOGIN_AUTH":
      return {
        ...state,
        UserID: action.payload.UserID,
        loading: false,
        isAuthenticated: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        UserID: action.payload.UserID,
        isAuthenticated: true,
        loading: false,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        UserID: "",
      };
    default:
      return state;
  }
};

export { auth };
