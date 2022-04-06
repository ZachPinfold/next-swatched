import { Dispatch } from "react";
import { TutoralActions } from "../types/types";

export const triggerTutorial = (step: number): TutoralActions => ({
  type: "SET_SWATCHES_TUTORIAL",
  payload: step,
});

export const startTriggerTutorial =
  (step: number) => async (dispatch: Dispatch<TutoralActions>) => {
    try {
      dispatch(triggerTutorial(step));
    } catch (error) {
      console.log(error);
    }
  };
