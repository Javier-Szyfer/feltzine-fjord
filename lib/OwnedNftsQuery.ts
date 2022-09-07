import { fjordDrop1ContractAddress } from "../constants/contractAddresses";

export const getNFTsInWallet = `{
    tokens(where:{collectionAddresses: "0x2EB42D1851018008028e78c5D0FA3c43b7D03FD4", ownerAddresses: "0x5e080D8b14c1DA5936509c2c9EF0168A19304202"}, networks:{
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
