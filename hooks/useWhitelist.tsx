export const useWhitelist = (
  addressToCheck: string | undefined,
  wlAddresses: string[]
) => {
  //check if address is in whitelist no matter if is lower or uppercase
  const isWhitelisted = wlAddresses.some((address) => {
    return address.toLowerCase() === addressToCheck?.toLowerCase();
  });
  return isWhitelisted;
};
