import { SwatchActionTypes } from "../types/types";
import { Swatches } from "../types/swatches";

const inititalState: Swatches = {
  swatches: [""],
  loading: false,
};

const auth = (
  state: Swatches = inititalState,
  action: SwatchActionTypes
): Swatches => {
  switch (action.type) {
    case "GET_SWATCHES":
      return {
        ...state,
        swatches: ["", ""],
        loading: false,
      };
    default:
      return state;
  }
};

export { auth };
