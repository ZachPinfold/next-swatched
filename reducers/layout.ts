import { LayoutActions } from "../types/types";

export interface LayoutAction {
  isCompact: boolean;
}

const inititalState: LayoutAction = {
  isCompact: false,
};

const layout = (
  state: LayoutAction = inititalState,
  action: LayoutActions
): LayoutAction => {
  switch (action.type) {
    case "SET_COMPACT_SCREEN":
      return {
        ...state,
        isCompact: action.payload,
      };
    default:
      return state;
  }
};

export { layout };
