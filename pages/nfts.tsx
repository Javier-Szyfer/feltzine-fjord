import Head from "next/head";
import useDrop1Context from "../context/drop1Context/drop1Ctx";
import Header from "../components/common/Header";
import Link from "next/link";

const NftsInWallet = () => {
  //DROP 1
  const { nftsInWallet } = useDrop1Context();
  const tokens = nftsInWallet?.tokens.nodes;

  return (
    <div className=" max-w-6xl mx-auto ">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="Lost echoes - nfts owned" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise"></div>
      <Header />
      {tokens?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 mt-12">
          {tokens?.map((t: any) => {
            const token = t.token;
            const animationURL = token.metadata.animation_url.split("/").pop();
            const formatedAnimationURL = `https://ipfs.io/ipfs/${animationURL}`;
            return (
              <div
                key={token.tokenId}
                className="relative flex flex-col justify-start items-center  border border-[#f8f8f8] p-2 text-white w-full object-cover"
              >
                <video
                  src={formatedAnimationURL}
                  autoPlay
                  loop
                  className=" w-full h-64 object-cover"
                />
                <div className=" mt-8 text-sm">Token id: {token.tokenId}</div>
              </div>
            );
          })}
        </div>
      )}
      {!tokens?.length && (
        <div className="flex flex-col min-h-[60vh] justify-center items-center gap-6  ">
          <h1 className="text-shadowTitle">
            You don&apos;t own Lost Echoes NFTs
          </h1>
          <Link href={"/lost-echoes"}>
            <button className="relative cursor-fancy border text-shadowTitle hover:shadow-md hover:shadow-white/40 border-[#f3f3f3] px-4 py-2 hover:">
              Mint
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NftsInWallet;
