import { HomeSwatchActions } from "../types/types";

export interface HomeAction {
  discoverSwatches: number[][];
}

const inititalState: HomeAction = {
  discoverSwatches: [],
};

const homepage = (
  state: HomeAction = inititalState,
  action: HomeSwatchActions
): HomeAction => {
  switch (action.type) {
    case "GET_HOME_SWATCH":
      return {
        ...state,
        discoverSwatches: action.payload,
      };
    case "CLEAR_HOME_SWATCHES":
      return {
        ...state,
        discoverSwatches: [],
      };
    default:
      return state;
  }
};

export { homepage };
