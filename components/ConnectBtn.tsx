import { ConnectButton } from "@rainbow-me/rainbowkit";
export const ConnectBtn = () => {
  return (
    <ConnectButton
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
      label="CONNECT WALLET"
      showBalance={false}
    />
  );
};
