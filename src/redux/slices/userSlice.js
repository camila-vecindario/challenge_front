import { createSlice } from '@reduxjs/toolkit';
import { HOST } from '../../constants/userConstants';

const mockUser = {
  id: 1,
  firstName: 'Juan',
  lastName: 'Simulador',
  email: 'juanitosimulando@gmail.com',
};

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
