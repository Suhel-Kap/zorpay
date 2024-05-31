import React from 'react';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './src/stores';
import {Provider} from 'react-redux';
import Root from './src';
import {ActivityIndicator} from 'react-native';
import {PrivyProvider} from '@privy-io/react-auth';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={'large'} />}
        persistor={persistor}>
        <PrivyProvider
          appId="clwusfl1x034jyctyn5s18gce"
          config={{
            /* Replace this with your desired login methods */
            loginMethods: ['email', 'wallet'],
            /* Replace this with your desired appearance configuration */
            appearance: {
              theme: 'light',
              accentColor: '#676FFF',
              logo: 'your-logo-url',
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets',
              noPromptOnSignature: true,
            },
          }}>
          <Root />
        </PrivyProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
