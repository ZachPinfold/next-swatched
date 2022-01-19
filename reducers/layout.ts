import { LayoutActions } from "../types/types";

export interface LayoutAction {
  isCompact: boolean;
  modal: boolean;
}

const inititalState: LayoutAction = {
  isCompact: false,
  modal: false,
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
    case "SET_SHOW_MODAL":
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};

export { layout };
