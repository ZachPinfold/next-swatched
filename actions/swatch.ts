import app from "../firebase";
import { SwatchObject } from "../types/swatches";
import { GetSwatchesActions } from "../types/types";

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

export const startGetUserSwatches =
  (userUid: string) => async (dispatch: any) => {
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
      order: resultArray.length,
    });

    if (result.docs) {
      dispatch(getUserSwatches(resultArray));
    }
  };

export const startAddSwatchToSwatchList = () => async (dispatch: any) => {
  const swatchObject = {
    colourId: "none-colour",
    color: [6, 214, 160],
    order: 1,
  };

  dispatch(addUserSwatch(swatchObject));
};
