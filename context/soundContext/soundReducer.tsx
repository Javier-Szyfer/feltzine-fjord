import { SoundState } from "../../interfaces";

type soundActions = { type: "SET_IS_SOUND"; payload: boolean };

export const soundReducer = (
  state: SoundState,
  action: soundActions
): SoundState => {
  switch (action.type) {
    case "SET_IS_SOUND":
      return {
        ...state,
        isSoundOn: action.payload,
      };
    default:
      return state;
  }
};
