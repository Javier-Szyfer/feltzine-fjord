import Link from "next/link";
import useSound from "use-sound";
import useAllTvsContext from "../../context/allTvsContext/allTvsCtx";
import useDrop1Context from "../../context/drop1Context/drop1Ctx";
import useSoundContext from "../../context/soundContext/soundCtx";
import Timer from "../common/Timer";

interface LostEchoesWLProps {
  handleWhitelistMint: () => void;
  whiteListMintAmount: number;
  setWhiteListMintAmount: (amount: number) => void;
  processing: boolean;
  totalPrice: number;
}

const LostEchoesWL = ({
  handleWhitelistMint,
  whiteListMintAmount,
  setWhiteListMintAmount,
  processing,
  totalPrice,
}: LostEchoesWLProps) => {
  //CONTEXT
  const { totalMintedDrop1, endWLDateInSecs } = useDrop1Context();
  const { setEnter, setAllTVs } = useAllTvsContext();
  const {
    isSoundOn,

    tv1SoundtrackStop,
  } = useSoundContext();
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
        <div className="text-drop1  flex justify-end items-center mt-6 ">
          <h3 className="mr-10">Artifacts quantity</h3>
          <div className="border border-[#ff0000] flex">
            <button
              className={` ${
                whiteListMintAmount === 1 ? "bg-[#ff000066]" : "bg-none"
              } text-drop1 w-7 h-7 md:w-10 md:h-10 border-r border-[#ff0000] rounded-l cursor-fancy `}
              onClick={() => {
                setWhiteListMintAmount(1), isSoundOn && mint1();
              }}
            >
              1
            </button>
            <button
              className={` ${
                whiteListMintAmount === 2 ? "bg-[#ff000066]" : "bg-none"
              } text-drop1 w-7 h-7 md:w-10 md:h-10 border-r border-[#ff0000] rounded-l cursor-fancy `}
              onClick={() => {
                isSoundOn && mint2(), setWhiteListMintAmount(2);
              }}
            >
              2
            </button>
          </div>
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
          <button
            className="border border-[#ff0000] px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-red-400 cursor-fancy "
            onClick={() => handleWhitelistMint()}
            disabled={processing}
          >
            {processing ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-[#ff0000]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>PROCESSING...</span>
              </div>
            ) : (
              `DISCOVER Ξ${totalPrice}`
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default LostEchoesWL;