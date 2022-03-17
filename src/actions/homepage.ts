import axios from "axios";
import { HomeSwatchActions } from "../types/types";
import { Dispatch } from "redux";

export const getHomepageSwatches = (
  swatches: number[][]
): HomeSwatchActions => ({
  type: "GET_HOME_SWATCH",
  payload: swatches,
});

export const clearHomepageSwatches = () => ({
  type: "CLEAR_HOME_SWATCHES",
});

export const startGetHomepageSwatches =
  () => async (dispatch: Dispatch<HomeSwatchActions>) => {
    try {
      try {
        const data = {
          model: "default",
        };

        const apiResponse = await axios.post("/api/colorMind", data);

        const { colourData } = apiResponse.data;

        if (colourData) {
          dispatch(getHomepageSwatches(colourData));
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const startClearHomepageSwatches = () => async (dispatch: Dispatch) => {
  dispatch(clearHomepageSwatches());
};
