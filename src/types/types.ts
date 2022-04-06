import { SwatchObject } from "./swatches";

// AUTH

export const LOGIN_AUTH = "LOGIN_AUTH";
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const SIGNUP_AUTH = "SIGNUP_AUTH";
export const LOGOUT = "LOGOUT";

// SWATCHES

export const GET_SWATCHES = "GET_SWATCHES";
export const GET_INITIAL_SWATCHES = "GET_INITIAL_SWATCHES";
export const ADD_SWATCH = "ADD_SWATCH";
export const DELETE_SWATCH = "DELETE_SWATCH";

// LAYOUT

export const SET_COMPACT_SCREEN = "SET_COMPACT_SCREEN";
export const SET_SHOW_MODAL = "SET_SHOW_MODAL";
export const SET_RESPONSIVE_SIZE = "SET_RESPONSIVE_SIZE";

// HOME

export const GET_HOME_SWATCH = "GET_HOME_SWATCH";
export const CLEAR_HOME_SWATCHES = "CLEAR_HOME_SWATCHES";

// TUTORIAL

export const SET_SWATCHES_TUTORIAL = "SET_SWATCHES_TUTORIAL";

// Interfaces

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
  payload: string;
}

export interface Logout {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginAction
  | LogoutAction
  | LoadUserAction
  | AuthError
  | SignUpAction
  | Logout;

export interface GetSwatchesAction {
  type: typeof GET_SWATCHES;
  payload: SwatchObject[];
}

export interface AddSwatchesActions {
  type: typeof ADD_SWATCH;
  payload: SwatchObject;
}

export interface DeleteSwatchesActions {
  type: typeof DELETE_SWATCH;
  payload: SwatchObject;
}

export type GetSwatchesActions =
  | GetSwatchesAction
  | AddSwatchesActions
  | DeleteSwatchesActions;

// LAYOUT

export interface IsCompactAction {
  type: typeof SET_COMPACT_SCREEN;
  payload: boolean;
}

export interface ModalAction {
  type: typeof SET_SHOW_MODAL;
  payload: { isCompact: boolean; modalType: string };
}

export interface ResponsiveAction {
  type: typeof SET_RESPONSIVE_SIZE;
  payload: boolean;
}

export type LayoutActions = IsCompactAction | ModalAction | ResponsiveAction;

// HOMEPAGE

export interface HomepageAction {
  type: typeof GET_HOME_SWATCH;
  payload: number[][];
}

export interface HomepageClearAction {
  type: typeof CLEAR_HOME_SWATCHES;
}

export type HomeSwatchActions = HomepageAction | HomepageClearAction;

// TUTORIAL

export interface SwatchesTutorial {
  type: typeof SET_SWATCHES_TUTORIAL;
  payload: number;
}

export type TutoralActions = SwatchesTutorial;
