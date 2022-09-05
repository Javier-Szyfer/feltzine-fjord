import Head from "next/head";
import useDrop1Context from "../context/drop1Context/drop1Ctx";
import { useAccount } from "wagmi";
import Header from "../components/common/Header";

const NftsInWallet = () => {
  const { address } = useAccount();
  //DROP 1
  const { nftsInWallet } = useDrop1Context();
  const tokens = nftsInWallet?.tokens.nodes;
  console.log("nftsInWallet", tokens);

  return (
    <div className=" max-w-6xl mx-auto ">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="Lost echoes - nfts owned" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise"></div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 mt-12">
        {tokens?.map((t: any) => {
          const token = t.token;
          return (
            <div
              key={token.tokenId}
              className="flex flex-col justify-start items-center  border border-[#f8f8f8] p-2 text-white w-full object-cover"
            >
              <img src={token.image.url} alt="owner's nfts" />
              <div className=" mt-8 text-sm">Token id: {token.tokenId}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NftsInWallet;
