interface FjordMintProps {
  stop2: () => void;
  tv2Hover: boolean;
}

const Tv2FjordMint = ({ stop2, tv2Hover }: FjordMintProps) => {
  return (
    <div
      className={` ${
        tv2Hover
          ? ''
          : "bg-[url('https://res.cloudinary.com/aldi/image/upload/v1665490849/feltzine/hellhouse59_-_A_Screaming_Cross_ghost_in_the_Cemetery_of_Abi_copy_lcpudb.jpg')]  rounded-2xl"
      } bg-cover w-full h-full`}
    >
      <a
        href={
          'https://fjordnfts.com/drops/mainnet/0xC1656a25591d440b88275E5D36Ad921F2048A9Cb'
        }
        rel="noopener noreferrer"
        target="_blank"
      >
        <button
          onClick={() => stop2()}
          className="text-shadowFirstCollection cursor-fancy hover:font-black  text-[#ff0000] shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
        >
          <h2 className="">HELL HOUSE</h2>
          {tv2Hover && (
            <p className="absolute bottom-4 p-2  bg-[#ff0000] text-[#fee1e1] ">
              MINT THROUGH FJORD
            </p>
          )}
        </button>
      </a>
    </div>
  );
};

export default Tv2FjordMint;
