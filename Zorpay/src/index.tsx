import React, {useState} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from './screens/Splash';
import Login from './screens/Login';

const Root = () => {
  const [intro, setIntro] = useState(true);

  return intro ? <SplashScreen setIntro={setIntro} /> : <Login />;
};

export default Root;
