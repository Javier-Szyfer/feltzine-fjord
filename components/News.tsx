import Marquee from "react-fast-marquee";
import useDrop1Context from "../context/drop1Context/drop1Ctx";

const News = ({ size }: any) => {
  const { totalMintedDrop1 } = useDrop1Context();
  return (
    <div
      className={`text-shadowFirst flex md:px-6 items-center justify-start w-full  text-[#f8f8f8] tracking-tighter text-[20px] md:text-${size} 2xl:max-w-6xl`}
    >
      <span className="firaSans font-extralight pr-2 bg-[#0c0c0c61]  border-r-4 border-double border-r-[#565555ad] ">
        NEWS
      </span>
      <Marquee
        speed={80}
        pauseOnHover={true}
        gradient={true}
        gradientColor={[10, 10, 10]}
        gradientWidth={50}
        className="publicSans italic "
      >
        FJORD Drop1 - Endangered Memories - Status: ACTIVE - Total minted:{" "}
        {totalMintedDrop1}/100 | FJORD Drop2 - Status: NOT STARTED | FJORD Drop3
        - Status: NOT STARTED | FJORD Drop4 - Status: NOT STARTED |{" "}
      </Marquee>
    </div>
  );
};

export default News;
