import Link from "next/link";
import { useDrop1Context } from "../../../context/drop1Context/drop1Ctx";
import Timer from "../../common/Timer";

interface WhitelistProps {
  tv1Hover: boolean;
  handleEnterTv: (id: number) => void;
}

const Tv1Whitelist = ({ tv1Hover, handleEnterTv }: WhitelistProps) => {
  const date = new Date();
  const { endWLDateInSecs, formattedWLEndDate } = useDrop1Context();

  return (
    <Link href={"/lost-echoes"}>
      <button
        className="text-shadowFirstCollection cursor-fancy relative shadow-xl shadow-stone-200/5 rounded-2xl bg-[url('../public/images/tv-bg.png')] w-full h-full  flex flex-col justify-center items-center"
        onClick={() => handleEnterTv(1)}
      >
        <h2 className="text-[#ff0000] ">LOST ECHOES</h2>
        {!tv1Hover && endWLDateInSecs > date.getTime() && (
          <Timer deadline={endWLDateInSecs} size="2xl" />
        )}
        {tv1Hover && endWLDateInSecs > date.getTime() && (
          <p className="text-2xl">{formattedWLEndDate}</p>
        )}
        {tv1Hover && <p className=" absolute bottom-4 ">ACCESS</p>}
      </button>
    </Link>
  );
};

export default Tv1Whitelist;
