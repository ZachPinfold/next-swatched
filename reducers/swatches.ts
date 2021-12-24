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
      const newArrayWithoutLast = state.swatches.slice(1);
      const firstElement = state.swatches[0];

      console.log();

      return {
        ...state,
        swatches:
          "colourId" in payload
            ? [firstElement, payload, ...newArrayWithoutLast]
            : [],
        loading: false,
      };
    case "DELETE_SWATCH":
      return {
        ...state,
        swatches:
          "colourId" in payload
            ? state.swatches.filter((e) => e.colourId !== payload.colourId)
            : [],
        loading: false,
      };
    default:
      return state;
  }
};

export { swatches };
