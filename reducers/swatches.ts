import { GetSwatchesActions, AddSwatchesActions } from "../types/types";
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
        swatches: payload.swatches,
        loading: false,
      };
    default:
      return state;
  }
};

export { swatches };
