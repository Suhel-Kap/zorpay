import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// const of type AllIndexesResponse, appended with a boolean for loading state
const initialState = {
  user: {},
  loggedIn: false,
  isMagic: false,
  loading: false,
};

// export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
//   try {
//     const jwt = await getJWT();
//     const res = await getCurrentUserDetails(jwt);
//     // console.log('fetched user', res);
//     return {
//       ...res.user,
//       timestamp: res.timestamp,
//     };
//   } catch (e) {
//     console.log(e);
//     return initialState;
//   }
// });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setIsMagic: (state, action) => {
      state.isMagic = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchUser.pending, state => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       // console.log('fetched user', action);
  //       state.user = action.payload;
  //     })
  //     .addCase(fetchUser.rejected, (state, action) => {
  //       state.loading = false;
  //       // console.log('Error fetching user', action.error);
  //       // You can handle the error here, e.g., set an error message in the state
  //     });
  // },
});

export const {setUser, setLoggedIn, setIsMagic} = userSlice.actions;

export const getUser = state => state.user.user;
export const getLoggedIn = state => state.user.loggedIn;
export const getIsMagic = state => state.user.isMagic;

export default userSlice.reducer;
