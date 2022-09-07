import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Header from "../components/common/Header";
import InitView from "../components/InitView";

const Home: NextPage = () => {
  return (
    <div className=" flex flex-col justify-center items-center overflow-hidden  ">
      <NextSeo
        title="FELT Zine x FJORD NFT"
        description="Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools"
        canonical="https://fjord.feltzine.art/"
        openGraph={{
          url: "https://fjord.feltzine.art/",
          title: "FELT Zine x FJORD NFT",
          description:
            "Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools",
          images: [
            {
              url: "https://res.cloudinary.com/aldi/image/upload/v1662551284/feltzine/preview_nsva8h.jpg",
              width: 1200,
              height: 630,
              alt: "Felt Zine x Fjord open graph",
              type: "image/jpeg",
            },
          ],
          site_name: "Felt Zine x Fjord",
        }}
        twitter={{
          handle: "@FeltZine",
          site: "@FeltZine",
          cardType: "summary_large_image",
        }}
      />
      <div className="noise" />
      <Header />
      <InitView />
    </div>
  );
};

export default Home;
