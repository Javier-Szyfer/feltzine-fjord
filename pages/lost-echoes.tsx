import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
//CONTEXT
import { useDrop1Context } from '../context/drop1Context/drop1Ctx';
import useSoundContext from '../context/soundContext/soundCtx';
//COMPONENTS
import Header from '../components/common/Header';
import News from '../components/common/News';
//VIEWS
import LEDisconnected from '../components/lost-echoes/LEDisconnected';
import LEFjord from '../components/lost-echoes/LEFjord';
import LELoading from '../components/lost-echoes/LELoading';
import { LEMintEnded } from '../components/lost-echoes/LEMintEnded';
import LostEchoesWL from '../components/lost-echoes/LostEchoesWL';

//WAGMI
import { useAccount, useNetwork } from 'wagmi';
//
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chainID } from '../constants/chainId';
import { useWhitelist } from '../hooks/useWhitelist';
import { wlAddresses1 } from '../utils/merkle/wlAddresses1';

const LostEchoes = () => {
  const title = 'FeltZine - Lost Echoes';
  const description =
    'Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools';
  const image = 'https://feltzine-fjord.vercel.app/assets/le-resized.jpg';

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
  const { endWLDateInSecs, stage, ownerNFTsResult } = useDrop1Context();

  const { data } = ownerNFTsResult;
  //STATE
  const [loading, setLoading] = useState(true);

  const date = new Date();

  //WAGMI
  const { chain } = useNetwork();
  const { address } = useAccount();

  const isWhitelisted = useWhitelist(address, wlAddresses1);

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTime);
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
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://feltzine-fjord.vercel.app/lost-echoes"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="Feltzine" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta property="twitter:creator" content="FeltZine" />
        <meta property="og:image:alt" content={`${title}- open graph card`} />
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
        <Header />
        {/* NEWS */}
        <div className="px-8 sm:px-4 md:max-w-4xl lg:px-0 mx-auto mt-2">
          <News size="xl" />
          {isWhitelisted && endWLDateInSecs > date.getTime() && (
            <span className=" mt-4 text-[#00eeff] tracking-tighter text-[10px] sm:text-xs text-shadowFirst flex flex-col sm:flex-row justify-center items-center">
              You are whitelisted for:{' '}
              <span className="italic ml-1 flex flex-col justify-center items-center ">
                {isWhitelisted && 'Lost Echoes'}
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
            stage === 2 && (
              <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord stage={stage} />
              </div>
            )}
          {/* MINT FJORD: WHITELIST INACTIVE && PUBLICMINT INACTIVE */}
          {/* {address &&
            !loading &&
            chain?.id === chainID &&
            date.getTime() > endWLDateInSecs &&
            stage === 3 && (
              <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord stage={stage} />
              </div>
            )} */}

          {/* MINT ENDED */}
          {address && !loading && (
            <div className=" text-drop1  relative  lg:min-h-none  border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
              <LEMintEnded />
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
          {/* {address &&
            date.getTime() > endWLDateInSecs &&
            !loading &&
            stage === 4 &&
            chain?.id === chainID && (
              <div className=" text-drop1 relative lg:min-h-none  border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LostEchoesPM />
              </div>
            )} */}
          {/* SOUND CONTROL */}

          <div className="flex w-full justify-between items-center pb-6 px-4">
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
                  <span>
                    OFF | <span className="text-[#5d5d5df4]">ON</span>
                  </span>
                )}
              </div>
            </button>
            {data?.tokens.nodes.length !== 0 && (
              <Link href={'/nfts'}>
                <button
                  onClick={() => tv1SoundtrackStop()}
                  className=" cursor-fancy  border border-gray-400 py-2 px-4 shadow-sm shadow-gray-100/60 rounded-none w-auto  mt-4 text-xs"
                >
                  See NFTs
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostEchoes;
