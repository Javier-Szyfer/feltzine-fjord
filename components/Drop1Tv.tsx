import { useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import useSound from "use-sound";

import {
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { fjordDrop1ContractAddress } from "../constants/fjordDrop1ContractAddress";
import { fjordDrop1GoerliAbi } from "../contractABI/fjordDrop1GoerliAbi";

const Drop1Tv = ({
  setEnterTV1,
  setAllTVs,
  totalMintedDrop1,
  proof,
  address,
  tv1SoundtrackStop,
  isSoundOn,
}: any) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [processing, setProcessing] = useState(false);

  const price = 0.02;
  let totalPrice = mintAmount * price;

  //SOUNDS
  const [mint1, { stop: mint1Stop }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661350626/feltzine/mint1_th5lyy.mp3",
    { volume: 0.2 }
  );
  const [mint2, { stop: mint2Stop }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661350625/feltzine/mint2_biappo.mp3",
    { volume: 0.2 }
  );
  const [back, { stop: backStop }] = useSound(
    "https://res.cloudinary.com/aldi/video/upload/v1661351389/feltzine/back_o59yfu.mp3",
    { volume: 0.2 }
  );

  //WAGMI
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    addressOrName: address,
  });
  const { data: nftsOwned } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "mintPerWhitelistedWallet",
    args: [address],
    enabled: true,
  });
  const { config } = usePrepareContractWrite({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "whitelistMint",
    args: [
      mintAmount,
      proof,
      {
        value: ethers.utils.parseEther(totalPrice.toString()),
      },
    ],
  });
  const { data, write } = useContractWrite({
    ...config,
    onError(error) {
      alert(error);
      setProcessing(false);
    },
  });
  useWaitForTransaction({
    hash: data?.hash,
    wait: data?.wait,
    onSuccess() {
      setProcessing(false);
    },
  });

  const handleMint = () => {
    setProcessing(true);
    if (chain?.id !== 5) {
      alert("Please switch to Goerli");
      setProcessing(false);
      return;
    } else if (!address) {
      alert("Please connect your wallet");
      setProcessing(false);
      return;
    } else if (balance && balance?.formatted < totalPrice.toString()) {
      alert("Insufficient balance");
      setProcessing(false);
      return;
    } else if (nftsOwned && Number(nftsOwned) + mintAmount > 2) {
      alert("You can only own 2 NFTs");
      setProcessing(false);
      return;
    }
    write?.();
  };
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className=" text-drop1 relative text-sm md:text-lg border-[0.9px] h-full w-full mt-0 md:mt-0 border-[#55505084] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] min-h-[60vh] p-4 bg-[#01000055] opacity-95"
    >
      {/* <div className=" border-[0.5px] border-[#9da6a824] rounded-2xl  bg-gradient-to-t  from-[#1429cb] to-[#9f959599] w-full h-full " /> */}
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1661348392/feltzine/production_ID_3877749_gackzc.mp4"
        autoPlay
        loop
        muted
        className=" object-center opacity-60 contrast-80 hue-rotate-50 bg-black mix-blend-exclusion h-full w-full hidden lg:flex"
      />
      <div className="md:absolute inset-0 flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full  p-8 ">
        <div>
          <h2>Endangered Memories</h2>
          <span>
            Artifacts found:
            {ethers.BigNumber.from(totalMintedDrop1?._hex).toString()}/100
          </span>
          <h3 className="mt-8">
            Researchers discover Ina&apos;s memories in the year 3030.
          </h3>
          <p className="mt-8">
            They are not aware of today&apos;s cultural context and must
            categorize their findings based on what they imagine life was like
            for Ina, a child who lived 1000 years before them with no other
            record besides these objects recorded via analog.
          </p>
        </div>
        <div className="text-drop1  flex justify-end items-center mt-6 ">
          <h3 className="mr-10">Artifacts quantity</h3>
          <div className="border border-[#ff0000] flex">
            <button
              className={` ${
                mintAmount === 1 ? "bg-[#ff000066]" : "bg-none"
              } text-drop1 w-7 h-7 md:w-10 md:h-10 border-r border-[#ff0000] rounded-l cursor-fancy `}
              onClick={() => {
                setMintAmount(1), isSoundOn && mint1();
              }}
            >
              1
            </button>
            <button
              className={` ${
                mintAmount === 2 ? "bg-[#ff000066]" : "bg-none"
              } text-drop1 w-7 h-7 md:w-10 md:h-10 border-r border-[#ff0000] rounded-l cursor-fancy `}
              onClick={() => {
                isSoundOn && mint2(), setMintAmount(2);
              }}
            >
              2
            </button>
          </div>
        </div>
        <div className=" flex w-full  justify-between items-center mt-6">
          <button
            className="text-drop1 hover:text-[#ff3700] cursor-fancy "
            onClick={() => {
              isSoundOn && back(),
                setAllTVs(true),
                setEnterTV1(false),
                tv1SoundtrackStop();
            }}
          >
            BACK
          </button>
          <button
            className="border border-[#ff0000] px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-red-400 cursor-fancy "
            onClick={() => handleMint()}
            disabled={processing}
          >
            {processing ? "PROCESSING..." : `DISCOVER Ξ${totalPrice}`}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Drop1Tv;
