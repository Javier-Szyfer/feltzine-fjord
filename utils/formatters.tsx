export const formatHash = (hash: string) => {
  const chars = hash.split('');

  return `(${chars.slice(0, 12).join('')}…${chars.slice(-12).join('')})`;
};
