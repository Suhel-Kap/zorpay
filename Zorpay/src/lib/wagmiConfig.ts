import {polygon} from 'viem/chains';
import {defaultWagmiConfig} from '@web3modal/wagmi-react-native';

const metadata = {
  name: 'Zorpay',
  description: 'Simplified stablecoin payments',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'zorpay://',
  },
};
export const chains = [polygon];
export const PROJECT_ID = 'aa06f8fd09d533632183c7be103f767b';
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
});
