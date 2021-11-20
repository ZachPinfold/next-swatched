import app from "../firebase";
import { SwatchObject } from "../types/swatches";
import { SwatchActionTypes } from "../types/types";

export const getUserSwatches = (
  swatches: SwatchObject[]
): SwatchActionTypes => ({
  type: "GET_SWATCHES",
  payload: { swatches },
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

    if (result.docs) {
      dispatch(getUserSwatches(resultArray));
    }
    // if (result.exists) {
    //   console.log(result);
    // }
  };
