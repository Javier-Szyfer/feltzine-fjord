import { useReducer } from "react";
import { SoundState } from "../../interfaces";
import { soundReducer } from "./soundReducer";
import { SoundContext } from "./soundContext";

const INITIAL_STATE: SoundState = {
  isSoundOn: true,
};

interface props {
  children: JSX.Element | JSX.Element[];
}
export const SoundProvider = ({ children }: props) => {
  const [soundState, dispatch] = useReducer(soundReducer, INITIAL_STATE);
  const setSoundOn = (sound: boolean) => {
    dispatch({ type: "SET_IS_SOUND", payload: sound });
  };

  return (
    <SoundContext.Provider
      value={{
        soundState,
        setSoundOn,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
