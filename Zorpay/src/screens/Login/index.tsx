import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Wallet, providers, ethers} from 'ethers';
import {BINANCE_TESTNET_RPC_URL} from '../../lib/constants';

const Login = ({magic}) => {
  const login = async () => {
    const res = await magic.oauth.loginWithPopup({
      provider: 'google',
      redirectURI: 'zorpay://',
    });
    console.log(res);
  };

  return (
    <View>
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
