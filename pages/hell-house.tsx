import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
//CONTEXT
import useDrop2Context from '../context/drop2Context/drop2Ctx';
import useSoundContext from '../context/soundContext/soundCtx';
//COMPONENTS
import Header from '../components/common/Header';
import News from '../components/common/News';

//VIEWS
import HHDisconnected from '../components/hell-house/HHDisconnected';
import HHLoading from '../components/hell-house/HHLoading';
import HHPublicMint from '../components/hell-house/HHPublicMint';

//WAGMI
import { useAccount, useNetwork } from 'wagmi';
//
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chainID } from '../constants/chainId';

const LostEchoes = () => {
  const title = 'FeltZine - Hell House';
  const description =
    'Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools';
  const image = 'https://feltzine-fjord.vercel.app/assets/general-og.jpg';

  //CONTEXT
  const {
    isSoundOn,
    tv1SoundtrackStop,
    setIsSoundOn,
    toggleSound,
    tv2Soundtrack,
    tv2SoundtrackPause,
    tv2SoundtrackPlay,
  } = useSoundContext();
  const { hellHouseNfts, drop2Stage } = useDrop2Context();

  const { data } = hellHouseNfts;
  //STATE
  const [loading, setLoading] = useState(true);

  //WAGMI
  const { chain } = useNetwork();
  const { address } = useAccount();

  useEffect(() => {
    const loadingTime = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTime);
  }, []);

  useEffect(() => {
    if (isSoundOn) {
      tv2SoundtrackPlay();
    } else {
      tv2SoundtrackPause();
    }
  }, [isSoundOn]);

  const handleSoundOff = () => {
    toggleSound(),
      setIsSoundOn(!isSoundOn),
      tv2Soundtrack && tv2SoundtrackPause();
    !tv2Soundtrack && !isSoundOn && tv2SoundtrackPlay();
  };

  return (
    <div className=" overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://feltzine-fjord.vercel.app/hell-house"
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
        </div>

        <div
          className="relative px-4 w-full mx-auto flex flex-col justify-start 2xl:justify-center items-center 
          md:py-4 lg:shadow-xl   lg:shadow-stone-600/50 sm:max-w-6xl md:max-w-4xl 2xl:max-w-7xl text-[10px] xs:text-sm md:text-[18px] lg:text-lg  2xl:text-2xl min-h-[100vh] lg:min-h-[80vh]  font-bold"
        >
          {/* LOADING */}
          {loading && <HHLoading />}
          {/* DISCONNECTED OR WRONG CHAIN  */}
          {!loading && (!address || chain?.id != chainID) && (
            <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-[#ff0000]/10 hover:shadow-[#ff0000]/30  bg-[#01000055]  p-4  opacity-95">
              <HHDisconnected chainId={chain?.id} address={address} />
            </div>
          )}

          {/* MINT ENDED */}
          {/* {address && !loading && chain?.id === chainID && (
            <div className=" text-drop1  relative  lg:min-h-none  border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-[#00eeff]/10 hover:shadow-[#00eeff]/30 text-[#00eeff] bg-[#01000055]  p-4  opacity-95">
              <LEMintEnded />
            </div>
          )} */}

          {/* PUBLIC MINT */}
          {address && !loading && chain?.id === chainID && drop2Stage === 2 && (
            <div className=" text-drop1  relative  lg:min-h-none   border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-[#ff0000]/10 hover:shadow-[#ff0000]/30  bg-[#01000055]  p-4  opacity-95">
              <HHPublicMint />
            </div>
          )}

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
