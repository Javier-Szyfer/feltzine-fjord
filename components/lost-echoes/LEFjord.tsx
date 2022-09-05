import Link from "next/link";
import useDrop1Context from "../../context/drop1Context/drop1Ctx";
import useSoundContext from "../../context/soundContext/soundCtx";
import Timer from "../common/Timer";
import useSound from "use-sound";

interface Props {
  isPublicMintActive?: boolean;
}

const LEFjord = ({ isPublicMintActive }: Props) => {
  //CONTEXT
  const { totalMintedDrop1, endWLDateInSecs } = useDrop1Context();
  const { isSoundOn, tv1SoundtrackStop } = useSoundContext();
  const date = new Date();
  //SOUNDS
  const [back] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661351389/feltzine/back_o59yfu.mp3",
    { volume: 0.2 }
  );

  return (
    <>
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1661348392/feltzine/production_ID_3877749_gackzc.mp4"
        autoPlay
        loop
        muted
        className=" opacity-60 contrast-80 hue-rotate-50 bg-black mix-blend-exclusion hidden lg:flex"
      />

      <div className=" lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] lg:p-8 ">
        <div className="bg-[url('https://res.cloudinary.com/aldi/image/upload/v1662031129/feltzine/gifBg1_aeastj.gif')] bg-cover bg-opacity-10  lg:bg-none p-4 sm:p-8 lg:p-0 h-full flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h2>LOST ECHOES</h2>
              {endWLDateInSecs > date.getTime() ? (
                <Timer deadline={endWLDateInSecs} />
              ) : (
                <a href="https://fjordnfts.com/create/">whitelist ended</a>
              )}
            </div>
            <span>
              Artifacts found:
              {totalMintedDrop1 ? `${totalMintedDrop1}/500` : "N/A"}
            </span>
            <h3 className="mt-8">
              Researchers discover Ina&apos;s memories in the year 3030.
            </h3>
            <p className="mt-8">
              They are not aware of today&apos;s cultural context and must
              categorize their findings based on what they imagine life was like
              for Ina, a child who lived 1000 years before them with no other
              record besides these objects recorded via retro-analog technology.
            </p>
          </div>
          <div className=" flex w-full  justify-between items-center mt-6">
            <Link href={"/drops"}>
              <button
                className="text-drop1 hover:text-[#ff3700] cursor-fancy "
                onClick={() => {
                  isSoundOn && back(), tv1SoundtrackStop();
                }}
              >
                BACK
              </button>
            </Link>
            <a
              href="https://copperlaunch.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-[#80ff9e] border  border-[#80ff9e] px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-red-400 cursor-fancy ">
                {isPublicMintActive ? "MINT TRHOUGH FJORD" : "VISIT FJORD DROP"}
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LEFjord;
