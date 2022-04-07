import { TutoralActions } from "../types/types";

export interface TutorialAction {
  step: number;
  isTutorial: boolean;
}

const inititalState: TutorialAction = {
  step: 0,
  isTutorial: false,
};

const tutorials = (
  state: TutorialAction = inititalState,
  action: TutoralActions
): TutorialAction => {
  switch (action.type) {
    case "SET_SWATCHES_TUTORIAL":
      return {
        ...state,
        step: action.payload,
      };

    default:
      return state;
  }
};

export { tutorials };
