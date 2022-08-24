import { MerkleTree } from "merkletreejs";
import { utils } from "ethers";

const tree = (addresses: string[]) =>
  new MerkleTree(addresses.map(utils.keccak256), utils.keccak256, {
    sortPairs: true,
  });

export function getMerkleRoot(addresses: string[]) {
  return "0x" + tree(addresses).getRoot().toString("hex");
}

export function getMerkleProof(addressToCheck: string, addresses: string[]) {
  const hashedAddress = utils.keccak256(addressToCheck);
  return tree(addresses).getHexProof(hashedAddress);
}
