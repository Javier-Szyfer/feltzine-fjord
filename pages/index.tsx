import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/common/Header";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <Head>
        <meta property="og:url" content="https://fjord.feltzine.art" />
        <meta property="og:site_name" content="FELT Zine x FJORD" />
        <meta property="og:title" content="FELT Zine x FJORD NFT" />
        <meta
          property="og:description"
          content="Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools "
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/aldi/image/upload/v1662551284/feltzine/preview_nsva8h.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="twitter:site" content="FeltZine" />
        <meta property="twitter:title" content="FELT Zine x FJORD NFT" />
        <meta property="twitter:domain" content="fjord.feltzine.art" />
        <meta
          property="twitter:description"
          content="Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools "
        />
        <meta
          property="twitter:image:src"
          content="https://res.cloudinary.com/aldi/image/upload/v1662551284/feltzine/preview_nsva8h.jpg"
        />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
        <meta property="twitter:creator" content="FeltZine" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="noise" />
      <Header />
      <InitView />
    </div>
  );
};

export default Home;
