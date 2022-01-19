import { Dispatch } from "react";
import { LayoutActions } from "../types/types";

export const isCompactCall = (isCompact: boolean): LayoutActions => ({
  type: "SET_COMPACT_SCREEN",
  payload: isCompact,
});

export const showModal = (isCompact: boolean): LayoutActions => ({
  type: "SET_SHOW_MODAL",
  payload: isCompact,
});

export const startIsCompact =
  (isCompact: number) => async (dispatch: Dispatch<LayoutActions>) => {
    const isScreenCompact: boolean = isCompact >= 75;

    try {
      dispatch(isCompactCall(isScreenCompact));
    } catch (error) {
      console.log(error);
    }
  };

export const startShowModal =
  (openModal: boolean) => async (dispatch: Dispatch<LayoutActions>) => {
    try {
      dispatch(showModal(openModal));
    } catch (error) {
      console.log(error);
    }
  };
