/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="font-sans font-semibold tracking-tight text-shadowFirst text-[#ebebebef] hover:text-white"
                  >
                    CONNECT WALLET
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center font-sans font-semibold tracking-tight text-shadowFirst text-[#ebebebef] hover:text-white"
                  >
                    {account?.ensAvatar ? (
                      <img
                        src={account.ensAvatar}
                        alt="avatar"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "8px",
                        }}
                        className="rounded-full shadow-sm shadow-[#f9f9f9]/50"
                      />
                    ) : (
                      <span className="mr-2 w-6 h-6 bg-[#070606] flex  justify-center items-center rounded-full shadow-sm shadow-[#f9f9f9]/50">
                        👤
                      </span>
                    )}
                    {account?.ensName ? account.ensName : account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
