import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/common/Header';
import InitView from '../components/InitView';

const Home: NextPage = () => {
  const title = 'FeltZine x Fjord';
  // const description =
  //   'Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools';
  // const image = 'https://www.feltzine-fjord.vercel.app/assets/general-og.jpg';

  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        /> */}
        <title>{title}</title>
        {/* <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feltzine-fjord.vercel.app" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="Feltzine" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta property="twitter:creator" content="FeltZine" />
        <meta property="og:image:alt" content={`${title}- open graph card`} /> */}
      </Head>

      <div className="flex flex-col justify-center items-center overflow-hidden  ">
        <div className="noise" />
        <Header />
        <InitView />
      </div>
    </>
  );
};

export default Home;
