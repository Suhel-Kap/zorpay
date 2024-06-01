import React, {useRef, useEffect} from 'react';
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

const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
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
        <Text style={styles.balance}>$100.00</Text>
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
          {[1, 2, 3].map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionItemLeft}>
                <Feather
                  name="arrow-down-left"
                  size={27}
                  style={styles.transactionItemIcon}
                  color={COLORS.PRIMARY}
                />
                <View>
                  <Text style={styles.transactionItemTitle}>Payment</Text>
                  <Text style={styles.transactionItemDate}>12:00 PM</Text>
                </View>
              </View>
              <Text style={styles.transactionItemAmount}>$10.00</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
