import { useState, useEffect, createContext, useContext } from 'react'
import { SigningCosmWasmClient, CosmWasmClient, JsonObject, MsgExecuteContractEncodeObject } from '@cosmjs/cosmwasm-stargate'
import { useChain, useWalletClient } from '@cosmos-kit/react';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import { isDeliverTxFailure } from '@cosmjs/stargate'
import { toUtf8, toBase64 } from '@cosmjs/encoding';
import { config, chainName, defaultDenom } from '../config';
import { convertMicroDenomToDenom } from '../utils/utils';

const defaultFee = {
  amount: [],
  gas: '1000000',
}

const CW20_DECIMAL = 10 ** 6;
const CosmwasmContext = createContext({});
export const useSigningClient = () => useContext(CosmwasmContext);

export const SigningCosmWasmProvider = ({ children }: any) => {
  const [pending, setPending] = useState(false);
  const [balances, setBalances] = useState({});

  const {
    getSigningCosmWasmClient,
    address,
    status,
    wallet,
    connect,
    disconnect,
    username,
    getRpcEndpoint,
  } = useChain(chainName);
  const { client } = useWalletClient();

  const connectWallet = async () => {
    if (address) {
      const signingClient = await getSigningCosmWasmClient();
      let rpcEndpoint = '' //await getRpcEndpoint();

      if (!rpcEndpoint) {
        console.info("no rpc endpoint — using a fallback");
        rpcEndpoint = `https://rpc.osmosis.zone`;
      }

      try {
        if (address) {
          const balanceList = {};
          const native: JsonObject = await signingClient?.getBalance(address, defaultDenom);

          if (native) {
            balanceList[native.denom] = convertMicroDenomToDenom(native.amount)
          }
          if (signingClient) {
            const resp = await signingClient.queryContractSmart(config.CW20_CONTRACT, {
              balance: { address },
            });
            balanceList['shirt'] = convertMicroDenomToDenom(resp.balance);
          }
          console.log('>>>>', balanceList)
          setBalances(balanceList);
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      // await connect();
    }
  }

  const burnToken = async (sender, amount) => {
    const signingClient = await getSigningCosmWasmClient();
    if (!signingClient) return null;
    setPending(true);
    try {
      const result: any = await signingClient.execute(
        sender,
        config.CW20_CONTRACT,
        {
          burn: {
            amount,
          },
        },
        defaultFee
      );
      console.log(result?.transactionHash)
      setPending(false);
      return result?.transactionHash;
    } catch (err) {
      setPending(false);
      throw err;
    }
  }

  useEffect(() => {
    connectWallet();
  }, [address])

  return (
    <CosmwasmContext.Provider
      value={{
        pending,
        address,
        balances,
        connectWallet,
        burnToken
      }}>
      {children}
    </CosmwasmContext.Provider>
  )
}