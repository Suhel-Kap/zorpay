import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAccount, useDisconnect} from 'wagmi';
import {useAppDispatch} from '../../hooks/storeHooks';
import {setIsMagic, setLoggedIn} from '../../stores/user.reducer';
import {COLORS, magic} from '../../lib/constants';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = ({name}: {name: string}) => {
  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name !== 'Home' ? name : 'Zorpay'}</Text>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <FontAwesome size={20} name="bars" color={COLORS.SECONDARY_TEXT} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
