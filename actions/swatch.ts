import app from "../firebase";
import { AddSwatchObject, SwatchObject } from "../types/swatches";
import { GetSwatchesActions } from "../types/types";
import { hexToRgb } from "../utils/swatch";

export const getUserSwatches = (
  swatches: SwatchObject[]
): GetSwatchesActions => ({
  type: "GET_SWATCHES",
  payload: swatches,
});

export const addUserSwatch = (swatch: AddSwatchObject): GetSwatchesActions => ({
  type: "ADD_SWATCH",
  payload: swatch,
});

export const startGetUserSwatches =
  (userUid: string) => async (dispatch: any) => {
    try {
      const result = await app
        .firestore()
        .collection("swatches")
        .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
        .collection("userSwatches")
        .get();

      let resultArray: SwatchObject[] = [];

      if (result.docs) {
        resultArray = result.docs.map((doc: any) => doc.data());
      }

      resultArray.push({
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
      const rgbColour: number[] = hexToRgb(hex);

      const swatchObject = {
        timeAdded: new Date(),
        color: rgbColour,
      };
      const result = await app
        .firestore()
        .collection("swatches")
        .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
        .collection("userSwatches")
        .add(swatchObject);
      dispatch(addUserSwatch(swatchObject));
    } catch (error) {
      console.log(error);
    }
  };
