import { LayoutActions } from "../types/types";

export interface LayoutAction {
  isCompact: boolean;
  modal: boolean;
  modalType: string;
}

const inititalState: LayoutAction = {
  isCompact: false,
  modal: false,
  modalType: "",
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
        modal: action.payload.isCompact,
        modalType: action.payload.modalType,
      };
    default:
      return state;
  }
};

export { layout };
