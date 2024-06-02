import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useAppSelector} from '../hooks/storeHooks';
import {getLoggedIn} from '../stores/user.reducer';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Send from '../screens/Send';
import Receive from '../screens/Receive';
import Header from '../components/Header';
import Split from '../screens/Split';
import TransactionConfirm from '../screens/TransactionConfirm';
import SplitRequests from '../screens/SplitRequests';
import CustomDrawerContent from '../components/CustomDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          header: props => <Header name={props.route.name} />,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          header: props => <Header name={props.route.name} />,
        }}
        name="Send"
        component={Send}
      />
      <Stack.Screen
        options={{
          header: props => <Header name={props.route.name} />,
        }}
        name="Receive"
        component={Receive}
      />
      <Stack.Screen
        options={{
          header: props => <Header name={props.route.name} />,
        }}
        name="Split"
        component={Split}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TransactionConfirm"
        component={TransactionConfirm}
      />
      <Stack.Screen
        options={{
          header: props => <Header name={'Split Requests'} />,
        }}
        name="SplitRequests"
        component={SplitRequests}
      />
    </Stack.Navigator>
  );
};

const MainNavigation = () => {
  const isLoggedIn = useAppSelector(getLoggedIn);

  return !isLoggedIn ? (
    <Login />
  ) : (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
        }}
        drawerContent={() => <CustomDrawerContent />}
        initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
