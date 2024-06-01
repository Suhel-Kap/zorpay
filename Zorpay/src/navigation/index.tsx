import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {useAppSelector} from '../hooks/storeHooks';
import {getLoggedIn} from '../stores/user.reducer';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Send from '../screens/Send';
import Receive from '../screens/Receive';
import Header from '../components/Header';
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);
  console.log('isLoggedIn', isLoggedIn);

  return !isLoggedIn ? (
    <Login />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            header: () => <Header />,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Send"
          component={Send}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Receive"
          component={Receive}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
