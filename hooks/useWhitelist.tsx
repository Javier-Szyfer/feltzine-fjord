export const useWhitelist = (
  addressToCheck: string | undefined,
  wlAddresses: string[]
) => {
  if (addressToCheck) {
    const isWhitelisted = wlAddresses.includes(addressToCheck);
    return isWhitelisted;
  } else false;
};
