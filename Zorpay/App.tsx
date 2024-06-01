import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import '@walletconnect/react-native-compat';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './src/stores';
import {Provider} from 'react-redux';
import Root from './src';
import {ActivityIndicator} from 'react-native';
import {magic} from './src/lib/constants';
import {chains, wagmiConfig, PROJECT_ID} from './src/lib/wagmiConfig';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Web3Modal, createWeb3Modal} from '@web3modal/wagmi-react-native';
import {WagmiConfig} from 'wagmi';
import {SignerProvider} from './src/context/signerContext';

createWeb3Modal({
  projectId: PROJECT_ID,
  chains,
  wagmiConfig,
});

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator size={'large'} />}
          persistor={persistor}>
          <WagmiConfig config={wagmiConfig}>
            <SignerProvider>
              <Web3Modal />
              <magic.Relayer />
              <Root />
            </SignerProvider>
          </WagmiConfig>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
