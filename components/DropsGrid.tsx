import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../animations/animations";
import { format } from "date-fns";
import useSound from "use-sound";
import { CgExternal } from "react-icons/cg";
//FJORD DROP1
import { fjordDrop1ContractAddress } from "../constants/fjordDrop1ContractAddress";
import { fjordDrop1GoerliAbi } from "../contractABI/fjordDrop1GoerliAbi";
//COMPONENTS
import IntroText from "./IntroText";
import { ConnectBtn } from "./ConnectBtn";
import Timer from "./Timer";
import Drop1Tv from "./Drop1Tv";
//WHITELIST
import { wlAddresses1 } from "../utils/merkle/wlAddresses1";
import { useWhitelist } from "../hooks/useWhitelist";
//WAGMI
import { useAccount, useContractRead } from "wagmi";
import Link from "next/link";

const DropsGrid = () => {
  const [isSoundOn, setIsSoundon] = useState(true);
  const [enter, setEnter] = useState(false);
  const [visible, setVisible] = useState(false);

  //TVs state
  const [enterTV1, setEnterTV1] = useState(false);
  const [isTV1Soundtrack, setIsTV1Soundtrack] = useState(false);
  const [enterTV2, setEnterTV2] = useState(false);
  const [enterTV3, setEnterTV3] = useState(false);
  const [enterTV4, setEnterTV4] = useState(false);
  const [allTVS, setAllTVs] = useState(true);

  const [tv1Hover, setTv1Hover] = useState(false);
  // const [tv2Hover, setTv2Hover] = useState(false);
  // const [tv3Hover, setTv3Hover] = useState(false);
  // const [tv4Hover, setTv4Hover] = useState(false);

  // HANDLE TIME
  const date: any = new Date("2022-09-12T15:00:00");
  const formattedDate = format(date, "MM-dd-yyyy");
  const deadline = date.getTime();
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
  const [enterSound] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1660491197/feltzine/enter_w9keap.mp3",
    { volume: 0.5 }
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

  //MERKLE HOOK
  const merkleCheck = useWhitelist(address, wlAddresses1);
  const { data: totalMintedDrop1 } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "totalSupply",
    enabled: true,
  });

  const handleEnterTv = (tv: number) => {
    setAllTVs(false);
    switch (tv) {
      case 1:
        setEnterTV1(true);
        tv1SoundtrackPlay();
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
      className="relative h-full w-full overflow-hidden"
      id="dropsGrid"
    >
      {/* Mobile connect */}
      <div className=" xl:hidden h-auto flex flex-col justify-center  items-center  mt-6 cursor-fancy ">
        <ConnectBtn />
      </div>
      {/* Desktop connect */}
      <div className=" hidden  xl:flex fixed  top-8 right-4 cursor-fancy ">
        <ConnectBtn />
      </div>

      <motion.div
        variants={stagger}
        className={` px-4 w-full mx-auto sm:max-w-6xl 
        ${
          allTVS
            ? "grid grid-col-1 gap-6 md:grid-cols-2 place-content-center md:gap-1"
            : "flex flex-col justify-center items-center min-h-[80vh] "
        }  md:max-w-4xl md:py-14 h-full lg:shadow-xl lg:shadow-stone-600/50  font-bold`}
      >
        {enterTV1 && !allTVS && (
          <>
            <Drop1Tv
              setEnterTV1={setEnterTV1}
              setAllTVs={setAllTVs}
              totalMintedDrop1={totalMintedDrop1}
              proof={merkleCheck?.proof}
              address={address}
              tv1SoundtrackStop={tv1SoundtrackStop}
            />
            <div className="flex w-full justify-start">
              <button
                onClick={() => {
                  isTV1Soundtrack ? tv1SoundtrackPause() : tv1SoundtrackPlay();
                  setIsSoundon(!isSoundOn), muteSound();
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
              className=" border-[0.9px] mt-10 md:mt-0 border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#ff0000]/50 text-[#ff0000] p-4 h-64 bg-[#00000055]  opacity-95"
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
                <div className="absolute border-[0.5px] border-[#9da6a824]  inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full hover:blur-sm" />
                <button
                  onClick={() => {
                    merkleCheck?.isIncluded && handleEnterTv(1),
                      stop1(),
                      setTv1Hover(false);
                  }}
                  className=" cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
                >
                  <h2 className="text-[#ff0000] text-xl">COLLECTION 1</h2>
                  {!tv1Hover && <Timer deadline={deadline} />}
                  {tv1Hover && <p className="text-2xl">{formattedDate}</p>}
                  {tv1Hover && merkleCheck?.isIncluded && (
                    <p className="text-xl absolute bottom-4 ">ACCESS</p>
                  )}
                  {tv1Hover && !merkleCheck?.isIncluded && (
                    <Link href={"https://copperlaunch.com/"} passHref>
                      <a
                        target="blank"
                        rel="noopener"
                        className="absolute bottom-4 "
                      >
                        <div className="flex w-full justify-center items-center">
                          <CgExternal className="h-5 w-5 sm:h-7 sm:w-7" />
                          <p className="text-sm md:text-lg ml-2 underline">
                            MINT THROUGH COPPER
                          </p>
                        </div>
                      </a>
                    </Link>
                  )}
                </button>
              </motion.div>
            </motion.div>
            {/* TV2 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#3a86ff]/50 cursor-fancy   h-64 p-4 bg-[#00000055] opacity-50"
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
                <div className="absolute border-[0.5px] border-[#5e5d5d3a] hover:border-[#69ff69] inset-0  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm absolute inset-0 shadow-xl shadow-stone-500/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="text-xl">COLLECTION 2</h2>
                  <h3 className="text-xl font-semibold">- Coming soon -</h3>
                </div>
              </motion.div>
            </motion.div>
            {/* TV3 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#69ff69]/20 cursor-fancy   h-64 p-4 bg-[#00000055] opacity-50 "
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
                <div className="absolute  inset-0 border-[0.5px] border-[#4c4a4a93] hover:border-[#69ff69]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm absolute inset-0  rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="text-xl">COLLECTION 3</h2>
                  <h3 className="text-xl font-semibold">- Coming soon -</h3>
                </div>
              </motion.div>
            </motion.div>
            {/* TV4 */}
            <motion.div
              variants={fadeInUp}
              className="border-[0.9px] border-[#55505084] shadow-md shadow-stone-200/10 hover:shadow-[#daee00]/20 cursor-fancy  daee00  h-64 p-4 bg-[#00000055] opacity-50"
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
                className=" relative text-shadowInit1 text-shadowInit3 p-6 lg:p-0  rounded-2xl w-full hover:blur-sm   h-full flex flex-col justify-center items-center space-y-2 shadow-sm shadow-stone-100/20  "
              >
                <div className="absolute  border-[0.5px] border-[#4c4a4a93] hover:border-[#daee00]  rounded-2xl bg-gradient-to-t  from-[#31333e31] to-[#9f959525] w-full h-full " />
                <div className="hover:blur-sm   rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center ">
                  <h2 className="text-xl">COLLECTION 4</h2>
                  <h3 className="text-xl font-semibold">- COMING SOON -</h3>
                </div>
              </motion.div>
            </motion.div>
            <button
              onClick={() => {
                setIsSoundon(!isSoundOn), muteSound();
              }}
              className="bg-[#202020] cursor-fancy text-shadowFirst py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none w-auto sm:w-32 mt-8 text-xs"
            >
              {isSoundOn ? "sound off" : "sound on"}
            </button>
          </>
        )}
        {!enter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-[75vh] mt-12 md:mt-0 flex flex-col justify-between items-center col-span-2"
          >
            <IntroText setVisible={setVisible} visible={visible} />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              onClick={() => {
                enterSound(), setEnter(true), setVisible(false);
              }}
              className="bg-[#202020] cursor-fancy text-shadowFirst py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none "
            >
              ENTER
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DropsGrid;
