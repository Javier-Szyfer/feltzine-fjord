interface FjordMintProps {
  stop2: () => void;
  tv2Hover: boolean;
}

const Tv2FjordMint = ({ stop2, tv2Hover }: FjordMintProps) => {
  return (
    <a
      href={
        'https://fjordnfts.com/drops/mainnet/0xC1656a25591d440b88275E5D36Ad921F2048A9Cb'
      }
      rel="noopener noreferrer"
      target="_blank"
    >
      <button
        onClick={() => stop2()}
        className="text-shadowFirstCollection cursor-fancy  text-[#ff0000] shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
      >
        <h2 className=" ">HELL HOUSE</h2>
        {tv2Hover && (
          <p className="absolute bottom-4 p-3 border border-[#ff0000] ">
            MINT THROUGH FJORD
          </p>
        )}
      </button>
    </a>
  );
};

export default Tv2FjordMint;
