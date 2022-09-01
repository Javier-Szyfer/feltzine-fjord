import type { NextPage } from "next";
import useAllTvsContext from "../context/allTvsContext/allTvsCtx";
import Head from "next/head";
import Header from "../components/common/Header";
import DropsGrid from "../components/DropsGrid";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  const { enter } = useAllTvsContext();

  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="FeltZine - 4 Fjord Drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise"></div>
      <Header enter={enter} />
      {enter ? <DropsGrid /> : <InitView />}
    </div>
  );
};

export default Home;
