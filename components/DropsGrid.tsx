import Link from "next/link";
import { useContext, useState } from "react";
import { SoundContext } from "../context/soundContext/soundContext";
import { useDrop1Context } from "../context/drop1Context/drop1Ctx";
import { useDrop2Context } from "../context/drop2Context/drop2Ctx";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../animations/animations";
import useSound from "use-sound";
import { Zoom, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//COMPONENTS
import News from "./News";
import { ConnectBtn } from "./ConnectBtn";
import Timer from "./Timer";
import Drop1Tv from "./Drop1Tv";
//WHITELIST
import { wlAddresses1 } from "../utils/merkle/wlAddresses1";
import { useWhitelist } from "../hooks/useWhitelist";
//WAGMI
import { useAccount, useNetwork } from "wagmi";

interface DropsGridProps {
  enter: boolean;
}

const DropsGrid = ({ enter }: DropsGridProps) => {
  //CONTEXT
  const { soundState, setSoundOn } = useContext(SoundContext);
  const { isSoundOn } = soundState;
  //STATE
  const [allTVS, setAllTVs] = useState(true);
  //DROP1
  const { endWLDateInSecs, formattedWLEndDate } = useDrop1Context();
  const [tv1Hover, setTv1Hover] = useState(false);
  const [enterTV1, setEnterTV1] = useState(false);
  const [isTV1Soundtrack, setIsTV1Soundtrack] = useState(false);
  //DROP2
  const { endWL2DateInSecs, formattedWL2EndDate } = useDrop2Context();
  const [tv2Hover, setTv2Hover] = useState(false);
  const [enterTV2, setEnterTV2] = useState(false);
  const [isTV2Soundtrack, setIsTV2Soundtrack] = useState(false);
  //DROP3
  const [tv3Hover, setTv3Hover] = useState(false);
  const [enterTV3, setEnterTV3] = useState(false);
  const [isTV3Soundtrack, setIsTV3Soundtrack] = useState(false);
  //DROP4
  const [enterTV4, setEnterTV4] = useState(false);
  const [tv4Hover, setTv4Hover] = useState(false);
  const [isTV4Soundtrack, setIsTV4Soundtrack] = useState(false);

  //AUDIOS FOR DROPS
  const [play1, { stop: stop1 }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660499727/feltzine/tv1_wcnpei.mp3",
    { volume: 0.1 }
  );
  const [play2, { stop: stop2 }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660499727/feltzine/tv2_imm5wi.mp3",
    { volume: 0.1 }
  );
  const [play3, { stop: stop3 }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660499727/feltzine/tv4_vu2w5e.mp3",
    { volume: 0.1 }
  );
  const [play4, { stop: stop4 }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660499727/feltzine/tv3_icptgi.mp3",
    { volume: 0.1 }
  );
  const [muteSound] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660491891/feltzine/toggle1_ibppkc.mp3",
    { volume: 0.1 }
  );
  const [
    tv1SoundtrackPlay,
    { pause: tv1SoundtrackPause, stop: tv1SoundtrackStop },
  ] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661350979/feltzine/tv1soundtrack_uottyq.mp3",
    {
      volume: 0.2,

      onplay: () => {
        setIsTV1Soundtrack(true);
      },
      onpause: () => {
        setIsTV1Soundtrack(false);
      },
    }
  );

  //WAMGI HOOKS
  const { address } = useAccount();
  const { chain } = useNetwork();
  //MERKLE HOOK
  const merkleCheck1 = useWhitelist(address, wlAddresses1);
  const merkleCheck2 = useWhitelist(address, wlAddresses1);
  const merkleCheck3 = useWhitelist(address, wlAddresses1);
  const merkleCheck4 = useWhitelist(address, wlAddresses1);

  //HANDLE TVS
  const handleEnterTv = (tv: number) => {
    if (!chain) {
      toast.error("Please connect wallet to continue", {
        toastId: "walletDisconnected-4tvs",
      });
      return;
    } else if (chain?.id != 5) {
      toast.error("Please switch to Goerli network", {
        toastId: "switchNetwork-4tvs",
      });
      return;
    } else if (!merkleCheck1?.isIncluded) {
      stop1();
      window.open(
        "https://copperlaunch.com/drops/goerli/0x117EeD5828f799a816D27cfdeEE5c6c2bBadc8A7"
      );
      return;
    }
    setAllTVs(false);
    switch (tv) {
      case 1:
        stop1(), setTv1Hover(false);
        merkleCheck1?.isIncluded && setEnterTV1(true);
        isSoundOn && tv1SoundtrackPlay();
        break;
      case 2:
        setEnterTV2(true);
        break;
      case 3:
        setEnterTV3(true);
        break;
      case 4:
        setEnterTV4(true);
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden h-full w-full text-md md:text-xl "
      id="dropsGrid"
    >
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="dark"
        transition={Zoom}
        limit={2}
      />
      {/* Desktop connect */}
      {enter && (
        <div className=" hidden lg:flex fixed  top-8 right-4 cursor-fancy text-sm ">
          <ConnectBtn />
        </div>
      )}
      {/* NEWS  */}
      {enter && (
        <div className="px-8 sm:px-4 md:max-w-4xl lg:px-0 mx-auto mt-2">
          <News size="xl" />
          {merkleCheck1?.isIncluded && allTVS && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-[10px] sm:text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              You are whitelisted for:{" "}
              <span className="italic ml-1 flex flex-col justify-center items-center ">
                {merkleCheck1?.isIncluded && "Endangered Memories"}
                {/* {merkleCheck1?.isIncluded && "- Second Chance"}
                {merkleCheck1?.isIncluded && "- Third Monster"} */}
              </span>
            </span>
          )}
          {!merkleCheck1?.isIncluded && address && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              Not whitelisted
            </span>
          )}
        </div>
      )}

      <motion.div
        variants={stagger}
        className={` px-4 w-full mx-auto 
        ${
          allTVS
            ? "grid grid-col-1 gap-6 md:grid-cols-2 place-content-center md:gap-1"
            : "flex flex-col justify-center items-center  "
        } md:max-w-4xl md:py-4 h-full lg:shadow-xl lg:shadow-stone-600/50 sm:max-w-6xl  2xl:max-w-7xl  font-bold`}
      >
        {/* TV1 ONLY */}
        {enterTV1 && !allTVS && (
          <>
            <Drop1Tv
              setEnterTV1={setEnterTV1}
              setAllTVs={setAllTVs}
              proof={merkleCheck1?.proof as unknown as string}
              address={address as unknown as string}
              tv1SoundtrackStop={tv1SoundtrackStop}
              isSoundOn={isSoundOn}
              isIncluded={merkleCheck1?.isIncluded as unknown as boolean}
            />
            <div className="flex w-full justify-start pb-6">
              <button
                onClick={() => {
                  isTV1Soundtrack ? tv1SoundtrackPause() : tv1SoundtrackPlay();
                  setSoundOn(!isSoundOn), muteSound();
                }}
                className=" cursor-fancy text-shadowFirst border border-gray-400 py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none w-auto sm:w-32 mt-8 text-xs"
              >
                {isSoundOn ? "sound off" : "sound on"}
              </button>
            </div>
          </>
        )}
        {/* ALL TVS TOGETHER */}
        {enter && allTVS && (
          <>
            {/* //TV1 */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
              className=" border-[0.9px] mt-4 md:mt-0 border-[#36353584] shadow-md shadow-stone-200/10 hover:shadow-[#ff0000]/50 text-[#ff0000] p-4 h-64 w-96 2xl:h-80 md:w-full bg-[#00000055]  opacity-95"
            >
              <motion.div
                onMouseEnter={() => {
                  isSoundOn && play1();
                }}
                onMouseLeave={() => {
                  isSoundOn && stop1();
                }}
                onTouchStart={() => {
                  isSoundOn && play1();
                  stop2();
                  stop3();
                  stop4();
                  setTv1Hover(!tv1Hover);
                }}
                whileHover={{
                  scale: 1.008,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => setTv1Hover(true)}
                onHoverEnd={() => setTv1Hover(false)}
                className="text-shadowFirstCollection relative w-full h-full "
              >
                <div className="absolute border-[0.5px] border-[#0e0e0e84] inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#76737325] w-full h-full hover:blur-sm" />
                <button
                  onClick={() => handleEnterTv(1)}
                  className="text-shadowFirstCollection cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
                >
                  <h2 className="text-[#ff0000] ">ENDANGERED MEMORIES</h2>
                  {!tv1Hover && <Timer deadline={endWLDateInSecs} size="2xl" />}
                  {tv1Hover && <p className="text-2xl">{formattedWLEndDate}</p>}
                  {tv1Hover && merkleCheck1?.isIncluded && (
                    <p className=" absolute bottom-4 ">ACCESS</p>
                  )}
                  {!merkleCheck1?.isIncluded && address && (
                    <Link href={"https://copperlaunch.com/"} passHref>
                      <a
                        target="blank"
                        rel="noopener"
                        className="absolute bottom-4 "
                      >
                        <p className="text-sm md:text-lg ml-2 ">
                          MINT THROUGH COPPER
                        </p>
                      </a>
                    </Link>
                  )}
                </button>
              </motion.div>
            </motion.div>
            {/* TV2 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#36353584] shadow-md shadow-stone-200/10 hover:shadow-[#3a86ff]/50 cursor-fancy   h-64 2xl:h-80 p-4 bg-[#00000055] opacity-50"
            >
              <motion.div
                whileHover={{
                  scale: 1.008,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => {
                  isSoundOn && play2();
                }}
                onMouseLeave={() => {
                  isSoundOn && stop2();
                }}
                onTouchStart={() => {
                  isSoundOn && play2();
                  stop1();
                  stop3();
                  stop4();
                }}
                className="text-shadowInit1 relative  w-full h-full "
              >
                <div className="absolute border-[0.5px] border-[#0e0e0e84] hover:border-[#69ff69] inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm absolute inset-0 shadow-xl shadow-stone-500/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="">COLLECTION 2</h2>
                  <h3 className="font-semibold">- Coming soon -</h3>
                </div>
              </motion.div>
            </motion.div>
            {/* TV3 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#69ff69]/20 cursor-fancy   h-64 2xl:h-80  p-4 bg-[#00000055] opacity-50 "
            >
              <motion.div
                whileHover={{
                  scale: 1.008,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => {
                  isSoundOn && play3();
                }}
                onMouseLeave={() => {
                  isSoundOn && stop3();
                }}
                onTouchStart={() => {
                  isSoundOn && play3();
                  stop1();
                  stop2();
                  stop4();
                }}
                className="text-shadowInit1 text-shadowInit2 relative  w-full h-full "
              >
                <div className="absolute  inset-0 border-[0.5px] border-[#0e0e0e84] hover:border-[#69ff69]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm absolute inset-0  rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="">COLLECTION 3</h2>
                  <h3 className="font-semibold">- Coming soon -</h3>
                </div>
              </motion.div>
            </motion.div>
            {/* TV4 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#daee00]/20 cursor-fancy   h-64 2xl:h-80  p-4 bg-[#00000055] opacity-50"
            >
              <motion.div
                whileHover={{
                  scale: 1.008,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => {
                  isSoundOn && play4();
                }}
                onMouseLeave={() => {
                  isSoundOn && stop4();
                }}
                onTouchStart={() => {
                  isSoundOn && play4();
                  stop1();
                  stop2();
                  stop3();
                }}
                className="text-shadowInit1 text-shadowInit3 relative  w-full h-full "
              >
                <div className="absolute  inset-0 border-[0.5px] border-[#0e0e0e84] hover:border-[#69ff69]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm absolute inset-0  rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="">COLLECTION 4</h2>
                  <h3 className="font-semibold">- Coming soon -</h3>
                </div>
              </motion.div>
            </motion.div>
            <div className="pb-8  text-shadowFirst md:col-span-2 flex flex-col w-full md:flex-row  items-center justify-between mt-4 text-xs">
              <button
                onClick={() => {
                  setSoundOn(!isSoundOn), muteSound();
                }}
                className="bg-transparent  border border-[#555555] hover:border-[#999999] cursor-fancy text-shadowFirst py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none  "
              >
                {isSoundOn ? "sound off" : "sound on"}
              </button>
              <div className="flex items-center justify-center mt-8 md:mt-0">
                <Link href={"https://twitter.com/FeltZine"} passHref>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className="cursor-fancy hover:underline"
                  >
                    <span>TWITTER</span>
                  </a>
                </Link>
                <span className="mx-2">|</span>
                <Link href={"https://www.feltzine.art/"} passHref>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className="cursor-fancy hover:underline"
                  >
                    <span>FELT ZINE</span>
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DropsGrid;
