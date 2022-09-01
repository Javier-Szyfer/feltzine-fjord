import Link from "next/link";
import useAllTvsContext from "../../context/allTvsContext/allTvsCtx";
import useDrop1Context from "../../context/drop1Context/drop1Ctx";
import useSoundContext from "../../context/soundContext/soundCtx";
import Timer from "../common/Timer";
import useSound from "use-sound";

const LEFjord = () => {
  //CONTEXT
  const { totalMintedDrop1, endWLDateInSecs } = useDrop1Context();
  const { setEnter, setAllTVs } = useAllTvsContext();
  const { isSoundOn, tv1SoundtrackStop } = useSoundContext();
  //SOUNDS
  const [mint1] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661350626/feltzine/mint1_th5lyy.mp3",
    { volume: 0.2 }
  );
  const [mint2] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661350625/feltzine/mint2_biappo.mp3",
    { volume: 0.2 }
  );
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

      <div className="lg:min-h-0 lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] p-8 ">
        <div>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h2>LOST ECHOES</h2>
            <Timer deadline={endWLDateInSecs} />
          </div>
          <span>
            Artifacts found:
            {totalMintedDrop1 ? `${totalMintedDrop1}/100` : "N/A"}
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
          <Link href={"/"}>
            <button
              className="text-drop1 hover:text-[#ff3700] cursor-fancy "
              onClick={() => {
                isSoundOn && back(),
                  tv1SoundtrackStop(),
                  setAllTVs(true),
                  setEnter(true);
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
            <button className="border border-[#ff0000] px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-red-400 cursor-fancy ">
              MINT THROUGH FJORD
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default LEFjord;
