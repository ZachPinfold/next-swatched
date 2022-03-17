import app from "../firebase";
import { LookupTypes } from "../types/swatches";

interface ObjTypes {
  color: Promise<any>;
  other: Promise<any>;
}

export const fireStoreQuery = async (
  type: keyof LookupTypes,
  input: String
) => {
  const apiObject: ObjTypes = {
    color: await app
      .firestore()
      .collection("swatches")
      .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
      .collection("userSwatches")
      .where("colorName", "==", input)
      .get(),
    other: await app
      .firestore()
      .collection("swatches")
      .doc("k9V6LdYhaIQX45WobnePdxt6tHB2")
      .collection("userSwatches")
      .orderBy("timeAdded", "desc")
      .get(),
  };

  return apiObject[type];
};
