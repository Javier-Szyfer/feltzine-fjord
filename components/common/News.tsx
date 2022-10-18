import Marquee from 'react-fast-marquee';
import useDrop1Context from '../../context/drop1Context/drop1Ctx';
import useDrop2Context from '../../context/drop2Context/drop2Ctx';

const News = ({ size }: any) => {
  const { totalMintedDrop1 } = useDrop1Context();
  const { totalMintedDrop2 } = useDrop2Context();
  return (
    <div
      className={`text-shadowFirst flex md:px-6 items-center justify-start w-full text-[#f8f8f8] tracking-tighter text-[20px]  md:text-${size} mx-auto sm:max-w-lg md:max-w-none 2xl:max-w-6xl`}
    >
      <span className="firaSans font-extralight pr-2 bg-[#0c0c0c61]  border-r-4 border-double border-r-[#565555ad] ">
        NEWS
      </span>
      <Marquee
        speed={90}
        pauseOnHover={true}
        gradient={true}
        gradientColor={[10, 10, 10]}
        gradientWidth={50}
        className="pixeledNews italic md:text-2xl tracking-tight "
      >
        <span className="mx-1">
          <span className="font-bold">*:･ﾟLost Echoes *:･ﾟ</span> Status:{' '}
          <span className="font-bold">ENDED</span> - Total minted:{' '}
          {totalMintedDrop1}/525 ✧✧✧
        </span>
        <span className="mx-1">
          <span className="font-bold"> ψ Hell House ψ</span> Status:{' '}
          <span className="font-bold">ACTIVE</span> - Total minted:{' '}
          {totalMintedDrop2}/777 ✧✧✧
        </span>

        <span className="mr-1"> FJORD Drop3 - Status: NOT STARTED ✧✧✧</span>
        <span className="mr-1"> FJORD Drop4 - Status: NOT STARTED ✧✧✧</span>
      </Marquee>
    </div>
  );
};

export default News;
