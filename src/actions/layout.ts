import { Dispatch } from "react";
import { LayoutActions } from "../types/types";

export const isCompactCall = (isCompact: boolean): LayoutActions => ({
  type: "SET_COMPACT_SCREEN",
  payload: isCompact,
});

export const showModal = (
  isCompact: boolean,
  modalType: string
): LayoutActions => ({
  type: "SET_SHOW_MODAL",
  payload: { isCompact, modalType },
});

export const isLargeWindow = (isLarge: boolean): LayoutActions => ({
  type: "SET_RESPONSIVE_SIZE",
  payload: isLarge,
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
  (openModal: boolean, modalType: string) =>
  async (dispatch: Dispatch<LayoutActions>) => {
    try {
      dispatch(showModal(openModal, modalType));
    } catch (error) {
      console.log(error);
    }
  };

export const startIsResponsive =
  (isLarge: boolean) => async (dispatch: Dispatch<LayoutActions>) => {
    try {
      dispatch(isLargeWindow(isLarge));
    } catch (error) {
      console.log(error);
    }
  };
