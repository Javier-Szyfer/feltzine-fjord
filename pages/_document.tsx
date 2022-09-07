import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="https://fjord.feltzine.art/assets/favicon.jpg" />
        <meta content="#000000" name="theme-color" />
        <meta content="#000000" name="msapplication-TileColor" />
        {/* 
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
          content="https://res.cloudinary.com/aldi/image/upload/v1662551284/feltzine/preview_nsva8h.jpg"
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
          content="https://res.cloudinary.com/aldi/image/upload/v1662551284/feltzine/preview_nsva8h.jpg"
          key="twimage"
        /> */}

        <link rel="preload" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&family=Public+Sans:ital,wght@1,200&family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
