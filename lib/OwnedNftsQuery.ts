export const getNFTsInWallet = `
  {
    tokens(
      where: {
        collectionAddresses: "0xB775206E01FE2D60De85DF9F18Dd810998bFf6D7"
        ownerAddresses: "0x5e080D8b14c1DA5936509c2c9EF0168A19304202"
      }
      networks: { network: ETHEREUM, chain: MAINNET }
    ) {
      nodes {
        token {
          tokenId
          metadata
          owner
          image {
            url
          }
        }
      }
    }
  }
`;
