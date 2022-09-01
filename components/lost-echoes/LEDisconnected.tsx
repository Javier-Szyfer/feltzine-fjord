import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import useSoundContext from "../../context/soundContext/soundCtx";

const LEDisconnected = ({ chainId, address }: any) => {
  console.log("chainId", chainId);
  console.log("address", address);
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { tv1SoundtrackPlay, tv1Soundtrack } = useSoundContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="min-h-[60vh] text-drop1  relative  lg:min-h-none   text-sm md:text-[18px] lg:text-lg border-[0.9px] h-full w-full mt-4 md:mt-0 border-[#302e2e84] shadow-xl shadow-red-800/10 hover:shadow-[#ff370030]/30 text-[#ff0000] bg-[#01000055]  p-4  opacity-95"
    >
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1661348392/feltzine/production_ID_3877749_gackzc.mp4"
        autoPlay
        loop
        muted
        className=" opacity-60 contrast-80 hue-rotate-50 bg-black mix-blend-exclusion hidden lg:flex"
      />
      <div className="min-h-[70vh] lg:min-h-0 lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] p-8 ">
        <h1>Lost Echoes</h1>
        {!address && (
          <button
            type="button"
            onClick={() => {
              openConnectModal?.();
            }}
            className="h-full min-w-none flex justify-center items-center w-full "
          >
            Connect wallet to proceed
          </button>
        )}
        {chainId && chainId !== 5 && (
          <button
            type="button"
            onClick={() => {
              openChainModal?.();
            }}
            className=" border border-[#ff0000] my-auto  flex justify-center items-center px-3 py-1 hover:shadow-sm hover:shadow-red-400 cursor-fancy mx-auto "
          >
            Switch to Mainnet
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default LEDisconnected;
