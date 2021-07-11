import { AuthActionTypes } from "../types/types";
import { Auth } from "../types/Auth";

const inititalState: Auth = {
  isAuthenticated: false,
  loading: false,
  username: "",
  UserID: "",
};

const auth = (state: Auth = inititalState, action: AuthActionTypes): Auth => {
  switch (action.type) {
    case "LOGIN_AUTH":
      return {
        ...state,
        UserID: action.payload.UserID,
      };
    case "USER_LOADED":
      return {
        ...state,
        UserID: action.payload.UserID,
      };
    default:
      return state;
  }
};

export { auth };
