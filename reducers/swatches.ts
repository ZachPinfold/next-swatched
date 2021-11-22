import { GetSwatchesActions } from "../types/types";
import { Swatches } from "../types/swatches";

const inititalState: Swatches = {
  swatches: [],
  loading: false,
};

const swatches = (
  state: Swatches = inititalState,
  action: GetSwatchesActions
): Swatches => {
  const { payload, type } = action;

  switch (type) {
    case "GET_SWATCHES":
      return {
        ...state,
        swatches: payload.constructor === Array ? payload : [],
        loading: false,
      };
    case "ADD_SWATCH":
      return {
        ...state,
        swatches: "colourId" in payload ? [...state.swatches, payload] : [],
        loading: false,
      };
    default:
      return state;
  }
};

export { swatches };
