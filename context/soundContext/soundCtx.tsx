import { createContext, useContext, useState } from 'react';
import useSound from 'use-sound';

interface SoundContextProps {
  isSoundOn: boolean;
  setIsSoundOn: (sound: boolean) => void;
  tv1Soundtrack: boolean;
  setIsTv1Soundtrack: (sound: boolean) => void;
  tv1SoundtrackPlay: () => void;
  tv1SoundtrackStop: () => void;
  tv1SoundtrackPause: () => void;
  tv2Soundtrack: boolean;
  setIsTv2Soundtrack: (sound: boolean) => void;
  tv2SoundtrackPlay: () => void;
  tv2SoundtrackStop: () => void;
  tv2SoundtrackPause: () => void;
  toggleSound: () => void;
}
const INITIAL_STATE: SoundContextProps = {
  setIsSoundOn: () => {},
  setIsTv1Soundtrack: () => {},
  tv1Soundtrack: false,
  isSoundOn: true,
  tv1SoundtrackPlay: () => {},
  tv1SoundtrackPause: () => {},
  tv1SoundtrackStop: () => {},
  tv2Soundtrack: false,
  setIsTv2Soundtrack: () => {},
  tv2SoundtrackPlay: () => {},
  tv2SoundtrackPause: () => {},
  tv2SoundtrackStop: () => {},
  toggleSound: () => {},
};

const SoundContext = createContext(INITIAL_STATE);

export function SoundWrapper({ children }: any) {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [tv1Soundtrack, setTv1Soundtrack] = useState(false);
  const [tv2Soundtrack, setTv2Soundtrack] = useState(false);

  // DROPS SOUNDTRACKS
  const [
    tv1SoundtrackPlay,
    { pause: tv1SoundtrackPause, stop: tv1SoundtrackStop },
  ] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1661350979/feltzine/tv1soundtrack_uottyq.mp3',
    {
      volume: 0.2,

      onplay: () => {
        setTv1Soundtrack(true);
      },
      onpause: () => {
        setTv1Soundtrack(false);
      },
    }
  );
  const [
    tv2SoundtrackPlay,
    { pause: tv2SoundtrackPause, stop: tv2SoundtrackStop },
  ] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1666124687/feltzine/08_Evighetsarp_pdst97.mp3',
    {
      volume: 0.2,

      onplay: () => {
        setTv1Soundtrack(true);
      },
      onpause: () => {
        setTv1Soundtrack(false);
      },
    }
  );

  //GENERAL ON / OFF TOGGLE SOUND
  const [toggleSound] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1660491891/feltzine/toggle1_ibppkc.mp3',
    { volume: 0.1 }
  );

  return (
    <SoundContext.Provider
      value={{
        isSoundOn,
        setIsSoundOn: () => setIsSoundOn(!isSoundOn),
        tv1Soundtrack,
        setIsTv1Soundtrack: () => setTv1Soundtrack(!tv1Soundtrack),
        tv1SoundtrackPlay: () => tv1SoundtrackPlay(),
        tv1SoundtrackPause: () => tv1SoundtrackPause(),
        tv1SoundtrackStop: () => tv1SoundtrackStop(),
        tv2Soundtrack,
        setIsTv2Soundtrack: () => setTv2Soundtrack(!tv2Soundtrack),
        tv2SoundtrackPlay: () => tv2SoundtrackPlay(),
        tv2SoundtrackPause: () => tv2SoundtrackPause(),
        tv2SoundtrackStop: () => tv2SoundtrackStop(),
        toggleSound: () => toggleSound(),
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);

  if (!context) {
    console.error('Error deploying Drop1Context!!!');
  }

  return context;
}

export default useSoundContext;
