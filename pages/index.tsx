import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/common/Header";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <Head>
        <title>Felt Zine x FJORD NFT</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://fjord.feltzine.art/assets/favicon.jpg" />
        <meta
          property="og:title"
          content="FELT Zine x FJORD NFT"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools"
          key="ogdesc"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image:alt" content="Felt Zine x Fjord open graph" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta
          property="og:url"
          content="https://fjord.feltzine.art/"
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://fjord.feltzine.art/assets/preview.jpg"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="https://fjord.feltzine.art/"
          key="ogsitename"
        />

        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta
          property="twitter:domain"
          content="fjord.feltzine.art"
          key="twdomain"
        />
        <meta
          property="twitter:url"
          content="https://fjord.feltzine.art/"
          key="twurl"
        />
        <meta
          name="twitter:title"
          content="FELT Zine x FJORD NFT"
          key="twtitle"
        />
        <meta
          name="twitter:description"
          content="Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools"
          key="twdesc"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/aldi/image/upload/v1662413609/feltzine/preview_e5djw6.jpg"
          key="twimage"
        />
      </Head>
      <div className="noise" />
      <Header />
      <InitView />
    </div>
  );
};

export default Home;
