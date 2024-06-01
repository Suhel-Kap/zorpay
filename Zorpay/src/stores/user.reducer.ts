import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {SupportedChainIds} from '../utils/read.contract';
import {ethers} from 'ethers';
import {NETWORKS} from '../lib/constants';
import {MyUSD__factory} from '../utils/types';
import CONTRACT_ADDRESSES from '../utils/contractAddresses/contract-address.json';

// const of type AllIndexesResponse, appended with a boolean for loading state
const initialState = {
  eoaAddress: '',
  smartAccount: {
    '5611': ethers.constants.AddressZero,
    '245022926': ethers.constants.AddressZero,
    '59141': ethers.constants.AddressZero,
  } as {
    [key in SupportedChainIds]: string;
  },
  loggedIn: false,
  isMagic: false,
  loading: false,
  fetchingBalance: false,
  usdcBalance: ethers.BigNumber.from(0).toString(),
  chainId: '5611' as SupportedChainIds,
};

export const fetchUsdcBalance = createAsyncThunk(
  'user/fetchUsdcBalance',
  async (_, {getState}) => {
    const state = getState();
    console.log('state', state);
    const chainId = (state.user.chainId ?? '5611') as SupportedChainIds;
    const provider = new ethers.providers.JsonRpcProvider(
      NETWORKS[chainId].rpcUrl,
    );
    const contract = MyUSD__factory.connect(
      CONTRACT_ADDRESSES[chainId].MyUSD,
      provider,
    );
    const balance = await contract.balanceOf(state.user.smartAccount[chainId]);
    console.log('fetched user', balance);
    return ethers.utils.formatEther(balance).toString();
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEoaAddress: (state, action) => {
      state.eoaAddress = action.payload;
      state.loading = false;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setIsMagic: (state, action) => {
      state.isMagic = action.payload;
    },
    setChainId: (state, action) => {
      if (!state.chainId) {
        state.chainId = '5611';
      }
      state.chainId = action.payload;
    },
    setSmartAccount: (state, action) => {
      if (!state.smartAccount) {
        state.smartAccount = {
          '5611': ethers.constants.AddressZero,
          '245022926': ethers.constants.AddressZero,
          '59141': ethers.constants.AddressZero,
        };
      }
      state.smartAccount[state.chainId] = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsdcBalance.pending, state => {
        state.fetchingBalance = true;
      })
      .addCase(fetchUsdcBalance.fulfilled, (state, action) => {
        state.fetchingBalance = false;
        state.usdcBalance = action.payload.toString();
      })
      .addCase(fetchUsdcBalance.rejected, (state, action) => {
        state.fetchingBalance = false;
        state.usdcBalance = ethers.BigNumber.from(0).toString();
        // console.log('Error fetching user', action.error);
        // You can handle the error here, e.g., set an error message in the state
      });
  },
});

export const {
  setEoaAddress,
  setLoggedIn,
  setIsMagic,
  setChainId,
  setSmartAccount,
} = userSlice.actions;

export const getEoaAddress = state => state.user.eoaAddress;
export const getLoggedIn = state => state.user.loggedIn;
export const getIsMagic = state => state.user.isMagic;
export const getChainId = state => state.user.chainId ?? '5611';
export const getUsdcBalance = state => state.user.usdcBalance;
export const getSmartAccountAddress = state => {
  if (state.user.smartAccount) {
    return (
      state.user.smartAccount[state.user.chainId ?? '5611'] ??
      ethers.constants.AddressZero
    );
  } else {
    return ethers.constants.AddressZero;
  }
};

export default userSlice.reducer;
