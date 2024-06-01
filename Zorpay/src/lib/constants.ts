import {OAuthExtension} from '@magic-ext/react-native-bare-oauth';
import {Magic} from '@magic-sdk/react-native-bare';

const BINANCE_TESTNET_RPC_URL =
  'https://bsc-testnet.blockpi.network/v1/rpc/public';
const BINANCE_TESTNET_CHAIN_ID = 97;
const MAGIC_API_KEY = 'pk_live_F8282379D88569D5';

const magic = new Magic(MAGIC_API_KEY, {
  extensions: [new OAuthExtension()],
});

const COLORS = {
  PRIMARY: '#13915F',
  SECONDARY: '#ecf6ed',
  PRIMARY_TEXT: '#144b44',
  SECONDARY_TEXT: '#AAAAAA',
};

export {
  BINANCE_TESTNET_RPC_URL,
  BINANCE_TESTNET_CHAIN_ID,
  MAGIC_API_KEY,
  magic,
  COLORS,
};
