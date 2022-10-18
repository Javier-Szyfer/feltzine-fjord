import Link from 'next/link';
import useSoundContext from '../../../context/soundContext/soundCtx';

interface TV2PublicMintProps {
  tv2Hover: boolean;
  stop2: () => void;
}

const TV2PublicMint = ({ tv2Hover, stop2 }: TV2PublicMintProps) => {
  const { tv2SoundtrackPlay } = useSoundContext();

  const handleEnter = () => {
    stop2();
    tv2SoundtrackPlay();
  };

  return (
    <Link href={'/hell-house'}>
      <button
        className="absolute inset-0 text-shadowFirstCollection  text-[#ff0000] cursor-fancy  shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
        onClick={handleEnter}
      >
        <h2 className=" ">HELL HOUSE</h2>
        {tv2Hover && <p className=" absolute bottom-4 ">ENTER</p>}
      </button>
    </Link>
  );
};

export default TV2PublicMint;
