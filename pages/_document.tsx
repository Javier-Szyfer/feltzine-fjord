import { Html, Main, NextScript } from 'next/document';

export default function Document() {
  const title = 'FeltZine x Fjord';
  const description =
    'Revolutionizing NFT Drops With Felt Zine and Fjord NFTs Liquidity Bootstrapping Pools';
  const image = 'https://www.feltzine-fjord.vercel.app/assets/general-og.jpg';

  return (
    <Html lang="en">
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" href="https://fjord.feltzine.art/assets/favicon.jpg" />
      <meta content="#000000" name="theme-color" />
      <meta content="#000000" name="msapplication-TileColor" />

      <link rel="preload" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&family=Public+Sans:ital,wght@1,200&family=VT323&display=swap"
        rel="stylesheet"
      />
      <title>{title}</title>
      <meta name="description" content={description} />
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
      <meta property="og:image:alt" content={`${title}- open graph card`} />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
