import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import useSoundContext from "../../context/soundContext/soundCtx";
import { chainID } from "../../constants/chainId";

const LEDisconnected = ({ chainId, address }: any) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { tv1SoundtrackPlay, tv1Soundtrack } = useSoundContext();
  return (
    <>
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1661348392/feltzine/production_ID_3877749_gackzc.mp4"
        autoPlay
        loop
        muted
        className=" opacity-60 contrast-80 hue-rotate-50 bg-black mix-blend-exclusion hidden lg:flex"
      />

      <div className="min-h-[60vh] lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] lg:p-8">
        <div className="min-h-[60vh] flex flex-col justify-between bg-[url('https://res.cloudinary.com/aldi/image/upload/v1662031129/feltzine/gifBg1_aeastj.gif')] bg-cover bg-opacity-10  lg:bg-none p-4 sm:p-8 lg:p-0 ">
          <h1>Lost Echoes</h1>
          {!address && (
            <button
              type="button"
              onClick={() => {
                openConnectModal?.();
              }}
              className="min-w-none flex justify-center items-center w-full "
            >
              Connect wallet to proceed
            </button>
          )}
          <div className=""></div>

          {chainId && chainID && (
            <button
              type="button"
              onClick={() => {
                openChainModal?.();
              }}
              className=" border border-[#ff0000] my-auto  flex justify-center items-center px-3 py-1 hover:shadow-sm hover:shadow-red-400 cursor-fancy mx-auto "
            >
              Switch to GOERLI
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LEDisconnected;
