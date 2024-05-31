import React from 'react';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './src/stores';
import {Provider} from 'react-redux';
import Root from './src';
import {ActivityIndicator} from 'react-native';
import {MAGIC_API_KEY} from './src/lib/constants';
import {Magic} from '@magic-sdk/react-native-bare';
import {OAuthExtension} from '@magic-ext/react-native-bare-oauth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const magic = new Magic(MAGIC_API_KEY, {
    extensions: [new OAuthExtension()],
  });

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator size={'large'} />}
          persistor={persistor}>
          <magic.Relayer />
          <Root magic={magic} />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
