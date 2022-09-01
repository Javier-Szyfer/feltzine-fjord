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
import LostEchoesPM from "../components/lost-echoes/LostEchoesPM";
import LEFjord from "../components/lost-echoes/LEFjord";
//WAGMI
import {
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
//DATA
import { fjordDrop1ContractAddress } from "../constants/contractAddresses";
import { fjordDrop1GoerliAbi } from "../contractABI/goerliABIS";
import { ConnectBtn } from "../components/common/ConnectBtn";
//
import { useWhitelist } from "../hooks/useWhitelist";
import { wlAddresses1 } from "../utils/merkle/wlAddresses1";
import { getMerkleProof } from "../utils/merkle/merkle";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import LELoading from "../components/lost-echoes/LELoading";
import LEDisconnected from "../components/lost-echoes/LEDisconnected";

const LostEchoes = () => {
  //CONTEXT
  const {
    isSoundOn,
    setIsSoundOn,
    toggleSound,
    tv1Soundtrack,
    tv1SoundtrackPause,
    tv1SoundtrackPlay,
    tv1SoundtrackStop,
  } = useSoundContext();
  const { endWLDateInSecs } = useDrop1Context();
  //STATE
  const [loading, setLoading] = useState(true);
  const [whiteListMintAmount, setWhiteListMintAmount] = useState(1);
  const [publicMintAmount, setPublicMintAmount] = useState(1);
  const [processing, setProcessing] = useState(false);
  const date = new Date();
  const price = 0.02;
  let totalWhitelistPrice = whiteListMintAmount * price;
  let totalPublicPrice = publicMintAmount * price;

  ////////////////////////////////
  ///MOCK///
  let publicMint = true;
  ////////////////////////////////

  //WAGMI READ
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { data: nftsOwned } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "mintPerWhitelistedWallet",
    args: [address],
  });
  const isWhitelisted = useWhitelist(address, wlAddresses1);
  //WRITE
  // WHITELIST MINT
  const { config } = usePrepareContractWrite({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "whitelistMint",
    enabled: false,
    args: [
      whiteListMintAmount,
      getMerkleProof(
        address ? address : "0x000000000000000000000000",
        wlAddresses1
      ),
      {
        value: ethers.utils.parseEther(totalWhitelistPrice.toString()),
      },
    ],
  });
  const { data, write } = useContractWrite({
    ...config,
    onError(error) {
      toast.error(error.message);
      setProcessing(false);
    },
  });
  useWaitForTransaction({
    hash: data?.hash,
    wait: data?.wait,
    onSuccess() {
      setProcessing(false);
      toast.success("Transaction successful", { toastId: "mintSuccess-tv1" });
    },
  });
  const handleWhitelistMint = () => {
    setProcessing(true);
    if (chain?.id !== 5) {
      toast.error("Please connect to Goerli Testnet", {
        toastId: "wrongNetwork-tv1",
      });
      setProcessing(false);
      return;
    } else if (!address) {
      toast.error("Please connect your wallet", { toastId: "noWallet-tv1" });
      setProcessing(false);
      return;
    } else if (balance && balance?.formatted < totalWhitelistPrice.toString()) {
      toast.error("Insufficient funds", { toastId: "insufficientFunds-tv1" });
      setProcessing(false);
      return;
    } else if (nftsOwned && Number(nftsOwned) + whiteListMintAmount > 2) {
      toast.error("You can only mint 2 NFTs", {
        toastId: "maxMintExceeded-tv1",
      });
      setProcessing(false);
      return;
    } else if (!isWhitelisted) {
      toast.error("You are not whitelisted", { toastId: "notWhitelisted-tv1" });
      setProcessing(false);
      return;
    } else if (date.getTime() >= endWLDateInSecs) {
      toast.error("Whitelist period has ended", {
        toastId: "whitelistEnded-tv1",
      });
      setProcessing(false);
      return;
    }
    write?.();
  };

  //PUBLIC MINT

  const handlePublicMint = () => {};
  // HANDLE SOUND
  const handleSoundOff = () => {
    toggleSound(),
      setIsSoundOn(!isSoundOn),
      tv1Soundtrack ? tv1SoundtrackPause() : tv1SoundtrackPlay();
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => tv1SoundtrackStop();
  }, []);

  return (
    <div className=" overflow-hidden">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="FeltZine - 4 Fjord Drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Mobile connect */}
      <div className="mt-5 ml-4 lg:hidden cursor-fancy text-sm  fixed z-40 md:top-6 md:right-4">
        <ConnectBtn />
      </div>
      {/* Desktop connect */}
      <div className=" hidden lg:flex fixed z-40  top-8 right-4 cursor-fancy text-sm ">
        <ConnectBtn />
      </div>

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
            <LEDisconnected chainId={chain?.id} />
          )}
          {/* WHITELIST ACTIVE AND WHITELISTED ACC */}
          {address &&
            isWhitelisted &&
            date.getTime() < endWLDateInSecs &&
            chain?.id === 5 &&
            !loading &&
            !publicMint && (
              <div className=" text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LostEchoesWL
                  handleWhitelistMint={handleWhitelistMint}
                  whiteListMintAmount={whiteListMintAmount}
                  setWhiteListMintAmount={setWhiteListMintAmount}
                  totalPrice={totalWhitelistPrice}
                  processing={processing}
                />
              </div>
            )}
          {/* WHITELIST ACTIVE AND NOT WHITELISTED ACC */}
          {address &&
            !isWhitelisted &&
            !loading &&
            date.getTime() < endWLDateInSecs &&
            !publicMint && (
              <div className=" text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LEFjord />
              </div>
            )}
          {/* WHITELIST ENDED AND FJORD MINT ENDED */}
          {address &&
            date.getTime() < endWLDateInSecs &&
            !loading &&
            publicMint && (
              <div className=" text-drop1 relative lg:min-h-none text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95">
                <LostEchoesPM
                  publicMintAmount={publicMintAmount}
                  setPublicMintAmount={setPublicMintAmount}
                  handlePublicMint={handlePublicMint}
                  processing={processing}
                  totalPrice={totalPublicPrice}
                />
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
