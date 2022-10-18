import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { chainID } from '../../constants/chainId';

const LEDisconnected = ({ chainId, address }: any) => {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  return (
    <>
      <video
        src="https://res.cloudinary.com/aldi/video/upload/v1666095946/feltzine/ezgif.com-gif-maker_rmi3j3.mp4"
        autoPlay
        loop
        muted
        className=" object-cover w-full h-[60vh]  lg:h-[70vh] opacity-50  contrast-80 hue-rotate-50 bg-black mix-blend-exclusion hidden lg:flex"
      />

      <div className="text-[#ff0000] min-h-[60vh] lg:absolute inset-0  flex flex-col justify-between shadow-xl shadow-stone-200/10 rounded-2xl bg-[url('../public/images/tv-bg.png')] lg:p-8">
        <div className="min-h-[60vh] flex flex-col justify-between bg-[url('https://res.cloudinary.com/aldi/image/upload/v1665488312/feltzine/promo_art-x-final_bdoko4.gif')] bg-cover bg-opacity-10  lg:bg-none p-4 sm:p-8 lg:p-0 ">
          <h1>Hell House</h1>
          {!address && (
            <button
              type="button"
              onClick={() => {
                openConnectModal?.();
              }}
              className="min-w-none text-shadowFirst  mx-auto  bg-[#ff0000] text-[#f8f8f8] px-4 py-2"
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
              className=" text-shadowFirst text-[#f8f8f8]  bg-[#ff0000] my-auto  flex justify-center items-center px-4 py-2 hover:shadow-sm hover:shadow-red-400 cursor-fancy mx-auto "
            >
              Switch to MAINNET
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LEDisconnected;
