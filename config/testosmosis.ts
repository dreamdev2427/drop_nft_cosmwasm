/**
 * remark: This is an example config file for a terra testnet chain and it should be deleted before merging.
 */
import type { Chain, AssetList } from "@chain-registry/types";

export const osmotestnet: Chain = {
  $schema: "../../chain.schema.json",
  chain_name: "osmosistestnet5",
  status: "live",
  network_type: "testnet",
  pretty_name: "Osmosis Testnet",
  chain_id: "osmo-test-5",
  bech32_prefix: "osmo",
  daemon_name: "osmosisd",
  node_home: "$HOME/.terrad",
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "uosmo",
        fixed_min_gas_price: 0,
        low_gas_price: 0.15,
        average_gas_price: 0.15,
        high_gas_price: 0.15,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "uosmo",
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: "https://rpc.osmotest5.osmosis.zone",
      },
    ],
    rest: [
      {
        address: "https://lcd.osmotest5.osmosis.zone",
      },
    ],
    grpc: [
      {
        address: "https://grpc.osmotest5.osmosis.zone",
      },
    ],
  },
  keywords: ["dex", "testnet"],
};

export const osmotestnetAssets: AssetList = {
  $schema: "../../assetlist.schema.json",
  chain_name: "osmosistestnet5",
  assets: [
    {
      description: "The native token of Osmosis",
      denom_units: [
        {
          denom: "uosmo",
          exponent: 0,
          aliases: [],
        },
      ],
      base: "uosmo",
      name: "Osmo",
      display: "OSMO",
      symbol: "OSMO",
      keywords: ["staking"],
    },
  ],
};
