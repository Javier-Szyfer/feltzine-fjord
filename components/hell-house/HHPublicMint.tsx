import Link from 'next/link';
import { useState } from 'react';
import useSound from 'use-sound';
import useDrop2Context from '../../context/drop2Context/drop2Ctx';
import useSoundContext from '../../context/soundContext/soundCtx';
//DATA
import { hellHouseABI } from '../../contractABI/mainnetABIS';
//WAGMI
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { chainID } from '../../constants/chainId';
import { hellHouseMainnetAddress } from '../../constants/contractAddresses';
import { useAuth } from '../../hooks/useAuth';
import { formatHash } from '../../utils/formatters';

const HHPublicMint = () => {
  //CONTEXT
  const { drop2Stage, readTMinted } = useDrop2Context();
  const { address, balance, chain } = useAuth();

  //STATE
  const [publicMintAmount, setPublicMintAmount] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [showTxHash, setShowTXHash] = useState(false);

  const price = 0.02;
  let totalPublicPrice = publicMintAmount * price;
  //WAGMI

  //WRITE

  const { config } = usePrepareContractWrite({
    addressOrName: hellHouseMainnetAddress,
    contractInterface: hellHouseABI,
    functionName: 'publicMint',
    args: [
      publicMintAmount,
      {
        value: ethers.utils.parseEther(
          totalPublicPrice ? totalPublicPrice.toString() : '0'
        ),
      },
    ],
  });
  const { data, write: publicMintWrite } = useContractWrite({
    ...config,
    onError(error) {
      toast.error(error.message);
      setProcessing(false);
    },
  });
  const { data: txConfirmed } = useWaitForTransaction({
    hash: data?.hash,
    wait: data?.wait,
    confirmations: 2,
    onSuccess() {
      setProcessing(false);
      //refetch
      readTMinted();
      setShowTXHash(true);
      toast.success('Transaction successful', { toastId: 'mintSuccess-tv1' });
    },
  });

  //CONTEXT
  const { totalMintedDrop2 } = useDrop2Context();
  const { isSoundOn, tv2SoundtrackStop } = useSoundContext();

  //SOUNDS
  const [back] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1661351389/feltzine/back_o59yfu.mp3',
    { volume: 0.2 }
  );
  //PUBLIC MINT
  const handlePublicMint = () => {
    setProcessing(true);
    if (!publicMintAmount || publicMintAmount == 0) {
      toast.error('Please enter a valid amount');
      setProcessing(false);
      return;
    } else if (drop2Stage !== 2) {
      toast.error('Public mint is not active yet');
      setProcessing(false);
    } else if (chain?.id !== chainID) {
      toast.error('Please connect to Mainnet', {
        toastId: 'wrongNetwork-tv1-publicMint',
      });
      setProcessing(false);
      return;
    } else if (!address) {
      toast.error('Please connect your wallet', {
        toastId: 'noWallet-tv1-publicMint',
      });
      setProcessing(false);
      return;
    } else if (Number(totalMintedDrop2) + publicMintAmount > 777) {
      toast.error('Max of 777 exceeded ', {
        toastId: 'maxMint-tv1-publicMint',
      });
      setProcessing(false);
      return;
    } else if (balance && parseFloat(balance?.formatted) < totalPublicPrice) {
      toast.error('Insufficient funds', {
        toastId: 'insufficientFunds-tv1-publicMint',
      });
      setProcessing(false);
      return;
    }
    publicMintWrite?.();
  };

  return (
    <>
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1666095946/feltzine/ezgif.com-gif-maker_rmi3j3.mp4"
        autoPlay
        loop
        muted
        className="object-cover w-full h-[60vh]  lg:h-[70vh] opacity-50  contrast-80 hue-rotate-50 bg-black mix-blend-exclusion  "
      />

      <div className="absolute inset-0 shadow-xl flex flex-col justify-between shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] p-8 text-[#ff0000]">
        <div>
          <div className="flex gap-4 flex-col-reverse md:flex-row justify-between md:items-center">
            <h2 className="bg-black  mr-auto ">HELL HOUSE</h2>
            {/* STATUS */}
            {drop2Stage == 2 ? (
              <span className="flex  items-center text-[#00ff00] text-[10px] sm:text-sm">
                <span className=" animate-pulse w-2 h-2 bg-[#00ff00] mr-2 rounded-full" />{' '}
                Active
              </span>
            ) : (
              <span className="flex items-center text-[#ff0000] text-[10px]  sm:text-sm">
                <span className=" animate-pulse w-2 h-2 bg-[#ff0000] mr-2 rounded-full" />{' '}
                Inactive
              </span>
            )}
          </div>
        </div>
        <h2 className="bg-black mr-auto">
          GHOSTS FOUND:
          {totalMintedDrop2 ? `${totalMintedDrop2}/777` : 'N/A'}
        </h2>
        <div className="text-drop1  flex justify-end items-center mt-6 ">
          <h3 className="mr-10 bg-black inline-block">Ghost quantity</h3>
          <div className="border border-[#ff0000] flex">
            <input
              type="number"
              min={1}
              value={publicMintAmount}
              onChange={(e) => {
                setPublicMintAmount(e.target.valueAsNumber);
              }}
              onFocus={() => setShowTXHash(false)}
              className="w-20 bg-black text-right px-4 py-1 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className=" flex w-full  justify-between items-center mt-6">
          <Link href={'/drops'}>
            <button
              className="text-drop1 hover:text-[#ff3700] cursor-fancy bg-black inline-block"
              onClick={() => {
                isSoundOn && back(), tv2SoundtrackStop();
              }}
            >
              BACK
            </button>
          </Link>
          <button
            className="border border-black bg-[#ff0000] text-black inline-block px-3 py-1 text-drop1 hover:shadow-sm hover:shadow-red-400 cursor-fancy "
            onClick={() => handlePublicMint()}
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
              `MINT Ξ${totalPublicPrice ? totalPublicPrice.toFixed(2) : 0}`
            )}
          </button>
        </div>
      </div>
      {showTxHash && (
        <Link
          href={`https://etherscan.io/tx/${txConfirmed?.transactionHash}`}
          passHref
        >
          <a target="_blank" rel="noopener noreferrer">
            <div className="relative flex xs:flex-col md:flex-row  font-bold text-[10px] text-[#00eeff]    px-2 py-1 bg-[#10101077]  gap-0 text-center leading-3 border text-shadowFirst border-[#00eeff] mt-4  ">
              <span className="mr-8">
                SEE YOUR TX ON ETHERSCAN, YOU SHALL RECEIVE YOUR NFT SOON
              </span>
              <span>
                {txConfirmed && formatHash(txConfirmed?.transactionHash)}
              </span>
            </div>
          </a>
        </Link>
      )}
    </>
  );
};

export default HHPublicMint;
