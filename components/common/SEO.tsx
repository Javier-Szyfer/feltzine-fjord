import Head from 'next/head';
import { FC } from 'react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const SEO: FC<Props> = ({
  title = 'FeltZine x Fjord',
  description = 'Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools',
  image = 'https://www.feltzine-fjord.vercel.app/assets/general-og.jpg',
}) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://feltzine-fjord.vercel.app" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://feltzine-fjord.vercel.app/assets/general-og.jpg"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="Feltzine" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://feltzine-fjord.vercel.app/assets/general-og.jpg"
      />
      <meta property="twitter:creator" content="FeltZine" />
      <meta property="og:image:alt" content={`${title}- open graph card`} />
    </Head>
  );
};

export default SEO;
