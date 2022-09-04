import { fjordDrop1ContractAddress } from "../constants/contractAddresses";

export const getNFTsInWallet = `{
    tokens(where:{collectionAddresses: ${fjordDrop1ContractAddress}, ownerAddresses: "0xe31069e61802d37795e7dd4a816e827e00704cc4"}, networks:{
      network: ETHEREUM, chain:MAINNET
    }){
      nodes{
        token{
          tokenId
          owner
          image {
            url
            mimeType
            size
          }
        }
      }
    }
  }`;
