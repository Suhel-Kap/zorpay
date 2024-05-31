import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from './screens/Splash';
import Login from './screens/Login';

const Root = ({magic}) => {
  const [intro, setIntro] = useState(true);

  return intro ? (
    <SplashScreen setIntro={setIntro} />
  ) : (
    <>
      <Login magic={magic} />
    </>
  );
};

export default Root;
