import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultTheme, ChainProvider } from '@cosmos-kit/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';
import { Chain } from "@chain-registry/types";
import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";

import { TailwindModal } from '../components';
import { ThemeProvider } from '../contexts/theme';
import { SigningCosmWasmProvider } from '../contexts/cosmwasm';

import { SignerOptions } from '@cosmos-kit/core';
import { chains, assets } from 'chain-registry';
import { ToastContainer } from "react-toastify";
import { osmotestnet, osmotestnetAssets } from '../config/testosmosis';
import "react-toastify/dist/ReactToastify.css";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const signerOptions: SignerOptions = {
    signingStargate: (chain: Chain) => {
      switch (chain.chain_name) {
        case "osmosistestnet5":
          return {
            gasPrice: new GasPrice(Decimal.zero(1), "uosmo"),
          };
        default:
          return void 0;
      }
    },
  };

  return (
    <ChainProvider
      chains={[...chains, osmotestnet]}
      assetLists={[...assets, osmotestnetAssets]}
      wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
      walletConnectOptions={{
        signClient: {
          projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
          relayUrl: 'wss://relay.walletconnect.org',
          metadata: {
            name: 'CosmosKit Template',
            description: 'CosmosKit dapp template',
            url: 'https://docs.cosmoskit.com/',
            icons: [],
          },
        },
      }}
      endpointOptions={{
        isLazy: true,
        endpoints: {
          'osmosistestnet5': {
            rpc: ['https://rpc.osmotest5.osmosis.zone'],
            rest: ['https://lcd.osmotest5.osmosis.zone'],
          }
        }
      }}
      wrappedWithChakra={true}
      signerOptions={signerOptions}
      walletModal={TailwindModal}
    >
      <SigningCosmWasmProvider>
        <ThemeProvider>
          <div className="min-h-screen text-black bg-white dark:bg-gray-bg dark:text-white">
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
        <ToastContainer />
      </SigningCosmWasmProvider>
    </ChainProvider>
  );
}

export default CreateCosmosApp;
