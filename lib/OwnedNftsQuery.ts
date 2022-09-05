import { fjordDrop1ContractAddress } from "../constants/contractAddresses";

export const getNFTsInWallet = `{
    tokens(where:{collectionAddresses: "0x5180db8F5c931aaE63c74266b211F580155ecac8", ownerAddresses: "0xe31069e61802d37795e7dd4a816e827e00704cc4"}, networks:{
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
