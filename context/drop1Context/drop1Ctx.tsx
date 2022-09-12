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

  //GET OWNED NFTS
  const OWNED_NFTS = gql`
    query ($col: [String!], $add: [String!]) {
      tokens(
        where: { collectionAddresses: $col, ownerAddresses: $add }
        networks: { network: ETHEREUM, chain: MAINNET }
      ) {
        nodes {
          token {
            tokenId
            metadata
          }
        }
      }
    }
  `;
  const [result] = useQuery({
    query: OWNED_NFTS,
    variables: { col: fjordDrop1ContractAddress, add: address },
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
