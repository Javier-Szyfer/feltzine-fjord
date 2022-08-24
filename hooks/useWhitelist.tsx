import { getMerkleProof, getMerkleRoot } from "../utils/merkle/merkle";

export const useWhitelist = (
  addressToCheck: string | undefined,
  wlAddresses: string[]
) => {
  if (addressToCheck) {
    const root = getMerkleRoot(wlAddresses);
    const proof = getMerkleProof(addressToCheck, wlAddresses);
    const isIncluded = wlAddresses.includes(addressToCheck);
    return { isIncluded, root, proof };
  } else false;
};
