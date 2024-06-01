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

const OP_BNB_TESTNET_RPC_URL = 'https://opbnb-testnet-rpc.bnbchain.org';
const LINEA_SEPOLIA_RPC_URL = 'https://rpc.sepolia.linea.build';
const NEON_EVM_DEVNET_RPC_URL = 'https://neon-evm-devnet.drpc.org';

const NETWORKS = {
  5611: {
    name: 'OP BNB Testnet',
    rpcUrl: OP_BNB_TESTNET_RPC_URL,
  },
  59141: {
    name: 'Linea Sepolia',
    rpcUrl: LINEA_SEPOLIA_RPC_URL,
  },
  245022926: {
    name: 'Neon EVM Devnet',
    rpcUrl: NEON_EVM_DEVNET_RPC_URL,
  },
};

const BACKEND_URL = 'https://zorpay.vercel.app/api';

export {
  BINANCE_TESTNET_RPC_URL,
  BINANCE_TESTNET_CHAIN_ID,
  MAGIC_API_KEY,
  magic,
  COLORS,
  NETWORKS,
  BACKEND_URL,
};
