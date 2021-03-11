import { createSlice } from '@reduxjs/toolkit';
import { HOST } from '../../constants/userConstants';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    role: HOST,
  },
  reducers: {
    logged: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
    },
    updateRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { logged, logOut, updateRole } = userSlice.actions;

export default userSlice.reducer;
