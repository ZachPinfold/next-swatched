import app from "../firebase";
import { SwatchObject, LookupTypes } from "../types/swatches";
import { GetSwatchesActions } from "../types/types";
import { fireStoreQuery } from "../utils/api";
import { hexToRgb, rgb2hsv } from "../utils/swatch";
const { v4 } = require("uuid");

export const getUserSwatches = (
  swatches: SwatchObject[]
): GetSwatchesActions => ({
  type: "GET_SWATCHES",
  payload: swatches,
});

export const getInitalSwatches = (
  swatches: SwatchObject[]
): GetSwatchesActions => ({
  type: "GET_INITIAL_SWATCHES",
  payload: swatches,
});

export const addUserSwatch = (swatch: SwatchObject): GetSwatchesActions => ({
  type: "ADD_SWATCH",
  payload: swatch,
});

export const deleteUserSwatch = (swatch: SwatchObject): GetSwatchesActions => ({
  type: "DELETE_SWATCH",
  payload: swatch,
});

export const startGetUserSwatches =
  (userUid: string, colorFilter: string, isInitialLoad: boolean) =>
  async (dispatch: any) => {
    colorFilter === "all swatches" && (colorFilter = "all");

    let filterType: keyof LookupTypes = "color";

    colorFilter === "all" ? (filterType = "other") : (filterType = "color");

    try {
      const result = await fireStoreQuery(filterType, colorFilter);

      let resultArray: SwatchObject[] = [];

      if (result.docs) {
        resultArray = result.docs.map((doc: any) => {
          const data = doc.data();
          data.colourId = doc.id;
          return data;
        });
      }

      if (isInitialLoad) {
        dispatch(getInitalSwatches(resultArray));
      }

      resultArray.unshift({
        colourId: "none-colour",
        color: [6, 214, 160],
        timeAdded: new Date(),
      });

      if (result.docs) {
        dispatch(getUserSwatches(resultArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const startAddSwatchToSwatchList =
  (hex: string) => async (dispatch: any) => {
    try {
      const uniqueId: string = v4();

      const rgbColour: number[] = hexToRgb(hex);

      const swatchObject = {
        timeAdded: new Date(),
        color: rgbColour,
        colorName: rgb2hsv(rgbColour),
      };

      app
        .firestore()
        .collection("swatches")
        .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
        .collection("userSwatches")
        .doc(uniqueId)
        .set(swatchObject);

      const swatchForReducer = {
        timeAdded: new Date(),
        color: rgbColour,
        colourId: uniqueId,
      };

      dispatch(addUserSwatch(swatchForReducer));
    } catch (error) {
      console.log(error);
    }
  };

export const startDeleteSwatchFromSwatchList =
  (swatch: SwatchObject) => async (dispatch: any) => {
    try {
      app
        .firestore()
        .collection("swatches")
        .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
        .collection("userSwatches")
        .doc(swatch.colourId)
        .delete();

      dispatch(deleteUserSwatch(swatch));
    } catch (error) {
      console.log(error);
    }
  };
