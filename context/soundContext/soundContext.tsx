import { createContext } from "react";
import { SoundState } from "../../interfaces";

export type SoundContextProps = {
  soundState: SoundState;
  setSoundOn: (sound: boolean) => void;
};

export const SoundContext = createContext<SoundContextProps>(
  {} as SoundContextProps
);
