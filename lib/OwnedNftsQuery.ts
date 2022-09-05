import { fjordDrop1ContractAddress } from "../constants/contractAddresses";

export const getNFTsInWallet = `{
    tokens(where:{collectionAddresses: "0x32887799bA0d479fa9495c4f1dd28178b37068e5", ownerAddresses: "0x5e080D8b14c1DA5936509c2c9EF0168A19304202"}, networks:{
      network: ETHEREUM, chain:MAINNET
    }){
      nodes{
        token{
          tokenId
          owner
          image {
            url
          }
        }
      }
    }
  }`;
