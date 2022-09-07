import { useAccount } from "wagmi";
import { fjordDrop1ContractAddress } from "../constants/contractAddresses";
export function getNFTsInWallet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address } = useAccount();
  return `{
    tokens(where:{collectionAddresses: ${fjordDrop1ContractAddress}, ownerAddresses: "0x5e080D8b14c1DA5936509c2c9EF0168A19304202"}, networks:{
      network: ETHEREUM, chain:MAINNET
    }){
      nodes{
        token{
          tokenId
          metadata
          owner
          image {
            url
          }
        }
      }
    }
  }`;
}
