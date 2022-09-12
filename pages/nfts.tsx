import { useConnectModal } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/common/Header';
import News from '../components/common/News';
import useDrop1Context from '../context/drop1Context/drop1Ctx';
import { useAuth } from '../hooks/useAuth';

const NftsInWallet = () => {
  const { address } = useAuth();
  const { ownerNFTsResult } = useDrop1Context();
  const { data, fetching, error } = ownerNFTsResult;

  const { openConnectModal } = useConnectModal();

  if (!address) {
    return (
      <div className=" relative flex flex-col min-h-screen text-shadowTitle  items-center">
        <div className="noise"></div>
        <Header />
        <div className="max-w-4xl mx-auto">
          <News size="2xl" />
        </div>

        <div className="relative flex flex-col justify-center min-h-[90vh]">
          <button
            onClick={() => {
              openConnectModal?.();
            }}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="flex flex-col min-h-screen text-shadowTitle  items-center">
        <div className="noise"></div>
        <Header />

        <div className="flex flex-col justify-center min-h-[90vh]">
          Fetching your NFTs ...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen text-shadowTitle  items-center px-8">
        <div className="noise"></div>
        <Header />
        <div className="max-w-4xl mx-auto">
          <News size="2xl" />
        </div>

        <div className="flex flex-col justify-center min-h-[90vh]">
          Error fetching your NFTs ...
        </div>
      </div>
    );
  }
  return (
    <div className=" max-w-7xl mx-auto px-4">
      <Head>
        <title>FeltZine - Fjord</title>
        <meta name="description" content="Lost echoes - NFTs owned" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise"></div>
      <Header />
      <div className="max-w-4xl mx-auto">
        <News size="2xl" />
      </div>
      {data && (
        <div className="mt-8 text-shadowTitle pb-12">
          <div className=" relative flex items-center justify-between">
            <span>Your NFTs</span>
            <Link href="/drops">&larr;BACK</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  mt-8">
            {ownerNFTsResult?.data?.tokens.nodes.map((t: any) => {
              const token = t.token;
              const animationURL = token.metadata?.animation_url
                .split('/')
                .pop();
              const formatedAnimationURL = `https://ipfs.io/ipfs/${animationURL}`;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: 'easeOut', duration: 1 }}
                  whileHover={{ scale: 1.02 }}
                  key={token.metadata?.animation_url}
                  className="relative aspect-square shadow-lg shadow-[#f8f8f8]/20 flex flex-col justify-start items-center  border border-[#8b8b8b] p-2 text-[#00eeff] object-cover w-full"
                >
                  <video
                    src={formatedAnimationURL}
                    autoPlay
                    preload="metadata"
                    loop
                    playsInline={token.metadata?.animation_url ? true : false}
                    // poster={formatedImage}
                    className="w-full h-full object-cover"
                  />
                  <div className=" text-sm flex w-full justify-between items-between gap-1 pt-4">
                    <span>Lost Echoes</span>
                    <span>Token id: {token.tokenId}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
      {data?.tokens.nodes.length === 0 && (
        <div className="flex flex-col min-h-[50vh] justify-center items-center gap-6  ">
          <h1 className="text-shadowTitle text-lg">
            You don&apos;t own Lost Echoes NFTs
          </h1>
        </div>
      )}
    </div>
  );
};

export default NftsInWallet;
