import React from 'react';
import {Text, View} from 'react-native';
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
  PaymasterMode,
} from '@biconomy/account';
import {ethers} from 'ethers';
import {Web3Auth} from '@web3auth/modal';
import {CHAIN_NAMESPACES} from '@web3auth/base';

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0x13882',
  rpcTarget: 'https://rpc-amoy.polygon.technology/',
  displayName: 'Polygon Amoy',
  blockExplorer: 'https://www.oklink.com/amoy/',
  ticker: 'MATIC',
  tickerName: 'Polygon Matic',
};

//Creating web3auth instance
const web3auth = new Web3Auth({
  clientId:
    'BExrkk4gXp86e9VCrpxpjQYvmojRSKHstPRczQA10UQM94S5FtsZcxx4Cg5zk58F7W1cAGNVx1-NPJCTFIzqdbs', // Get your Client ID from the Web3Auth Dashboard https://dashboard.web3auth.io/
  web3AuthNetwork: 'sapphire_devnet', // Web3Auth Network
  chainConfig,
  // You can visit web3auth.io/docs for more configuration options
  uiConfig: {
    appName: 'Biconomy X Web3Auth',
    mode: 'dark', // light, dark or auto
    loginMethodsOrder: ['apple', 'google', 'twitter'],
    logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
    logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
    defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
    loginGridCol: 3,
    primaryButton: 'socialLogin', // "externalLogin" | "socialLogin" | "emailLogin"
  },
});

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
