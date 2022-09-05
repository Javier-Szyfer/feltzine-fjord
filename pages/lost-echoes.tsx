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
import { chainID } from "../constants/chainId";
import { useWhitelist } from "../hooks/useWhitelist";
import { wlAddresses1 } from "../utils/merkle/wlAddresses1";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      tv1Soundtrack && tv1SoundtrackPause();
    !tv1Soundtrack && !isSoundOn && tv1SoundtrackPlay();
  };

  return (
    <div className=" overflow-hidden">
      <Head>
        <title>Lost Echoes by Felt Zine</title>
        <link rel="icon" href="https://fjord.feltzine.art/assets/favicon.jpg" />

        <meta
          property="og:title"
          content="Lost Echoes by Felt Zine"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Original art by Ina Vare with production by Felt Zine. Lost Echoes explores the implicit bias of anthropologists, speculative futures, and retrofuturism as researchers discover an artist’s memories in the year 3030 without context."
          key="ogdesc"
        />
        <meta property="og:type" content="website" key="ogtype" />
        <meta
          property="og:url"
          content="https://fjord.feltzine.art/lost-echoes"
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://fjord.feltzine.art/assets/inapreview.jpg"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="https://fjord.feltzine.art/lost-echoes"
          key="ogsitename"
        />

        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta
          property="twitter:domain"
          content="fjord.feltzine.art"
          key="twdomain"
        />
        <meta
          property="twitter:url"
          content="https://fjord.feltzine.art/lost-echoes"
          key="twurl"
        />
        <meta
          name="twitter:title"
          content="Lost Echoes by Felt Zine"
          key="twtitle"
        />
        <meta
          name="twitter:description"
          content="Original art by Ina Vare with production by Felt Zine. Lost Echoes explores the implicit bias of anthropologists, speculative futures, and retrofuturism as researchers discover an artist’s memories in the year 3030 without context."
          key="twdesc"
        />
        <meta
          name="twitter:image"
          content="https://fjord.feltzine.art/assets/inapreview.jpg"
          key="twimage"
        />
      </Head>{" "}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme="dark"
        transition={Zoom}
        limit={2}
      />
      <div className="noise" />
      <div className="relative  text-md md:text-xl ">
        <Header />
        {/* NEWS */}
        <div className="px-8 sm:px-4 md:max-w-4xl lg:px-0 mx-auto mt-2">
          <News size="xl" />
          {isWhitelisted && endWLDateInSecs > date.getTime() && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-[10px] sm:text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              You are whitelisted for:{" "}
              <span className="italic ml-1 flex flex-col justify-center items-center ">
                {isWhitelisted && "Lost Echoes"}
              </span>
            </span>
          )}
          {!isWhitelisted && address && endWLDateInSecs > date.getTime() && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              Not whitelisted
            </span>
          )}
        </div>

        <div
          className="relative px-4 w-full mx-auto flex flex-col justify-start 2xl:justify-center items-center 
          md:py-4 lg:shadow-xl  lg:shadow-stone-600/50 sm:max-w-6xl md:max-w-4xl 2xl:max-w-7xl text-[10px] xs:text-sm md:text-[18px] lg:text-lg  2xl:text-2xl min-h-[100vh]  font-bold"
        >
          {/* LOADING */}
          {loading && <LELoading />}
          {/* DISCONNECTED OR WRONG CHAIN */}
          {!loading && (!address || chain?.id != chainID) && (
            <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
              <LEDisconnected chainId={chain?.id} address={address} />
            </div>
          )}
          {/*VISIT FJORD: WHITELIST ACTIVE AND NOT WHITELISTED ACC */}
          {address &&
            !isWhitelisted &&
            !loading &&
            chain?.id === chainID &&
            date.getTime() < endWLDateInSecs &&
            !isPublicMintActive && (
              <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord isPublicMintActive={isPublicMintActive} />
              </div>
            )}
          {/* MINT FJORD: WHITELIST INACTIVE && PUBLICMINT INACTIVE */}
          {address &&
            !loading &&
            chain?.id === chainID &&
            date.getTime() > endWLDateInSecs &&
            !isPublicMintActive && (
              <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord isPublicMintActive={isPublicMintActive} />
              </div>
            )}

          {/* WHITELIST ACTIVE AND WHITELISTED ACC */}
          {address &&
            isWhitelisted &&
            date.getTime() < endWLDateInSecs &&
            chain?.id === chainID &&
            !loading && (
              <div className=" text-drop1  relative  lg:min-h-none  border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LostEchoesWL />
              </div>
            )}
          {/* PUBLIC MINT === WHITELIST ENDED AND FJORD MINT ENDED */}
          {address &&
            date.getTime() > endWLDateInSecs &&
            !loading &&
            isPublicMintActive &&
            chain?.id === chainID && (
              <div className=" text-drop1 relative lg:min-h-none  border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
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
                className=" cursor-fancy  border border-gray-400 py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none w-auto  mt-4 text-xs"
              >
                <div className="flex items-center justify-center">
                  <span className="mr-3 text-shadowFirst">SOUND</span>
                  {isSoundOn ? (
                    <span className="">
                      <span className="text-[#5d5d5df4]">OFF</span> | ON
                    </span>
                  ) : (
                    <span className="">
                      OFF | <span className="text-[#5d5d5df4]">ON</span>
                    </span>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostEchoes;
