import { createContext, useContext, useMemo } from 'react';
//FJORD DROP1
import { fjordDrop1ContractAddress } from '../../constants/contractAddresses';
import { fjordDrop1MainnetAbi } from '../../contractABI/mainnetABIS';
//WAGMI
import { ethers } from 'ethers';
import { gql, useQuery } from 'urql';
import { useContractRead } from 'wagmi';
import { useAuth } from '../../hooks/useAuth';

interface Drop2ContextProps {
  totalMintedDrop2?: number;
  stage?: any;
  readTMinted: () => void;
  ownerNFTsResult: any;
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
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1MainnetAbi,
    functionName: 'totalSupply',
    watch: true,
    cacheTime: 5,
  });
  const { data: stage } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1MainnetAbi,
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
      col: fjordDrop1ContractAddress,
      add: address,
      limit: 24,
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
        stage,
        ownerNFTsResult: result,
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
