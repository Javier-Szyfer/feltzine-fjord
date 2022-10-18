import { createContext, useContext, useMemo } from 'react';
//FJORD DROP1
import { hellHouseMainnetAddress } from '../../constants/contractAddresses';
import { hellHouseABI } from '../../contractABI/mainnetABIS';
//WAGMI
import { ethers } from 'ethers';
import { gql, useQuery } from 'urql';
import { useContractRead } from 'wagmi';
import { useAuth } from '../../hooks/useAuth';

interface Drop2ContextProps {
  totalMintedDrop2?: number;
  drop2Stage?: any;
  readTMinted: () => void;
  hellHouseNfts: any;
  reexecuteQuery: any;
}

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
}
const Drop2Context = createContext<Drop2ContextProps>({} as Drop2ContextProps);

export function Drop2Wrapper({ children }: props) {
  const { address } = useAuth();

  const { data: totalMintedDrop, refetch: readTMinted } = useContractRead({
    addressOrName: hellHouseMainnetAddress,
    contractInterface: hellHouseABI,
    functionName: 'totalSupply',
    watch: true,
    cacheTime: 5,
  });
  const { data: drop2Stage } = useContractRead({
    addressOrName: hellHouseMainnetAddress,
    contractInterface: hellHouseABI,
    functionName: 'stage',
    watch: true,
    cacheTime: 5,
  });

  //HANDLE TIME
  //FORMAT NUMBER
  const totalMintedDrop2 =
    totalMintedDrop && ethers.BigNumber.from(totalMintedDrop).toNumber();

  //GET OWNED NFTS QUERY
  const OWNED_NFTS = gql`
    query ($col: [String!], $add: [String!], $limit: Int!) {
      tokens(
        where: { collectionAddresses: $col, ownerAddresses: $add }
        networks: { network: ETHEREUM, chain: MAINNET }
        pagination: { limit: $limit }
      ) {
        nodes {
          token {
            tokenId
            metadata
            collectionAddress
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  const [result, reexecuteQuery] = useQuery({
    query: OWNED_NFTS,
    variables: {
      col: hellHouseMainnetAddress,
      add: '0x5e080D8b14c1DA5936509c2c9EF0168A19304202',
      limit: 100,
    },
    context: useMemo(
      () => ({
        requestPolicy: 'cache-and-network',
        headers: {
          'Content-Type': 'applicaton/json',
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
        url: 'https://api.zora.co/graphql',
      }),
      []
    ),
  });

  return (
    <Drop2Context.Provider
      value={{
        readTMinted,
        totalMintedDrop2,
        reexecuteQuery,
        drop2Stage,
        hellHouseNfts: result,
      }}
    >
      {children}
    </Drop2Context.Provider>
  );
}

export function useDrop2Context() {
  const context = useContext(Drop2Context);

  if (!context) {
    console.error('Error deploying Drop1Context!!!');
  }

  return context;
}

export default useDrop2Context;
