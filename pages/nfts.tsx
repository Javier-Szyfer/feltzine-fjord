import { useConnectModal } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSound from 'use-sound';
import Header from '../components/common/Header';
import News from '../components/common/News';
import { hellHouseMainnetAddress } from '../constants/contractAddresses';
import useDrop2Context from '../context/drop2Context/drop2Ctx';
import { useAuth } from '../hooks/useAuth';

const NftsInWallet = () => {
  const router = useRouter();
  const { address } = useAuth();
  // const { ownerNFTsResult } = useDrop1Context();
  const { hellHouseNfts } = useDrop2Context();
  // const { data, fetching, error } = ownerNFTsResult;
  const { data: hhData, fetching: hhFetching, error: hhError } = hellHouseNfts;
  const { openConnectModal } = useConnectModal();
  // const [allCollections, setAllCollections] = useState([]);
  const FeltZineUrl = 'https://feltzine.art/';
  const [back] = useSound(
    'https://res.cloudinary.com/aldi/video/upload/v1661351389/feltzine/back_o59yfu.mp3',
    { volume: 0.2 }
  );

  // useEffect(() => {
  //   let collections = [];
  //   if (data || hhData) {
  //     collections = data?.tokens.nodes.concat(hhData?.tokens.nodes);
  //     setAllCollections(collections?.reverse());
  //   }
  // }, [data, hhData]);

  if (!address) {
    return (
      <div className=" max-w-7xl mx-auto px-4">
        <Header />
        <div className="noise"></div>
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

  if (hhFetching) {
    return (
      <div className=" max-w-7xl mx-auto px-4">
        <div className="noise"></div>
        <Header />

        <div className="flex flex-col justify-center min-h-[90vh]">
          Fetching your NFTs ...
        </div>
      </div>
    );
  }

  if (hhError) {
    return (
      <div className=" max-w-7xl mx-auto px-4">
        <div className="noise"></div>
        <Header />
        <div className="max-w-4xl mx-auto">
          <News size="2xl" />
        </div>

        <div className="flex flex-col items-center text-center justify-center min-h-[80vh]">
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
      {hhData && (
        <div className="mt-8 text-shadowTitle pb-12">
          <div className=" relative flex items-center justify-between">
            <span>Your NFTs</span>
            <button
              onClick={() => {
                back(), router.back();
              }}
            >
              &larr;BACK
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  mt-8">
            {hhData?.tokens?.nodes.map((t: any) => {
              const token = t.token;
              // const animationURL = token.metadata?.animation_url
              //   ?.split('/')
              //   .pop();
              const imageURL = token.metadata?.image?.split('/').pop();
              // const formatedAnimationURL = `https://ipfs.io/ipfs/${animationURL}`;
              const formatedImageURL = `https://ipfs.io/ipfs/${imageURL}`;
              // const isLostEchoes =
              //   token?.collectionAddress.toLowerCase() ==
              //   fjordDrop1ContractAddress.toLowerCase();
              const isHellHouse =
                token?.collectionAddress.toLowerCase() ==
                hellHouseMainnetAddress.toLowerCase();
              return (
                <a
                  key={token.tokenId}
                  target="_blank"
                  rel="noreferrer"
                  // {...(isLostEchoes && {
                  //   href: `${
                  //     FeltZineUrl +
                  //     fjordDrop1ContractAddress +
                  //     '/' +
                  //     token.tokenId
                  //   }`,
                  // })}
                  {...(isHellHouse && {
                    href: `${
                      FeltZineUrl +
                      hellHouseMainnetAddress +
                      '/' +
                      token.tokenId
                    }`,
                  })}
                  //  { href: '' })}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square shadow-lg shadow-[#f8f8f8]/20 flex flex-col justify-start items-center  border border-[#8b8b8b] p-2 text-[#00eeff] object-cover w-full"
                  >
                    {/* {token.metadata?.animation_url ? (
                      <video
                        src={formatedAnimationURL}
                        autoPlay
                        preload="metadata"
                        loop
                        muted
                        playsInline={
                          token.metadata?.animation_url ? true : false
                        }
                        // poster={formatedImage}
                        className="w-full h-full object-cover"
                      />
                    ) : ( */}
                    <div className="w-full">
                      <Image
                        src={formatedImageURL}
                        layout="responsive"
                        width={100}
                        height={100}
                        alt="nft"
                        objectFit="cover"
                      />
                    </div>

                    <div className=" text-sm flex w-full justify-between items-between gap-1 pt-4">
                      {/* {token.collectionAddress.toLowerCase() ==
                        fjordDrop1ContractAddress.toLowerCase() && (
                        <span>Lost Echoes </span>
                      )} */}
                      {token.collectionAddress.toLowerCase() ==
                        hellHouseMainnetAddress.toLowerCase() && (
                        <span>Hell House </span>
                      )}
                      <span>Token id: {token.tokenId}</span>
                    </div>
                  </motion.div>
                </a>
              );
            })}
          </div>
        </div>
      )}
      {hhData?.tokens.nodes.length === 0 && (
        <div className="flex flex-col min-h-[50vh] justify-center items-center gap-6  ">
          <h1 className="text-shadowTitle text-lg">
            You don&apos;t own any NFTs yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default NftsInWallet;
