import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useAppDispatch} from '../../hooks/storeHooks';
import {setChainId, setSmartAccount} from '../../stores/user.reducer';
import {ethers} from 'ethers';

const SplashScreen = ({setIntro}: {setIntro: (state: boolean) => void}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setChainId('5611'));
      dispatch(
        setSmartAccount({
          '5611': ethers.constants.AddressZero,
          '245022926': ethers.constants.AddressZero,
          '59141': ethers.constants.AddressZero,
        }),
      );
      setIntro(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zorpay</Text>
    </View>
  );
};

export default SplashScreen;
