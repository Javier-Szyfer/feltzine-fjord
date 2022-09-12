import type { AppProps } from 'next/app';
//Context
import { SoundWrapper } from '../context/soundContext/soundCtx';
import { Drop1Wrapper } from '../context/drop1Context/drop1Ctx';
import { Drop2Wrapper } from '../context/drop2Context/drop2Ctx';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
  Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import SEO from '../next-seo.config';
import { createClient as urqlClient, Provider } from 'urql';
import { DefaultSeo } from 'next-seo';

const client = urqlClient({
  url: 'https://api.zora.co/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { chains, provider } = configureChains(
    [chain.mainnet],
    [infuraProvider({ apiKey: process.env.INFURA_API_KEY }), publicProvider()]
  );
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [wallet.metaMask({ chains }), wallet.rainbow({ chains })],
    },
    {
      groupName: 'Custom',
      wallets: [
        wallet.walletConnect({ chains }),
        wallet.coinbase({ appName: 'FeltZine x Fjord', chains }),
        wallet.argent({ chains }),
        wallet.ledger({ chains }),
        wallet.brave({ chains }),
      ],
    },
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors,
  });

  if (!mounted) return null;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={fjordTheme}>
        <AnimatePresence exitBeforeEnter>
          <SoundWrapper>
            <Provider value={client}>
              <Drop1Wrapper>
                <Drop2Wrapper>
                  <DefaultSeo {...SEO} />
                  <Component {...pageProps} />
                </Drop2Wrapper>
              </Drop1Wrapper>
            </Provider>
          </SoundWrapper>
        </AnimatePresence>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

const fjordTheme: Theme = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    accentColor: '#707070',
    accentColorForeground: '#f8f8f8',
    actionButtonBorder: '#555555',
    actionButtonBorderMobile: '#c6c6c6',
    actionButtonSecondaryBackground: '...',
    closeButton: '#555555',
    closeButtonBackground: '#30303098',
    connectButtonBackground: '#202020',
    connectButtonBackgroundError: 'ff0000',
    connectButtonInnerBackground: '#303030',
    connectButtonText: '#f2f2f2',
    connectButtonTextError: '#ff0000',
    connectionIndicator: '#00ff00',
    error: '#ff0000',
    generalBorder: '#303030',
    generalBorderDim: '#101010',
    menuItemBackground: '#303030',
    modalBackdrop: '#10101030',
    modalBackground: '#101010',
    modalBorder: '#f2f2f2',
    modalText: '#f2f2f2',
    modalTextDim: '#ffffff',
    modalTextSecondary: '#f8f8f8',
    profileAction: '#181818',
    profileActionHover: '#40404050',
    profileForeground: '#10101098',
    selectedOptionBorder: '#c6c6c6',
    standby: '0000ff',
  },
  fonts: {
    body: 'Public Sans, sans-serif',
  },
  radii: {
    actionButton: 'none',
    connectButton: 'none',
    menuButton: 'none',
    modal: 'none',
    modalMobile: 'small',
  },
  shadows: {
    connectButton: 'small',
    dialog: 'small',
    profileDetailsAction: 'small',
    selectedOption: 'small',
    selectedWallet: 'small',
    walletLogo: 'small',
  },
};
