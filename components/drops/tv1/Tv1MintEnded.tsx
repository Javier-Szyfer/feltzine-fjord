import Link from 'next/link';
import useSoundContext from '../../../context/soundContext/soundCtx';

interface Tv1MintEndedProps {
  tv1Hover: boolean;
  stop1: () => void;
}

export const Tv1MintEnded = ({ tv1Hover, stop1 }: Tv1MintEndedProps) => {
  const { tv1SoundtrackPlay } = useSoundContext();

  const handleEnter = () => {
    stop1();
    tv1SoundtrackPlay();
  };
  return (
    <Link href={'/lost-echoes'}>
      <button
        onClick={handleEnter}
        className="text-shadowTitle cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
      >
        <h2 className="text-[#00eeff] ">LOST ECHOES</h2>
        {tv1Hover && <p className="absolute bottom-4 ">ENTER</p>}
      </button>
    </Link>
  );
};
