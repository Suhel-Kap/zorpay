import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLORS, magic} from '../../lib/constants';
import {setIsMagic, setLoggedIn} from '../../stores/user.reducer';
import {useAppDispatch} from '../../hooks/storeHooks';
import {styles} from './styles';
import {useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi-react-native';
import {useAccount} from 'wagmi';
import {ActivityIndicator} from 'react-native';

const Login = () => {
  const dispatch = useAppDispatch();
  const {open} = useWeb3Modal();
  const {open: modalOpen} = useWeb3ModalState();
  const {isConnected, isConnecting} = useAccount();
  const [isMagicConnecting, setIsMagicConnecting] = React.useState(false);

  const login = async () => {
    setIsMagicConnecting(true);
    try {
      const res = await magic.oauth.loginWithPopup({
        provider: 'google',
        redirectURI: 'zorpay://',
      });
      console.log(res);
      const isLoggedIn = await magic.user.isLoggedIn();
      console.log(isLoggedIn);
      if (isLoggedIn) {
        dispatch(setLoggedIn(true));
        dispatch(setIsMagic(true));
      }
    } catch (e) {
      console.log(e);
    }
    setIsMagicConnecting(false);
  };

  useEffect(() => {
    if (isConnected) {
      dispatch(setLoggedIn(true));
      dispatch(setIsMagic(false));
    }
  }, [isConnected, isConnecting]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Zorpay!</Text>
      <TouchableOpacity
        disabled={isConnected}
        style={styles.loginButton}
        onPress={login}>
        {isMagicConnecting ? (
          <ActivityIndicator size="small" color={COLORS.PRIMARY_TEXT} />
        ) : (
          <>
            <AntDesign name="google" size={24} color={COLORS.PRIMARY_TEXT} />
            <Text style={styles.loginButtonText}>Login with Google</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isMagicConnecting}
        style={styles.loginButton}
        onPress={open}>
        {isConnecting && modalOpen ? (
          <ActivityIndicator size="small" color={COLORS.PRIMARY_TEXT} />
        ) : (
          <>
            <FontAwesome5 name="wallet" size={24} color={COLORS.PRIMARY_TEXT} />
            <Text style={styles.loginButtonText}>Login with Wallet</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
