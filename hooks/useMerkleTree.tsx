import { getMerkleProof, getMerkleRoot } from '../utils/merkle/merkle';

export const useMerkleTree = (
  addressToCheck: string | undefined,
  wlAddresses: string[]
) => {
  if (addressToCheck) {
    const root = getMerkleRoot(wlAddresses);
    const proof = getMerkleProof(addressToCheck, wlAddresses);
    return { root, proof };
  } else null;
};
