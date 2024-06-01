import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

const SplashScreen = ({setIntro}: {setIntro: (state: boolean) => void}) => {
  useEffect(() => {
    setTimeout(() => {
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
