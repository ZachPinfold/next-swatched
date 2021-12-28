import { LayoutActions } from "../types/types";

export const isCompactCall = (isCompact: boolean): LayoutActions => ({
  type: "SET_COMPACT_SCREEN",
  payload: isCompact,
});

export const startIsCompact = (isCompact: number) => async (dispatch: any) => {
  const isScreenCompact: boolean = isCompact >= 75;

  try {
    dispatch(isCompactCall(isScreenCompact));
  } catch (error) {
    console.log(error);
  }
};
