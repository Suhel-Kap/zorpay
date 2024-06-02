import React from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {useAccount, useDisconnect} from 'wagmi';
import {setIsMagic, setLoggedIn} from '../../stores/user.reducer';
import {styles} from './styles';
import {COLORS, magic} from '../../lib/constants';

const CustomDrawerContent = props => {
  const {disconnectAsync} = useDisconnect();
  const {isConnected} = useAccount();
  const dispatch = useDispatch();

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

  const handleChangeNetwork = network => {
    // Add logic to handle network change
    ToastAndroid.show(`Network changed to ${network}`, ToastAndroid.SHORT);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>Change Network</Text>
        <TouchableOpacity onPress={() => handleChangeNetwork('Network1')}>
          <Text style={styles.drawerItem}>Network 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeNetwork('Network2')}>
          <Text style={styles.drawerItem}>Network 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeNetwork('Network3')}>
          <Text style={styles.drawerItem}>Network 3</Text>
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
