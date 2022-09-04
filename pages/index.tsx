import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/common/Header";
import InitView from "../components/InitView";
import useSWR from "swr";
import { getNFTsInWallet } from "../lib/OwnedNftsQuery";
import request, { RequestDocument } from "graphql-request";

const Home: NextPage = () => {
  const fetcher = (query: RequestDocument) =>
    request("https://api.zora.co/graphql", query);

  const { data: nfts } = useSWR(getNFTsInWallet, fetcher, {
    refreshInterval: 5,
  });
  console.log(nfts);

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
