import app from "../firebase";
import { LookupTypes } from "../types/swatches";

interface ObjTypes {
  color: Promise<any>;
  other: Promise<any>;
}

export const fireStoreQuery = async (
  type: keyof LookupTypes,
  input: String,
  userID: string
) => {
  const apiObject: ObjTypes = {
    color: await app
      .firestore()
      .collection("swatches")
      .doc(userID)
      .collection("userSwatches")
      .where("colorName", "==", input)
      .get(),
    other: await app
      .firestore()
      .collection("swatches")
      .doc(userID)
      .collection("userSwatches")
      .orderBy("timeAdded", "desc")
      .get(),
  };

  return apiObject[type];
};
