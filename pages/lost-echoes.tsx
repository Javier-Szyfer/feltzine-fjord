import Head from "next/head";
import { useEffect, useState } from "react";
//CONTEXT
import useSoundContext from "../context/soundContext/soundCtx";
import { useDrop1Context } from "../context/drop1Context/drop1Ctx";
//COMPONENTS
import Header from "../components/common/Header";
import News from "../components/common/News";
//VIEWS
import LostEchoesWL from "../components/lost-echoes/LostEchoesWL";
import LELoading from "../components/lost-echoes/LELoading";
import LEFjord from "../components/lost-echoes/LEFjord";
import LostEchoesPM from "../components/lost-echoes/LostEchoesPM";
import LEDisconnected from "../components/lost-echoes/LEDisconnected";
//WAGMI
import { useAccount, useNetwork } from "wagmi";
//
import "react-toastify/dist/ReactToastify.css";
import { useWhitelist } from "../hooks/useWhitelist";
import { wlAddresses1 } from "../utils/merkle/wlAddresses1";
import { ToastContainer, Zoom } from "react-toastify";

const LostEchoes = () => {
  //CONTEXT
  const {
    isSoundOn,
    tv1SoundtrackStop,
    setIsSoundOn,
    toggleSound,
    tv1Soundtrack,
    tv1SoundtrackPause,
    tv1SoundtrackPlay,
  } = useSoundContext();
  const { endWLDateInSecs, isPublicMintActive } = useDrop1Context();
  //STATE
  const [loading, setLoading] = useState(true);

  const date = new Date();

  //WAGMI
  const { chain } = useNetwork();
  const { address } = useAccount();

  const isWhitelisted = useWhitelist(address, wlAddresses1);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => tv1SoundtrackStop();
  }, []);
  const handleSoundOff = () => {
    toggleSound(),
      setIsSoundOn(!isSoundOn),
      tv1Soundtrack ? tv1SoundtrackPause() : tv1SoundtrackPlay();
  };

  return (
    <div className=" overflow-hidden">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="FeltZine - 4 Fjord Drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="dark"
        transition={Zoom}
        limit={2}
      />
      <div className="noise" />
      <div className="relative  text-md md:text-xl ">
        <Header enter={true} />
        {/* NEWS */}
        <div className="px-8 sm:px-4 md:max-w-4xl lg:px-0 mx-auto mt-2">
          <News size="xl" />
          {isWhitelisted && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-[10px] sm:text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              You are whitelisted for:{" "}
              <span className="italic ml-1 flex flex-col justify-center items-center ">
                {isWhitelisted && "Endangered Memories"}
              </span>
            </span>
          )}
          {!isWhitelisted && address && date.getTime() < endWLDateInSecs && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              Not whitelisted
            </span>
          )}
        </div>

        <div
          className={` relative px-4 w-full mx-auto flex flex-col justify-start 2xl:justify-center items-center 
          md:py-4 lg:shadow-xl  lg:shadow-stone-600/50 sm:max-w-6xl md:max-w-4xl 2xl:max-w-7xl min-h-[100vh]  font-bold`}
        >
          {/* LOADING */}
          {loading && <LELoading />}
          {/* DISCONNECTED OR WRONG CHAIN */}
          {!loading && (!address || chain?.id != 5) && (
            <LEDisconnected chainId={chain?.id} address={address} />
          )}
          {/* WHITELIST ACTIVE AND NOT WHITELISTED ACC */}
          {address &&
            !isWhitelisted &&
            !loading &&
            chain?.id === 5 &&
            date.getTime() < endWLDateInSecs &&
            !isPublicMintActive && (
              <div className=" text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord />
              </div>
            )}

          {/* WHITELIST ACTIVE AND WHITELISTED ACC */}
          {address &&
            isWhitelisted &&
            date.getTime() < endWLDateInSecs &&
            chain?.id === 5 &&
            !loading &&
            !isPublicMintActive && (
              <div className=" text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LostEchoesWL />
              </div>
            )}
          {/* PUBLIC MINT === WHITELIST ENDED AND FJORD MINT ENDED */}
          {address && !loading && isPublicMintActive && chain?.id === 5 && (
            <div className=" text-drop1 relative lg:min-h-none text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
              <LostEchoesPM />
            </div>
          )}
          {/* SOUND CONTROL */}
          {!loading && (
            <div className="flex w-full justify-start pb-6">
              <button
                onClick={() => {
                  handleSoundOff();
                }}
                className=" cursor-fancy text-shadowFirst border border-gray-400 py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none w-auto sm:w-32 mt-8 text-xs"
              >
                {isSoundOn ? "sound off" : "sound on"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostEchoes;
