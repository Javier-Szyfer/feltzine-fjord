import { createContext, useContext } from "react";
//FJORD DROP1
import { fjordDrop1ContractAddress } from "../../constants/contractAddresses";
import { fjordDrop1GoerliAbi } from "../../contractABI/goerliABIS";
//WAGMI
import { useContractRead } from "wagmi";

import { ethers } from "ethers";
import { format, fromUnixTime } from "date-fns";
import request, { RequestDocument } from "graphql-request";
import useSWR from "swr";
import { getNFTsInWallet } from "../../lib/OwnedNftsQuery";

interface Drop1ContextProps {
  totalMintedDrop1?: number;
  endWLDateInSecs: number;
  formattedWLEndDate: string;
  stage?: any;
  nftsInWallet?: any;
  readTMinted: () => void;
}

interface props {
  children: JSX.Element | JSX.Element[];
}
const Drop1Context = createContext<Drop1ContextProps>({} as Drop1ContextProps);

export function Drop1Wrapper({ children }: props) {
  const fetcher = (query: RequestDocument) =>
    request("https://api.zora.co/graphql", query);

  const { data: nftsInWallet } = useSWR(getNFTsInWallet, fetcher, {
    refreshInterval: 64000,
  });

  const { data: whitelistEndDate } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "whitelistEndDate",
  });
  const { data: totalMintedDrop, refetch: readTMinted } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "totalSupply",
    watch: true,
    cacheTime: 5,
  });
  const { data: stage } = useContractRead({
    addressOrName: fjordDrop1ContractAddress,
    contractInterface: fjordDrop1GoerliAbi,
    functionName: "stage",
    watch: true,
    cacheTime: 5,
  });
  //HADNLE TIME
  const whitelistEndDateToNumber = whitelistEndDate
    ? ethers.BigNumber.from(whitelistEndDate).toNumber()
    : 0;
  const endWLDate = fromUnixTime(whitelistEndDateToNumber);
  const endWLDateInSecs = endWLDate.getTime();
  const formattedWLEndDate = format(endWLDateInSecs, "MM-dd-yyyy");
  //FORMAT NUMBER
  const totalMintedDrop1 =
    totalMintedDrop && ethers.BigNumber.from(totalMintedDrop).toNumber();

  return (
    <Drop1Context.Provider
      value={{
        readTMinted,
        totalMintedDrop1,
        endWLDateInSecs,
        formattedWLEndDate,
        nftsInWallet,
        stage,
      }}
    >
      {children}
    </Drop1Context.Provider>
  );
}

export function useDrop1Context() {
  const context = useContext(Drop1Context);

  if (!context) {
    console.error("Error deploying Drop1Context!!!");
  }

  return context;
}

export default useDrop1Context;
