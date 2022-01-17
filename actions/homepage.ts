import axios from "axios";
import { HomeSwatchActions } from "../types/types";

export const getHomepageSwatches = (
  swatches: number[][]
): HomeSwatchActions => ({
  type: "GET_HOME_SWATCH",
  payload: swatches,
});

export const startGetHomepageSwatches = () => async (dispatch: any) => {
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
