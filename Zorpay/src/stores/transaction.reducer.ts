import {createSlice} from '@reduxjs/toolkit';

// const of type AllIndexesResponse, appended with a boolean for loading state
const initialState = {
  to: '',
  data: '',
  value: '',
  message: '',
  extraData: {},
  transactionHash: null,
  isProcessing: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionDetails: (state, action) => {
      state.to = action.payload.to;
      state.data = action.payload.data;
      state.value = action.payload.value;
      state.message = action.payload.message;
      state.extraData = action.payload.extraData;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setTransactionHash: (state, action) => {
      state.transactionHash = action.payload;
    },
    resetTransaction: state => {
      state.to = '';
      state.data = '';
      state.value = '';
      state.message = '';
      state.transactionHash = null;
      state.isProcessing = false;
      state.extraData = {};
    },
  },
});

export const {
  setProcessing,
  setTransactionHash,
  setTransactionDetails,
  resetTransaction,
} = transactionSlice.actions;

export const getTransaction = state => state.transaction;

export default transactionSlice.reducer;
