import Link from 'next/link';
import useSound from 'use-sound';
import useDrop1Context from '../../context/drop1Context/drop1Ctx';
import useSoundContext from '../../context/soundContext/soundCtx';

export const LEMintEnded = () => {
  //CONTEXT
  const { totalMintedDrop1 } = useDrop1Context();
  const { isSoundOn, tv1SoundtrackStop } = useSoundContext();
  //SOUNDS
  const [back] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1661351389/feltzine/back_o59yfu.mp3',
    { volume: 0.2 }
  );

  return (
    <>
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1661348392/feltzine/production_ID_3877749_gackzc.mp4"
        autoPlay
        loop
        preload="true"
        muted
        className="opacity-60 object-cover  contrast-80 w-full h-[60vh]  lg:h-[70vh] hue-rotate-50 bg-black mix-blend-exclusion hidden lg:flex"
      />
      <div className=" lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] lg:p-8 ">
        <div className="bg-[url('https://res.cloudinary.com/aldi/image/upload/v1662031129/feltzine/gifBg1_aeastj.gif')] bg-cover bg-opacity-10  lg:bg-none p-4 sm:p-8 lg:p-0 h-full flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center ">
              <h2>LOST ECHOES</h2>
              <h3>MINT COMPLETED</h3>
            </div>
            <span className="">
              Artifacts found:
              {totalMintedDrop1 ? `${totalMintedDrop1}/525` : 'N/A'}
            </span>
            <h3 className="mt-8 ">
              Researchers discover Ina&apos;s memories in the year 3030.
            </h3>
            <p className="mt-8 ">
              They are not aware of today&apos;s cultural context and must
              categorize their findings based on what they imagine life was like
              for Ina, a child who lived 1000 years before them with no other
              record besides these objects recorded via retro-analog technology.
            </p>
          </div>
          <div className=" flex w-full  justify-between items-center mt-6">
            <Link href={'/drops'}>
              <button
                className="text-drop1 hover:text-[#46f9ff] cursor-fancy "
                onClick={() => {
                  isSoundOn && back(), tv1SoundtrackStop();
                }}
              >
                BACK
              </button>
            </Link>
            <a
              href="https://www.feltzine.art/collections/0xb775206e01fe2d60de85df9f18dd810998bff6d7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-[#51ff79] border  border-[#51ff79] px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-[#51ff79] cursor-fancy ">
                COLLECT HERE
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
