interface FjordMintProps {
  stop1: () => void;
  tv1Hover: boolean;
}

const Tv1FjordMint = ({ stop1, tv1Hover }: FjordMintProps) => {
  return (
    <a
      href={
        "https://fjordnfts.com/drops/mainnet/0xC1656a25591d440b88275E5D36Ad921F2048A9Cb"
      }
      rel="noopener noreferrer"
      target="_blank"
    >
      <button
        onClick={() => stop1()}
        className="text-shadowFirstCollection cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center "
      >
        <h2 className="text-[#ff0000] ">LOST ECHOES</h2>
        {tv1Hover && <p className="absolute bottom-4 ">MINT THROUGH FJORD</p>}
      </button>
    </a>
  );
};

export default Tv1FjordMint;
