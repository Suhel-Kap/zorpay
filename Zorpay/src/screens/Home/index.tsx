import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../lib/constants';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {
  getChainId,
  getEoaAddress,
  setSmartAccount,
  getSmartAccountAddress as getSmartAccount,
  fetchUsdcBalance,
  getUsdcBalance,
} from '../../stores/user.reducer';
import {
  checkIfAccountExists,
  getSmartAccountAddress,
} from '../../utils/read.contract';
import {createSmartAccount} from '../../utils/write.contract';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [transactionHistory, setTransactionHistory] = useState([] as any[]);
  const eoaAddress = useAppSelector(getEoaAddress);
  const smartAccountAddress = useAppSelector(getSmartAccount);
  const usdcBalance = useAppSelector(getUsdcBalance);
  const chainId = useAppSelector(getChainId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('eoaAddress', chainId, eoaAddress);
    checkIfAccountExists(eoaAddress, chainId).then(res => {
      if (res === false) {
        createSmartAccount(eoaAddress, chainId).then(res => {
          getSmartAccountAddress(eoaAddress, chainId).then(res => {
            dispatch(setSmartAccount(res));
          });
        });
      } else {
        getSmartAccountAddress(eoaAddress, chainId).then(res => {
          dispatch(setSmartAccount(res));
        });
      }
      // dispatch(fetchUsdcBalance());
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(function () {
      if (smartAccountAddress) dispatch(fetchUsdcBalance());
      AsyncStorage.getItem('transactionHistory').then(res => {
        console.log('transactionHistory', res);
        setTransactionHistory(JSON.parse(res || '[]') as any[]);
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initialize the drawer at 45% height
    panY.setValue(height * 0.53);
  }, []);

  const translateY = panY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: height * 0.53,
    duration: 300,
    useNativeDriver: true,
  });

  const expandAnim = Animated.timing(panY, {
    toValue: height * 0.02,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < 0 || panY._value > height * 0.53) {
          panY.setValue(gestureState.dy + height * 0.53);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy < -150) {
          expandAnim.start();
        } else {
          resetPositionAnim.start();
        }
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.yourBalanceText}>Your Balance</Text>
        <Text style={styles.balance}>${usdcBalance}</Text>
        <View style={styles.items}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Split');
              }}
              style={styles.itemContainer}>
              <MaterialIcons
                name="safety-divider"
                size={30}
                color={COLORS.SECONDARY}
              />
            </TouchableOpacity>
            <Text style={styles.itemText}>Split</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Receive');
              }}
              style={styles.itemContainer}>
              <AntDesign name="arrowdown" size={30} color={COLORS.SECONDARY} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Receive</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Send');
              }}
              style={styles.itemContainer}>
              <Ionicons name="send" size={30} color={COLORS.SECONDARY} />
            </TouchableOpacity>
            <Text style={styles.itemText}>Send</Text>
          </View>
        </View>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.floatingDrawer,
          {
            transform: [{translateY: panY}],
          },
        ]}>
        <View style={styles.drawerHandle} />
        <Text style={styles.drawerTitle}>Recent Activity</Text>
        <View style={styles.transactionList}>
          {transactionHistory.map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionItemLeft}>
                <Feather
                  name="arrow-down-left"
                  size={27}
                  style={styles.transactionItemIcon}
                  color={COLORS.PRIMARY}
                />
                <View>
                  <Text style={styles.transactionItemTitle}>{item.type}</Text>
                  <Text style={styles.transactionItemDate}>
                    {new Date(item.time).toLocaleString()}
                  </Text>
                </View>
              </View>
              <Text style={styles.transactionItemAmount}>${item.amount}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
