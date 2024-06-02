import React from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {useAccount, useDisconnect} from 'wagmi';
import {
  getChainId,
  getSmartAccountAddress,
  setChainId,
  setIsMagic,
  setLoggedIn,
} from '../../stores/user.reducer';
import {styles} from './styles';
import {COLORS, magic} from '../../lib/constants';
import {useAppSelector} from '../../hooks/storeHooks';
import {getUsdcFromFaucet} from '../../utils/write.contract';
import {ActivityIndicator} from 'react-native';

const CustomDrawerContent = props => {
  const [fetchingUsdc, setFetchingUsdc] = React.useState(false);

  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const dispatch = useDispatch();

  const chainId = useAppSelector(getChainId);
  const smartAccountAddress = useAppSelector(getSmartAccountAddress);

  const handleDisconnect = async () => {
    if (isConnected) {
      await disconnectAsync();
      ToastAndroid.show('Disconnected', ToastAndroid.SHORT);
      dispatch(setLoggedIn(false));
    } else {
      const isLoggedInMagic = await magic.user.isLoggedIn();
      if (isLoggedInMagic) {
        await magic.user.logout();
        ToastAndroid.show('Disconnected', ToastAndroid.SHORT);
        dispatch(setLoggedIn(false));
      }
    }
    dispatch(setIsMagic(false));
  };

  const handleReceiveUsdc = async () => {
    setFetchingUsdc(true);
    try {
      const res = await getUsdcFromFaucet(smartAccountAddress, chainId);
      if (res) {
        ToastAndroid.show('USDC received', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed to receive USDC', ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Failed to receive USDC', ToastAndroid.SHORT);
    }
    setFetchingUsdc(false);
  };

  const handleChangeNetwork = network => {
    dispatch(setChainId(network));
    ToastAndroid.show(`Network changed to ${network}`, ToastAndroid.SHORT);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>Change Network</Text>
        <TouchableOpacity onPress={() => handleChangeNetwork('5611')}>
          <Text
            style={[
              styles.drawerItem,
              {
                color:
                  chainId === '5611'
                    ? COLORS.PRIMARY_TEXT
                    : COLORS.SECONDARY_TEXT,
              },
            ]}>
            opBNB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeNetwork('59141')}>
          <Text
            style={[
              styles.drawerItem,
              {
                color:
                  chainId === '59141'
                    ? COLORS.PRIMARY_TEXT
                    : COLORS.SECONDARY_TEXT,
              },
            ]}>
            Linea Sepolia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeNetwork('245022926')}>
          <Text
            style={[
              styles.drawerItem,
              {
                color:
                  chainId === '245022926'
                    ? COLORS.PRIMARY_TEXT
                    : COLORS.SECONDARY_TEXT,
              },
            ]}>
            Neon Devnet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={fetchingUsdc}
          style={styles.logoutButton}
          onPress={handleReceiveUsdc}>
          {fetchingUsdc ? (
            <ActivityIndicator color={'white'} size="small" />
          ) : (
            <Text style={styles.logoutButtonText}>Get USDC Faucet</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleDisconnect}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
