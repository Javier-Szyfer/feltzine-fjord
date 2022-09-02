import Link from "next/link";

interface TV1PublicMintProps {
  handleEnterTv: (id: number) => void;
  tv1Hover: boolean;
}

const TV1PublicMint = ({ handleEnterTv, tv1Hover }: TV1PublicMintProps) => {
  return (
    <Link href={"/lost-echoes"}>
      <button
        className="text-shadowFirstCollection cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center"
        onClick={() => handleEnterTv(1)}
      >
        <h2 className="text-[#ff0000] ">LOST ECHOES</h2>
        {tv1Hover && <p className=" absolute bottom-4 ">ACCESS</p>}
      </button>
    </Link>
  );
};

export default TV1PublicMint;
