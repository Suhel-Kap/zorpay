import React, {useState} from 'react';
import SplashScreen from './screens/Splash';
import MainNavigation from './navigation';

const Root = () => {
  const [intro, setIntro] = useState(true);

  return intro ? <SplashScreen setIntro={setIntro} /> : <MainNavigation />;
};

export default Root;
