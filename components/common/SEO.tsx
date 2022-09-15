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
  image = 'https://res.cloudinary.com/aldi/image/upload/v1663247546/feltzine/general0g-sized_nfyc2t.jpg',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      <link rel="preconnect" href="https://cloudinary.com" />
      <link rel="dns-prefetch" href="https://cloudinary.com" />
      <link
        rel="preconnect"
        href="https://res.cloudinary.com/aldi/image/upload/v1663247546/feltzine/general0g-sized_nfyc2t.jpg"
      />
      <link
        rel="dns-prefetch"
        href="https://res.cloudinary.com/aldi/image/upload/v1663247546/feltzine/general0g-sized_nfyc2t.jpg"
      />
      <link rel="preconnect" href="https://ipfs.infura.io" />
      <link rel="dns-prefetch" href="https://ipfs.infura.io" />

      <meta property="og:url" content="https://www.feltzine-fjord.vercel.app" />
      <meta property="og:site_name" content="Feltzine x Fjord" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta property="twitter:site" content="Feltzine" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image:src" content={image} />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="6300" />
      <meta property="twitter:creator" content="FeltZine" />
    </Head>
  );
};

export default SEO;
