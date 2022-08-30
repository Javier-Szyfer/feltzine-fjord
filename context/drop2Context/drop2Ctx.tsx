import { createContext, useContext } from "react";
//FJORD DROP1
import { fjordDrop2ContractAddress } from "../../constants/contractAddresses";
import { fjordDrop2GoerliAbi } from "../../contractABI/goerliABIS";
//WAGMI
import { useContractRead } from "wagmi";

import { ethers } from "ethers";
import { format, fromUnixTime } from "date-fns";

interface Drop1ContextProps {
  totalMintedDrop2?: number;
  endWL2DateInSecs: number;
  formattedWL2EndDate: string;
}
interface props {
  children: JSX.Element | JSX.Element[];
}
const Drop1Context = createContext<Drop1ContextProps>({} as Drop1ContextProps);

export function Drop2Wrapper({ children }: props) {
  const { data: whitelistEndDate } = useContractRead({
    addressOrName: fjordDrop2ContractAddress,
    contractInterface: fjordDrop2GoerliAbi,
    functionName: "whitelistEndDate",
  });
  const { data: totalMintedDrop } = useContractRead({
    addressOrName: fjordDrop2ContractAddress,
    contractInterface: fjordDrop2GoerliAbi,
    functionName: "totalSupply",
    watch: true,
  });
  //HADNLE TIME
  const whitelistEndDateToNumber = whitelistEndDate
    ? ethers.BigNumber.from(whitelistEndDate).toNumber()
    : 0;
  const endWLDate = fromUnixTime(whitelistEndDateToNumber);
  const endWL2DateInSecs = endWLDate.getTime();
  const formattedWL2EndDate = format(endWL2DateInSecs, "MM-dd-yyyy");
  //FORMAT NUMBER
  const totalMintedDrop2 =
    totalMintedDrop && ethers.BigNumber.from(totalMintedDrop).toNumber();
  return (
    <Drop1Context.Provider
      value={{
        totalMintedDrop2,
        endWL2DateInSecs,
        formattedWL2EndDate,
      }}
    >
      {children}
    </Drop1Context.Provider>
  );
}

export function useDrop2Context() {
  const context = useContext(Drop1Context);

  if (!context) {
    console.error("Error deploying Drop1Context!!!");
  }

  return context;
}

export default useDrop2Context;
