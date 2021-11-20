export const LOGIN_AUTH = "LOGIN_AUTH";
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const SIGNUP_AUTH = "SIGNUP_AUTH";
export const GET_SWATCHES = "GET_SWATCHES";

export interface LoginAction {
  type: typeof LOGIN_AUTH;
  payload: { UserID: string };
}

export interface SignUpAction {
  type: typeof SIGNUP_AUTH;
  payload: { UserID: string };
}

export interface LogoutAction {
  type: typeof LOGOUT_AUTH;
}

export interface LoadUserAction {
  type: typeof USER_LOADED;
  payload: { UserID: string };
}

export interface AuthError {
  type: typeof AUTH_ERROR;
}

export type AuthActionTypes =
  | LoginAction
  | LogoutAction
  | LoadUserAction
  | AuthError
  | SignUpAction;

export interface GetSwatchesAction {
  type: typeof GET_SWATCHES;
  payload: { UserID: string };
}

export type SwatchActionTypes = GetSwatchesAction;
