import { createContext, useContext, useMemo } from 'react';
//FJORD DROP1
import { fjordDrop1ContractAddress } from '../../constants/contractAddresses';
import { fjordDrop1MainnetAbi } from '../../contractABI/mainnetABIS';
//WAGMI
import { format, fromUnixTime } from 'date-fns';
import { ethers } from 'ethers';
import { gql, useQuery } from 'urql';
import { useContractRead } from 'wagmi';
import { useAuth } from '../../hooks/useAuth';

interface Drop1ContextProps {
  totalMintedDrop1?: number;
  endWLDateInSecs: number;
  formattedWLEndDate: string;
  stage?: any;
  readTMinted: () => void;
  ownerNFTsResult: any;
  reexecuteQuery: any;
}

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
}
const Drop1Context = createContext<Drop1ContextProps>({} as Drop1ContextProps);

export function Drop1Wrapper({ children }: props) {
  const { address } = useAuth();

  const { data: whitelistEndDate } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1MainnetAbi,
    functionName: 'whitelistEndDate',
  });
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
  const whitelistEndDateToNumber = whitelistEndDate
    ? ethers.BigNumber.from(whitelistEndDate).toNumber()
    : 0;
  const endWLDate = fromUnixTime(whitelistEndDateToNumber);
  const endWLDateInSecs = endWLDate.getTime();
  const formattedWLEndDate = format(endWLDateInSecs, 'MM-dd-yyyy');

  //FORMAT NUMBER
  const totalMintedDrop1 =
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
      add: '0x5e080d8b14c1da5936509c2c9ef0168a19304202',
      limit: 20,
    },
    context: useMemo(
      () => ({
        requestPolicy: 'cache-and-network',
        url: 'https://api.zora.co/graphql',
      }),
      []
    ),
  });

  return (
    <Drop1Context.Provider
      value={{
        readTMinted,
        totalMintedDrop1,
        endWLDateInSecs,
        formattedWLEndDate,
        reexecuteQuery,
        stage,
        ownerNFTsResult: result,
      }}
    >
      {children}
    </Drop1Context.Provider>
  );
}

export function useDrop1Context() {
  const context = useContext(Drop1Context);

  if (!context) {
    console.error('Error deploying Drop1Context!!!');
  }

  return context;
}

export default useDrop1Context;
