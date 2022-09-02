import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/common/Header";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="FeltZine - 4 Fjord Drops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise" />
      <Header />
      <InitView />
    </div>
  );
};

export default Home;
