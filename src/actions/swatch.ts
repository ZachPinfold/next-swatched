import app from "../firebase";
import { SwatchObject, LookupTypes } from "../types/swatches";
import { GetSwatchesActions } from "../types/types";
import { fireStoreQuery } from "../utils/api";
import { rgb2hsv } from "../utils/swatch";
const { v4 } = require("uuid");

export const getUserSwatches = (
  swatches: SwatchObject[]
): GetSwatchesActions => ({
  type: "GET_SWATCHES",
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
      const result = await fireStoreQuery(filterType, colorFilter, userUid);

      let resultArray: SwatchObject[] = [];

      if (result.docs) {
        resultArray = result.docs.map((doc: any) => {
          const data = doc.data();
          data.colourId = doc.id;

          return data;
        });
      }

      if (result.docs) {
        dispatch(getUserSwatches(resultArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const startAddSwatchToSwatchList =
  (rgbColour: number[], userID: string) => async (dispatch: any) => {
    try {
      const swatchObject = {
        timeAdded: new Date(),
        color: rgbColour,
        colorName: rgb2hsv(rgbColour),
      };

      const firestoreColor = await app
        .firestore()
        .collection("swatches")
        .doc(userID)
        .collection("userSwatches")
        .add(swatchObject);

      const { id } = firestoreColor;

      const swatchForReducer = {
        timeAdded: new Date(),
        color: rgbColour,
        colourId: id,
      };

      dispatch(addUserSwatch(swatchForReducer));
    } catch (error) {
      console.log(error);
    }
  };

export const startDeleteSwatchFromSwatchList =
  (swatch: SwatchObject, userID: string) => async (dispatch: any) => {
    try {
      app
        .firestore()
        .collection("swatches")
        .doc(userID)
        .collection("userSwatches")
        .doc(swatch.colourId)
        .delete();

      dispatch(deleteUserSwatch(swatch));
    } catch (error) {
      console.log(error);
    }
  };
