import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useAccount, useDisconnect} from 'wagmi';
import {useAppDispatch} from '../../hooks/storeHooks';
import {setLoggedIn} from '../../stores/user.reducer';
import {COLORS, magic} from '../../lib/constants';
import {ToastAndroid} from 'react-native';

const Header = ({name}: {name: string}) => {
  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const dispatch = useAppDispatch();

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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name !== 'Home' ? name : 'Zorpay'}</Text>
      <TouchableOpacity onPress={handleDisconnect}>
        <AntDesign size={20} name="logout" color={COLORS.SECONDARY_TEXT} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
