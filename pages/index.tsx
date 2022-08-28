import { useContext, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DropsGrid from "../components/DropsGrid";
import InitView from "../components/InitView";
import { ConnectBtn } from "../components/ConnectBtn";
import { SoundContext } from "../context/soundContext/soundContext";

const Home: NextPage = () => {
  const [enter, setEnter] = useState(false);

  return (
    <div className="flex flex-col h-full  justify-center items-center overflow-hidden">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="FeltZine - 4 Fjord Drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col gap-4 md:gap-0 md:flex-row items-center md:justify-center pt-2 md:pt-8">
        {/* Mobile connect */}
        {enter && (
          <div className="mt-4 sm:mt-0 lg:hidden h-auto  cursor-fancy text-sm md:pl-4  md:fixed z-40 md:top-8 md:left-4">
            <ConnectBtn />
          </div>
        )}

        <h1 className="text-[#fdfdfd] mt-2  md:mt-0 text-shadowInit1  2xs:text-xl xs:text-2xl  md:text-3xl lg:text-5xl xl:text-6xl">
          Fjord x Felt Zine
        </h1>
      </div>
      <div className="noise" />
      {enter ? (
        <DropsGrid enter={enter} />
      ) : (
        <InitView enter={enter} setEnter={setEnter} />
      )}
    </div>
  );
};

export default Home;
