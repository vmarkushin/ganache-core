import * as Ethereum from "@ganache/ethereum";
import {
  EthereumDefaults,
  EthereumProviderOptions,
  EthereumLegacyProviderOptions
} from "@ganache/ethereum-options";

import { TruffleColors } from "@ganache/colors";
import chalk from "chalk";

// we need "@ganache/options" in order for TS to properly infer types for `DefaultOptionsByName`
import "@ganache/options";

const NEED_HELP = "Need help? Reach out to the Truffle community at";
const COMMUNITY_LINK = "https://trfl.co/support";

export const EthereumFlavorName = "ethereum";

export const DefaultFlavor = EthereumFlavorName;

export const DefaultOptionsByName = {
  [EthereumFlavorName]: EthereumDefaults,
};

export type ConnectorsByName = {
  [EthereumFlavorName]: Ethereum.Connector;
};

export type FlavorName = keyof ConnectorsByName;

export type Connector = {
  [K in keyof ConnectorsByName]: ConnectorsByName[K];
}[keyof ConnectorsByName];

export function GetConnector(
  flavor: FlavorName,
  providerOptions: any,
  executor
): Connector {
  switch (flavor) {
    case DefaultFlavor:
      // TODO: (Issue #889) Remove warning after `ganache` with `ethereum` is stable
      console.warn(
        chalk`\n\n{yellow.bold WARNING:} Using the "{bold ethereum}" flavor via the {bold ganache} package is currently not stable.\n` +
          chalk`Please use {bold ganache-cli} instead: {hex("${TruffleColors.turquoise}") https://npmjs.com/package/ganache-cli}.\n\n` +
          chalk`{hex("${TruffleColors.porsche}").bold ${NEED_HELP}}\n` +
          chalk`{hex("${TruffleColors.turquoise}") ${COMMUNITY_LINK}}\n\n`
      );
      return new Ethereum.Connector(providerOptions, executor);
  }
}

export type Providers = Ethereum.Provider;

type EthereumOptions = {
  flavor?: typeof EthereumFlavorName;
} & (EthereumProviderOptions | EthereumLegacyProviderOptions);

export type Options = EthereumOptions;
